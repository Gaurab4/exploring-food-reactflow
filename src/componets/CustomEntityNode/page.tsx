// components/CustomNode.tsx
import React from "react";
import { Handle, Position } from "@xyflow/react";

interface CustomNodeProps {
  data: {
    label: string;
    onClick: () => void;
  };
}

const CustomEntityNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        width: "150px",
        cursor: "pointer",
        border: "0.5px solid #FAFAFA",
      }}
      onClick={data.onClick} // Call onClick function when node is clicked
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          backgroundColor: "#FF6B6B", // Red icon background
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "10px",
        }}
      >
        🍽️ {/* Example food icon */}
      </div>
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} style={{ visibility: "hidden", padding: "20px" }} />
      <Handle type="target" position={Position.Left} style={{ visibility: "hidden", padding: "20px" }} />
    </div>
  );
};

export default CustomEntityNode;
