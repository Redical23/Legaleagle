"use client"
import { Inter } from "next/font/google";
import "./globals.css";

import { useState } from "react";
import LAHEAD from "./slidebar/LAHEAD";
import Footer from "./slidebar/FOOTER";
import Sessionwarpper from "./componets/Sessionwarpper"
import React from 'react';
import Models from "./componets/Models";
const inter = Inter({ subsets: ["latin"] });
import Contentwapper from "./context/Contentwapper"
import RandomAnimation from "./selfmade/Anime"
import { useModelContext } from '../app/context/Context';
import SIGNUP from "./signinout/SIGNUP";




export default function RootLayout({ children }) {
  
  const { isModelOpen, setIsModelOpen } = useModelContext();

 
   const handleClick = () => {
     setShowModels(! isModelOpen); // Toggle the visibility of Models component
   };
 
   fetch("/api/socket").catch((err) => console.error("Socket setup error:", err));
  return (
    <html lang="en">

      <body className={inter.className}>
        <Sessionwarpper>
          <Contentwapper>
             
            <div className="min-h-screen body  ">
            
            { isModelOpen && <Models />}
              
              {children}
            <Footer />
              </div>        
           
          </Contentwapper>
        </Sessionwarpper>
      </body>
    </html>
  );
}



