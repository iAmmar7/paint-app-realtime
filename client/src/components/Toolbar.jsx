import { useState } from 'react';
import {
  faArrowsAltH,
  faEraser,
  faMagic,
  faPaintBrush,
  faPencilAlt,
  faICursor,
  faEyeSlash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BrushPreview from './BrushPreview';
import constants from '../constants';
import RectangleIcon from '../icons/rectangle.png';

const Toolbar = ({
  currentWidth,
  currentColor,
  handleDownload,
  dateUrl,
  handleClear,
  handleSpecialMode,
  handleEraserMode,
  setAutoWidth,
  handleRegularMode,
  handleColor,
  handleWidth,
  setCurrentSaturation,
  setCurrentLightness,
  isRegularMode,
  isAutoWidth,
  isEraser,

  tool,
  setTool,
  undo,
  redo,
}) => {
  const [toolbarOpen, setToolbarOpen] = useState(false);

  return (
    <aside className="toolbar">
      {!toolbarOpen ? (
        <div className="toolbar-icon" onClick={() => setToolbarOpen(true)}>
          <FontAwesomeIcon icon={faEye} />
        </div>
      ) : (
        <div className="toolbar-menu">
          <div>
            <div>
              <BrushPreview currentWidth={currentWidth} currentColor={currentColor} />
              <div className="tool-section tool-section--lrg">
                <div className="tool-section">
                  <small>
                    <strong>Brush color</strong>
                  </small>
                </div>
                <input
                  // disabled={!isRegularMode}
                  className="btn--color"
                  type="color"
                  id="toolColorPicker"
                  onChange={handleColor}
                />
              </div>
              <div className="tool-section">
                <small>
                  <strong>Tools</strong>
                </small>
              </div>
              <div className="tool-grid tool-section tool-section--lrg">
                <div>
                  <button
                    className={`btn btn--tool ${tool === 'selection' ? 'btn--active' : ''}`}
                    onClick={() => setTool('selection')}
                  >
                    <FontAwesomeIcon icon={faICursor} />
                  </button>
                </div>
                <div>
                  <button
                    className={`btn btn--tool ${tool === 'line' ? 'btn--active' : ''}`}
                    onClick={() => setTool('line')}
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </button>
                </div>
                <div>
                  <button
                    className={`btn btn--tool ${tool === 'pencil' ? 'btn--active' : ''}`}
                    onClick={() => setTool('pencil')}
                  >
                    <FontAwesomeIcon icon={faPaintBrush} />
                  </button>
                </div>
                <div>
                  <button
                    className={`btn btn--tool ${tool === 'rectangle' ? 'btn--active' : ''}`}
                    onClick={() => setTool('rectangle')}
                  >
                    <img width={26} src={RectangleIcon} alt="rectangle" />
                  </button>
                </div>
                <div>
                  <button
                    className={`btn btn--tool ${tool === 'text' ? 'btn--active' : ''}`}
                    onClick={() => setTool('text')}
                  >
                    <p className="action-text">T</p>
                  </button>
                </div>

                {/* asdasdkjasdnj */}
                {/* <div>
              <button
                className={`btn btn--tool ${!isRegularMode ? 'btn--dream-active' : ''}`}
                onClick={handleSpecialMode}
              >
                <FontAwesomeIcon icon={faMagic} />
              </button>
            </div>
            <div>
              <button className={`btn btn--tool ${isEraser ? 'btn--eraser-active' : ''}`} onClick={handleEraserMode}>
                <FontAwesomeIcon icon={faEraser} />
              </button>
            </div>
            <div>
              <input
                disabled={isEraser}
                checked={isAutoWidth}
                id="tool-autowidth"
                type="checkbox"
                onChange={setAutoWidth}
                title="Dynamic brush size"
              />{' '}
              <label htmlFor="tool-autowidth" className={`btn btn--tool ${isAutoWidth ? 'btn--width-active' : ''}`}>
                <FontAwesomeIcon icon={faArrowsAltH} />
              </label>
            </div> */}
              </div>
              {!isAutoWidth && (
                <div className="tool-section tool-section--lrg">
                  <div className="tool-section">
                    <small>
                      <strong>Brush size</strong>
                    </small>
                  </div>
                  <div className="tool-section">
                    <input defaultValue={constants.brushSize} type="range" min="5" max="90" onChange={handleWidth} />
                  </div>
                </div>
              )}
              {!isRegularMode && (
                <div className="tool-section tool-section--lrg">
                  <div className="tool-section">
                    <small>
                      <strong>Magic brush</strong>
                    </small>
                  </div>
                  <div className="tool-section">
                    <label>
                      <small>Saturation</small>
                    </label>
                    <input defaultValue="100" type="range" min="0" max="100" onChange={setCurrentSaturation} />
                  </div>
                  <label>
                    <small>Lightness</small>
                  </label>
                  <input defaultValue="50" type="range" min="0" max="100" onChange={setCurrentLightness} />
                </div>
              )}
            </div>

            <div className="toolbar-eye" onClick={() => setToolbarOpen(false)}>
              <FontAwesomeIcon icon={faEyeSlash} />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Toolbar;
