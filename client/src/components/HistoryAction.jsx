import React from 'react';

function HistoryAction({ undo, redo }) {
  return (
    <div className="history-action">
      <div className="btn-container">
        <button className="btn btn--main" onClick={redo}>
          Redo
        </button>
        <button className="btn" onClick={undo}>
          Undo
        </button>
      </div>
    </div>
  );
}

export default HistoryAction;
