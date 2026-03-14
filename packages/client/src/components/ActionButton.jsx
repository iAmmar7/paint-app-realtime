import React from 'react';

function ActionButton({ handleClear, handleDownload, dataUrl }) {
  return (
    <div className="action-btn">
      <div className="btn-container">
        <button className="btn btn--main" onClick={handleClear}>
          Clear
        </button>
        <a className="btn" download="image.png" onClick={handleDownload} href={dataUrl}>
          Download
        </a>
      </div>
    </div>
  );
}

export default ActionButton;
