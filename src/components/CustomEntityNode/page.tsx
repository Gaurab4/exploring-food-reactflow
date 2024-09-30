import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";

interface CustomNodeProps {
  data: {
    label: string;
    image: string;
    onClick: () => void;
  };
}

const CustomEntityNode: React.FC<CustomNodeProps> = ({ data }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        width: "250px",
        cursor: "pointer",
        border: "0.5px solid #FAFAFA",
        marginBottom:'20px',
        overflow:'hidden'
      }}
      onClick={data.onClick} 
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "#FF6B6B",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "10px",
          overflow: "hidden",
        }}
      >
        {imageError ? (
          <span
            role="img"
            aria-label="fallback-icon"
            style={{ fontSize: "20px" }}
          >
            🍲
          </span>
        ) : (
          <img
            src={data.image}
            alt={data.label}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
            onError={() => setImageError(true)} // Trigger fallback on error
          />
        )}
      </div>
      <div style={{width: "200px",}}>{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ visibility: "hidden" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ visibility: "hidden" }}
      />
    </div>
  );
};

export default CustomEntityNode;
