import React from 'react';

function ToolbarV2({ tool, setTool, undo, redo }) {
  return (
    <>
      <div style={{ position: 'fixed' }}>
        <input type="radio" id="selection" checked={tool === 'selection'} onChange={() => setTool('selection')} />
        <label htmlFor="selection">Selection</label>
        <input type="radio" id="line" checked={tool === 'line'} onChange={() => setTool('line')} />
        <label htmlFor="line">Line</label>
        <input type="radio" id="rectangle" checked={tool === 'rectangle'} onChange={() => setTool('rectangle')} />
        <label htmlFor="rectangle">Rectangle</label>
        <input type="radio" id="pencil" checked={tool === 'pencil'} onChange={() => setTool('pencil')} />
        <label htmlFor="pencil">Pencil</label>
        <input type="radio" id="text" checked={tool === 'text'} onChange={() => setTool('text')} />
        <label htmlFor="text">Text</label>
      </div>
      <div style={{ position: 'fixed', bottom: 0, padding: 10 }}>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>
    </>
  );
}

export default ToolbarV2;
