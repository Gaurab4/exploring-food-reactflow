import React from "react";
import { Handle, Position } from "@xyflow/react";

interface CustomOptionNodeProps {
  data: {
    label: string;
    onClick: () => void;
  };
}

const CustomOptionNode: React.FC<CustomOptionNodeProps> = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "white",
        borderRadius: "25px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        width: "180px",
        cursor: "pointer",
        border: "0.5px solid #757575",
        fontSize: "14px",
        height: "30px"
      }}
      onClick={data.onClick} 
    >
      <div style={{ marginRight: "10px" }}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width="20" 
          height="20" 
          style={{ fill: "green" }}
        >
          <path d="M18 16.59L15.41 14 12 17.41 8.59 14 6 16.59 12 22l6-6zm-6-14C5.84 2 2 5.84 2 10s3.84 8 8 8 8-3.84 8-8-3.84-8-8-8zm0 14C7.79 16 4 12.21 4 10s3.79-6 6-6 6 3.79 6 6-3.79 6-6 6z"/>
        </svg>
      </div>
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} style={{ visibility: "hidden" }} />
      <Handle type="target" position={Position.Left} style={{ visibility: "hidden" }} />
    </div>
  );
};

export default CustomOptionNode;
