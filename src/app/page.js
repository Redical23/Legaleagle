"use client";
import React from "react";
import "./globals.css";
import Script from "next/script";
import HomeComponent from "./slidebar/Home";
import { useModelContext } from "./context/Context";

export default function Home() {
    const { isSignedUp } = useModelContext();
    
    
   

    return (
        <>
          <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4712056626954338"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
        <div  > 
            <HomeComponent />
          
        </div>
        </>
    );

}
