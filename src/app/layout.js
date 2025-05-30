"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Inter } from 'next/font/google'
import Sessionwarpper from "./componets/Sessionwarpper"
import React from 'react';
import Models from "./componets/Models";
const inter = Inter({ subsets: ["latin"] });
import Contentwapper from "./context/Contentwapper"

import { useModelContext } from '../app/context/Context';
import dynamic from "next/dynamic";






export default function RootLayout({ children }) {
  
  const { isModelOpen, setIsModelOpen } = useModelContext();
  const pathname = usePathname();
  
  const handleClick = () => {
    setShowModels(! isModelOpen); // Toggle the visibility of Models component
  };
  const LAHEAD = dynamic(() => import("./slidebar/LAHEAD"), { ssr: false });
  
  const shouldShowLAHEAD =  pathname !== "/" && pathname !== "/pruser/setting" && pathname !=="/pruser/editprofile" && pathname !=="/Login"&& pathname !=="/Register" && pathname !=="/contact" && pathname !=="/about"&& pathname !=="/privacypolicy"&& pathname !=="/termsofservice"  ;

 
  return (
    <html lang="en">
       <head>
        <link href="https://fonts.googleapis.com/css2?family=Comic+Relief:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Tuffy:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <Sessionwarpper>
          <Contentwapper>
          {shouldShowLAHEAD && <LAHEAD />}
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



