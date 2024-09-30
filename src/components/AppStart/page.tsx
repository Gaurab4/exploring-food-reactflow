"use client";

import React, { useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  Node,
  Edge,
  NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomEntityNode from "../CustomEntityNode/page";
import CustomOptionNode from "../CustomOptionNode/page";
type Props = {
  setSelectedMeal: (meal: string) => void; 
}

interface Category {
  strCategory: string;
}

interface Meal {
  idMeal: string;
  strMeal: string;
}

const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "Explore" },
    position: { x: 100, y: 300 },
    type: "customNode",
  },
];

const AppStart = (props : Props) => {
  const {setSelectedMeal} = props;
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [openedNodes, setOpenedNodes] = useState<string>(); 



  const  removeNodes = async(parentNode : Node) : Promise<void> => {

    const parentXPosition = parentNode.position.x; 

    
    setNodes((prevNodes) => {
     
      const newNodes = prevNodes
        .slice() 
        .reverse()
        .filter(node => {
        
          return node.id === parentNode.id || node.position.x <= parentXPosition;
        })
        .reverse(); 

      return newNodes; 
    });
  }
  
  const fetchCategories = async (parentNode: Node): Promise<void> => {
   
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
      );
      const data = await response.json();
      const top5Categories = data?.meals.slice(0, 5);
     
      const newNodes = top5Categories.map((category: Category, index: number) => ({
        id: `${index + 2}`,
        data: { 
          label: category.strCategory, 
          onClick: () => showOption('category', category.strCategory, {
            id: `${index + 2}`,
            position: { x: 400, y: (index + 1) * 100 },
            data: {}
          }) 
        },
        position: { x: 400, y: (index + 1) * 100 },
        type: "customNode",
      }));

      const newEdges = top5Categories.map((_ : object, index: number) => ({
        id: `1-${index + 2}`,
        source: "1",
        target: `${index + 2}`,
        type: "bezier",
      }));
      removeNodes(parentNode);
      setNodes((prevNodes) => [...prevNodes, ...newNodes]);
      setEdges(newEdges);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const selectedOption = async (selectedOption : string , parentNode : Node) : Promise<void> => {
    if(selectedOption === 'details'){
      console.log(parentNode.data.label,'this is parentNode')
      setSelectedMeal(parentNode.data.label as string);
    }else if(selectedOption === 'ingredients'){

    }else{

    }

  }

  const showOption = async (category: string, categoryName: string, parentNode: Node): Promise<void> => {
    
    if(openedNodes ===  parentNode.id) return ;
    
      setOpenedNodes(parentNode.id);

      // Removed the Nodes if i click back on any diffrent node 
      removeNodes(parentNode);

      if (category === 'meal') {
       
        const options = [
          { label: "View Ingredients", type: "ingredients" },
          { label: "View Tags", type: "tags" },
          { label: "View Details", type: "details" },
        ];

        const optionNodes = options.map((option, index) => ({
          id: `meal-${category}-${option.type}`,
          data: { 
            label: option.label, 
            onClick: () => selectedOption(option.type , parentNode) 
          },
          position: { 
            x: parentNode.position.x + 200,
            y: parentNode.position.y + (index + 1) * 100 
          },
          type: "customOptionNode",
        }));

        const optionEdges = options.map((option) => ({
          id: `meal-${category}-${option.type}-edge`,
          source: parentNode.id,
          target: `meal-${category}-${option.type}`,
          type: "bezier",
        }));

        setNodes((prevNodes) => [...prevNodes, ...optionNodes]);
        setEdges((prevEdges) => [...prevEdges, ...optionEdges]);
      } else {
        
        const newNode = {
          id: `category-${categoryName}-view-meals`,
          data: { 
            label: "View Meals", 
            onClick: () => fetchMeals(categoryName) 
          },
          position: { 
            x: parentNode.position.x + 200, 
            y: parentNode.position.y + 100 
          },
          type: "customOptionNode",
        };

        const newEdge = {
          id: `category-${category}-view-meals-edge`,
          source: parentNode.id,
          target: `category-${categoryName}-view-meals`,
          type: "bezier",
        };

        setNodes((prevNodes) => [...prevNodes, newNode]);
        setEdges((prevEdges) => [...prevEdges, newEdge]);
      }



    
  };

 
  const fetchMeals = async (category: string): Promise<void> => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      const meals = data?.meals.slice(0, 5);

      const mealNodes = meals.map((meal: Meal, index: number) => ({
        id: `meal-${meal.idMeal}`,
        data: { 
          label: meal.strMeal, 
          onClick: () => showOption('meal', meal.strMeal, { 
            id: `meal-${meal.idMeal}`, 
            position: { x: 1000, y: (index + 1) * 100 } ,
            data: {label: meal.strMeal}
          }) 
        },
        position: { x: 1000, y: (index + 1) * 100 },
        type: "customNode",
      }));

      const mealEdges = meals.map((meal: Meal) => ({
        id: `category-${category}-meal-${meal.idMeal}`,
        source: `category-${category}-view-meals`,
        target: `meal-${meal.idMeal}`,
        type: "bezier",
      }));

      setNodes((prevNodes) => [...prevNodes, ...mealNodes]);
      setEdges((prevEdges) => [...prevEdges, ...mealEdges]);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

 
  const onNodeClick: NodeMouseHandler<Node> = (event, node) => {
    if (node.id === "1") {
        setCategoriesVisible(true);
        fetchCategories(node); 
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
