import React from "react";

const ModelViewer = ({ url }) => {
  if (!url) return null;

  return (
    <div className="meshy-model-viewer-container">
      <model-viewer
        src={url}
        alt="Generated 3D Model"
        auto-rotate
        camera-controls
        style={{ width: "400px", height: "400px" }}
      ></model-viewer>
    </div>
  );
};

export default ModelViewer;