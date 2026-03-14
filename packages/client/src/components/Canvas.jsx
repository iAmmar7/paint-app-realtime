import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import rough from 'roughjs/bundled/rough.esm';

import {
  drawElement,
  createElement,
  getElementAtPosition,
  cursorForPosition,
  resizedCoordinates,
  adjustmentRequired,
  adjustElementCoordinates,
} from '../utils/functions';
import Toolbar from './Toolbar';
import ActionButton from './ActionButton';
import constants from '../constants';
import HistoryAction from './HistoryAction';
import { useHistory } from '../hooks/useHistory';

const Canvas = ({ data, emitCanvasData }) => {
  const [elements, setElements, undo, redo, previousState] = useHistory(data, emitCanvasData);
  // const [elements, setElements] = useState(socketElements || []);
  const [dataUrl, setDataUrl] = useState('#');
  const [action, setAction] = useState('none');
  const [tool, setTool] = useState('pencil');
  const [selectedElement, setSelectedElement] = useState(null);
  const [brushSize, setBrushSize] = useState(constants.brushSize);
  const [textSize, setTextSize] = useState(constants.textSize);
  const [color, setColor] = useState(constants.defaultColor);
  const textAreaRef = useRef();

  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements?.forEach((element) => {
      if (action === 'writing' && selectedElement.id === element.id) return;
      drawElement(roughCanvas, context, element, { color });
    });
  }, [elements, action, selectedElement, color]);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (action === 'writing') {
      textArea.focus();
      textArea.value = selectedElement.text;
    }
  }, [action, selectedElement]);

  const updateElement = (id, x1, y1, x2, y2, type, options) => {
    const elementsCopy = [...elements];

    switch (type) {
      case 'line':
      case 'rectangle':
        elementsCopy[id] = createElement(id, x1, y1, x2, y2, type, { size: brushSize, color });
        break;
      case 'pencil':
        elementsCopy[id].points = [...elementsCopy[id].points, { x: x2, y: y2 }];
        elementsCopy[id].color = color;
        elementsCopy[id].brushSize = brushSize;
        break;
      case 'text':
        const textWidth = document.getElementById('canvas').getContext('2d').measureText(options.text).width;
        const textHeight = 24;
        elementsCopy[id] = {
          ...createElement(id, x1, y1, x1 + textWidth, y1 + textHeight, type, { size: brushSize, color }),
          text: options.text,
          color,
          textSize,
        };
        break;
      default:
        throw new Error(`Type not recognised: ${type}`);
    }

    setElements(elementsCopy, true);
  };

  const handleMouseDown = (event) => {
    if (action === 'writing') return;

    const { clientX, clientY } = event;
    if (tool === 'selection') {
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        if (element.type === 'pencil') {
          const xOffsets = element.points.map((point) => clientX - point.x);
          const yOffsets = element.points.map((point) => clientY - point.y);
          setSelectedElement({ ...element, xOffsets, yOffsets });
        } else {
          const offsetX = clientX - element.x1;
          const offsetY = clientY - element.y1;
          setSelectedElement({ ...element, offsetX, offsetY });
        }
        setElements((prevState) => prevState);

        if (element.position === 'inside') {
          setAction('moving');
        } else {
          setAction('resizing');
        }
      }
    } else {
      const id = elements?.length;
      const element = createElement(id, clientX, clientY, clientX, clientY, tool, { size: brushSize, color });
      setElements((prevState) => [...(prevState || []), element]);
      setSelectedElement(element);
      setAction(tool === 'text' ? 'writing' : 'drawing');
    }
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;

    if (tool === 'selection') {
      const element = getElementAtPosition(clientX, clientY, elements);
      event.target.style.cursor = element ? cursorForPosition(element.position) : 'default';
    }

    if (action === 'drawing') {
      const index = elements?.length - 1;
      const { x1, y1 } = elements?.[index] || {};
      updateElement(index, x1, y1, clientX, clientY, tool);
    } else if (action === 'moving') {
      if (selectedElement.type === 'pencil') {
        const newPoints = selectedElement.points.map((_, index) => ({
          x: clientX - selectedElement.xOffsets[index],
          y: clientY - selectedElement.yOffsets[index],
        }));
        const elementsCopy = [...elements];
        elementsCopy[selectedElement.id] = {
          ...elementsCopy[selectedElement.id],
          points: newPoints,
        };
        setElements(elementsCopy, true);
      } else {
        const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = clientX - offsetX;
        const newY1 = clientY - offsetY;
        const options = type === 'text' ? { text: selectedElement.text } : {};
        updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type, options);
      }
    } else if (action === 'resizing') {
      const { id, type, position, ...coordinates } = selectedElement;
      const { x1, y1, x2, y2 } = resizedCoordinates(clientX, clientY, position, coordinates);
      updateElement(id, x1, y1, x2, y2, type);
    }
  };

  const handleMouseUp = (event) => {
    const { clientX, clientY } = event;
    if (selectedElement) {
      if (
        selectedElement.type === 'text' &&
        clientX - selectedElement.offsetX === selectedElement.x1 &&
        clientY - selectedElement.offsetY === selectedElement.y1
      ) {
        setAction('writing');
        return;
      }

      const index = selectedElement.id;
      const { id, type } = elements?.[index] || {};
      if ((action === 'drawing' || action === 'resizing') && adjustmentRequired(type)) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
        updateElement(id, x1, y1, x2, y2, type);
      }
    }

    if (action === 'writing') return;

    setAction('none');
    setSelectedElement(null);

    // setTimeout(() => {
    emitCanvasData({ currentState: elements, previousState });
    // }, 1000);
  };

  const handleBlur = (event) => {
    const { id, x1, y1, type } = selectedElement;
    setAction('none');
    setSelectedElement(null);
    updateElement(id, x1, y1, null, null, type, { text: event.target.value });
  };

  const handleClear = useCallback(() => {
    setElements([]);

    // setTimeout(() => {
    emitCanvasData({ currentState: [], previousState: [] });
    // }, 1000);
  }, [emitCanvasData, setElements]);

  const handleDownload = useCallback(() => {
    const canvas = document.getElementById('canvas');
    var dataURL = canvas.toDataURL('image/png');
    setDataUrl(dataURL);
  }, []);

  return (
    <div>
      <Toolbar
        tool={tool}
        setTool={setTool}
        color={color}
        setColor={setColor}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        textSize={textSize}
        setTextSize={setTextSize}
      />
      <ActionButton handleClear={handleClear} handleDownload={handleDownload} dataUrl={dataUrl} />
      <HistoryAction undo={undo} redo={redo} />
      {action === 'writing' ? (
        <textarea
          ref={textAreaRef}
          onBlur={handleBlur}
          style={{
            position: 'fixed',
            top: selectedElement.y1 - 2,
            left: selectedElement.x1,
            font: '24px sans-serif',
            margin: 0,
            padding: 0,
            border: 0,
            outline: 0,
            resize: 'auto',
            overflow: 'hidden',
            whiteSpace: 'pre',
            background: 'transparent',
          }}
        />
      ) : null}
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        Canvas
      </canvas>
    </div>
  );
};

export default Canvas;
