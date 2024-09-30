"use client";

import React, { useState } from 'react';
import { ReactFlowProvider } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import AppStart from '@/components/AppStart/page';
import Header from '@/components/Header/page';
import Sidebar from '@/components/Sidebar/page';


export default function Home() {
  const [selectedMeal, setSelectedMeal] = useState<string>();

  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <div className="flex flex-grow overflow-hidden">
        <div className="flex-grow h-full overflow-auto">
          <ReactFlowProvider>
            <AppStart setSelectedMeal={setSelectedMeal} />
          </ReactFlowProvider>
        </div>
        
        {selectedMeal && <div className="w-4/12 h-full overflow-y-auto  bg-white  border-spacing-1 border-black ">
          <Sidebar selectedMeal={selectedMeal} />
        </div>}
      </div>
    </div>
  );
}