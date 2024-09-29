"use client";

import React, { useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomEntityNode from "../CustomEntityNode/page";
import CustomOptionNode from "../CustomOptionNode/page"; // Import the new CustomOptionNode component

interface Category {
  strCategory: string;
}

const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "Explore" },
    position: { x: 100, y: 300 },
    type: "customNode",
  },
];

const AppStart = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [categoriesVisible, setCategoriesVisible] = useState(false);

  const fetchCategories = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
      );
      const data = await response.json();
      const top5Categories = data?.meals.slice(0, 5);

      const newNodes = top5Categories.map((category: Category, index: number) => ({
        id: `${index + 2}`,
        data: { label: category.strCategory, onClick: () => fetchMeals(category.strCategory) },
        position: { x: 400, y: (index + 1) * 100 },
        type: "customNode",
      }));

      const newEdges = top5Categories.map((_, index: number) => ({
        id: `1-${index + 2}`,
        source: "1",
        target: `${index + 2}`,
        type: "smoothstep",
      }));

      setNodes((prevNodes) => [...prevNodes, ...newNodes]);
      setEdges(newEdges);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchMeals = async (category: string): Promise<void> => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      const meals = data?.meals.slice(0, 5);

      // Create an option node
      const optionNodeId = `option-${category}`;
      const optionNode = {
        id: optionNodeId,
        data: { label: `View Meals for ${category}`, onClick: () => showMeals(meals) },
        position: { x: 600, y: 300 }, // Position it wherever you want
        type: "customOptionNode",
      };

      setNodes((prevNodes) => [...prevNodes, optionNode]);
      setEdges((prevEdges) => [
        ...prevEdges,
        {
          id: `category-${category}-option`,
          source: `category-${category}`,
          target: optionNodeId,
          type: "smoothstep",
        },
      ]);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  const showMeals = (meals: any[]): void => {
    const mealNodes = meals.map((meal: { idMeal: string; strMeal: string }, index: number) => ({
      id: `meal-${meal.idMeal}`,
      data: { label: meal.strMeal },
      position: { x: 800, y: (index + 1) * 100 },
      type: "customEntityNode", // Use your entity node component
    }));

    const mealEdges = meals.map((meal: { idMeal: string }) => ({
      id: `option-${meal.idMeal}`,
      source: `option-${meal.strCategory}`, // Assuming you want to connect it to the right option node
      target: `meal-${meal.idMeal}`,
      type: "smoothstep",
    }));

    setNodes((prevNodes) => [...prevNodes, ...mealNodes]);
    setEdges((prevEdges) => [...prevEdges, ...mealEdges]);
  };

  const onNodeClick = (_: any, node: Node) => {
    if (node.id === "1") {
      setCategoriesVisible(true);
      fetchCategories();
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={categoriesVisible ? edges : []}
          fitView
          onNodeClick={onNodeClick}
          nodeTypes={{ 
            customNode: CustomEntityNode,
            customOptionNode: CustomOptionNode, 
            
          }}
        />
        <Background />
        <Controls />
      </ReactFlowProvider>
    </div>
  );
};

export default AppStart;
