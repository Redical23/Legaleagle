"use client"
import { Inter } from "next/font/google";
import "./globals.css";


import Sessionwarpper from "./componets/Sessionwarpper"
import React from 'react';
import Models from "./componets/Models";
const inter = Inter({ subsets: ["latin"] });
import Contentwapper from "./context/Contentwapper"

import { useModelContext } from '../app/context/Context';





export default function RootLayout({ children }) {
  
  const { isModelOpen, setIsModelOpen } = useModelContext();

 
   const handleClick = () => {
     setShowModels(! isModelOpen); // Toggle the visibility of Models component
   };
 
  
  return (
    <html lang="en">

      <body className={inter.className}>
        <Sessionwarpper>
          <Contentwapper>
             
            <div className="min-h-screen body  ">
            
            { isModelOpen && <Models />}
              
              {children}
           
              </div>        
           
          </Contentwapper>
        </Sessionwarpper>
      </body>
    </html>
  );
}



