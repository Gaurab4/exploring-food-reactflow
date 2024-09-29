
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
        backgroundColor: "#e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        width: "180px",
        cursor: "pointer",
        border: "0.5px solid #FAFAFA",
      }}
      onClick={data.onClick} 
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          backgroundColor: "#FF6B6B",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "10px",
        }}
      >
        🍽️ 
      </div>
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} style={{ visibility: "hidden", padding: "20px" }} />
      <Handle type="target" position={Position.Left} style={{ visibility: "hidden", padding: "20px" }} />
    </div>
  );
};

export default CustomOptionNode;
