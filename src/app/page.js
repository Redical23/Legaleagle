"use client";
import React from "react";
import "./globals.css";
import Home2 from "./selfmade/Home2";
import HomeComponent from "./slidebar/Home";
import { useModelContext } from "./context/Context";

export default function Home() {
    const { isSignedUp } = useModelContext();
    
    
   

    return (
        <div>

            
            <HomeComponent />
        </div>
    );

}
