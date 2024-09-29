import React from 'react';
import {  ReactFlowProvider } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import AppStart from '@/componets/AppStart/page';
import Header from '@/componets/Header/page';

export default function Home() {
  return (
    <div style={{ height: '100vh' }}> 
      <ReactFlowProvider>
        <Header/>
        <AppStart/>
      </ReactFlowProvider>
    </div>
  );
}
