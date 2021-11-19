import React from 'react';

function ActionButton({ undo, redo }) {
  return (
    <div className="action-btn">
      <div className="btn-container">
        <button className="btn btn--main" onClick={undo}>
          Undo
        </button>
        <button className="btn" onClick={redo}>
          Redo
        </button>
      </div>
    </div>
  );
}

export default ActionButton;
