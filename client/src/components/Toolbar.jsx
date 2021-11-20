import { useState } from 'react';
import { faPaintBrush, faPencilAlt, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BrushPreview from './BrushPreview';
import RectangleIcon from '../icons/rectangle.png';

const Toolbar = ({ tool, setTool, brushSize, setBrushSize, color, setColor, textSize, setTextSize }) => {
  const [toolbarOpen, setToolbarOpen] = useState(false);

  return (
    <div className="toolbar2">
      <div className={toolbarOpen ? 'dropdown active' : 'dropdown'}>
        <div className="dropdown__text">
          <div className="toolbar-icon2" onClick={() => setToolbarOpen(!toolbarOpen)}>
            <FontAwesomeIcon icon={toolbarOpen ? faEyeSlash : faEye} color="#fef9ef" />
          </div>
        </div>
        <div className="dropdown__items">
          <div>
            <div>
              <BrushPreview currentWidth={tool === 'text' ? textSize : brushSize} currentColor={color} />
              <div className="tool-section tool-section--lrg">
                <div className="tool-section">
                  <small>
                    <strong>Brush color</strong>
                  </small>
                </div>
                <input
                  className="btn--color"
                  type="color"
                  id="toolColorPicker"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div className="tool-section">
                <small>
                  <strong>Tools</strong>
                </small>
              </div>
              <div className="tool-grid tool-section tool-section--lrg">
                {/* <div>
                  <button
                    className={`btn btn--tool ${tool === 'selection' ? 'btn--active' : ''}`}
                    onClick={() => setTool('selection')}
                  >
                    <FontAwesomeIcon icon={faICursor} />
                  </button>
                </div> */}
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
              </div>
              {['line', 'pencil'].includes(tool) && (
                <div className="tool-section tool-section--lrg">
                  <div className="tool-section">
                    <small>
                      <strong>Brush size</strong>
                    </small>
                  </div>
                  <div className="tool-section">
                    <input
                      defaultValue={brushSize}
                      type="range"
                      min="1"
                      max="100"
                      onChange={(e) => setBrushSize(e.target.value)}
                    />
                  </div>
                </div>
              )}
              {['text'].includes(tool) && (
                <div className="tool-section tool-section--lrg">
                  <div className="tool-section">
                    <small>
                      <strong>Text size</strong>
                    </small>
                  </div>
                  <div className="tool-section">
                    <input
                      defaultValue={textSize}
                      type="range"
                      min="12"
                      max="100"
                      onChange={(e) => setTextSize(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <aside className="toolbar">
  //     {!toolbarOpen ? (
  //       <div className="toolbar-icon" onClick={() => setToolbarOpen(true)}>
  //         <FontAwesomeIcon icon={faEye} />
  //       </div>
  //     ) : (
  //       <div className="toolbar-menu">
  //         <div>
  //           <div>
  //             <BrushPreview currentWidth={tool === 'text' ? textSize : brushSize} currentColor={color} />
  //             <div className="tool-section tool-section--lrg">
  //               <div className="tool-section">
  //                 <small>
  //                   <strong>Brush color</strong>
  //                 </small>
  //               </div>
  //               <input
  //                 className="btn--color"
  //                 type="color"
  //                 id="toolColorPicker"
  //                 value={color}
  //                 onChange={(e) => setColor(e.target.value)}
  //               />
  //             </div>
  //             <div className="tool-section">
  //               <small>
  //                 <strong>Tools</strong>
  //               </small>
  //             </div>
  //             <div className="tool-grid tool-section tool-section--lrg">
  //               {/* <div>
  //                 <button
  //                   className={`btn btn--tool ${tool === 'selection' ? 'btn--active' : ''}`}
  //                   onClick={() => setTool('selection')}
  //                 >
  //                   <FontAwesomeIcon icon={faICursor} />
  //                 </button>
  //               </div> */}
  //               <div>
  //                 <button
  //                   className={`btn btn--tool ${tool === 'line' ? 'btn--active' : ''}`}
  //                   onClick={() => setTool('line')}
  //                 >
  //                   <FontAwesomeIcon icon={faPencilAlt} />
  //                 </button>
  //               </div>
  //               <div>
  //                 <button
  //                   className={`btn btn--tool ${tool === 'pencil' ? 'btn--active' : ''}`}
  //                   onClick={() => setTool('pencil')}
  //                 >
  //                   <FontAwesomeIcon icon={faPaintBrush} />
  //                 </button>
  //               </div>
  //               <div>
  //                 <button
  //                   className={`btn btn--tool ${tool === 'rectangle' ? 'btn--active' : ''}`}
  //                   onClick={() => setTool('rectangle')}
  //                 >
  //                   <img width={26} src={RectangleIcon} alt="rectangle" />
  //                 </button>
  //               </div>
  //               <div>
  //                 <button
  //                   className={`btn btn--tool ${tool === 'text' ? 'btn--active' : ''}`}
  //                   onClick={() => setTool('text')}
  //                 >
  //                   <p className="action-text">T</p>
  //                 </button>
  //               </div>
  //             </div>
  //             {['line', 'pencil'].includes(tool) && (
  //               <div className="tool-section tool-section--lrg">
  //                 <div className="tool-section">
  //                   <small>
  //                     <strong>Brush size</strong>
  //                   </small>
  //                 </div>
  //                 <div className="tool-section">
  //                   <input
  //                     defaultValue={brushSize}
  //                     type="range"
  //                     min="1"
  //                     max="100"
  //                     onChange={(e) => setBrushSize(e.target.value)}
  //                   />
  //                 </div>
  //               </div>
  //             )}
  //             {['text'].includes(tool) && (
  //               <div className="tool-section tool-section--lrg">
  //                 <div className="tool-section">
  //                   <small>
  //                     <strong>Text size</strong>
  //                   </small>
  //                 </div>
  //                 <div className="tool-section">
  //                   <input
  //                     defaultValue={textSize}
  //                     type="range"
  //                     min="12"
  //                     max="100"
  //                     onChange={(e) => setTextSize(e.target.value)}
  //                   />
  //                 </div>
  //               </div>
  //             )}
  //           </div>

  //           <div className="toolbar-eye" onClick={() => setToolbarOpen(false)}>
  //             <FontAwesomeIcon icon={faEyeSlash} />
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </aside>
  // );
};

export default Toolbar;
