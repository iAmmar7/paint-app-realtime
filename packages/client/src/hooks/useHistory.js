import { useState, useEffect, useCallback } from 'react';

export const useHistory = (data, emitCanvasData) => {
  const [currentElements, setCurrentElements] = useState(data.currentState || []);
  const [previousElements, setPreviousElements] = useState(data.previousState || []);

  useEffect(() => {
    if (currentElements.length !== data.currentState.length) setCurrentElements(data.currentState);
    if (previousElements.length !== data.previousState.length) setPreviousElements(data.previousState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const undo = useCallback(() => {
    if (currentElements.length < 1) return;
    const element = currentElements.pop();
    setCurrentElements(currentElements.filter((elem) => elem.id !== element.id));
    setPreviousElements((prev) => [...prev, element]);

    // setTimeout(() => {
    emitCanvasData({ currentState: currentElements, previousState: [...previousElements, element] });
    // }, 1000);
  }, [currentElements, emitCanvasData, previousElements]);

  const redo = useCallback(() => {
    if (previousElements.length < 1) return;
    const element = previousElements.pop();
    setCurrentElements((prev) => [...prev, element]);
    setPreviousElements(previousElements.filter((elem) => elem.id !== element.id));

    // setTimeout(() => {
    emitCanvasData({ currentState: [...currentElements, element], previousState: previousElements });
    // }, 1000);
  }, [currentElements, emitCanvasData, previousElements]);

  return [currentElements, setCurrentElements, undo, redo, previousElements];
};
