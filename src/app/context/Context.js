"use client";
import React, { createContext, useEffect,useState, useContext, useRef} from 'react';

export const ModelOpenContext = createContext({});

export const ModelProvider = ({ children }) => {
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [updateAvtarURL, setupdateAvtarURL] = useState("");
    
    let [isSignedUp, setIsSignedUp] = useState(false)
    let [istimes,setistimes] = useState(false)                                                                              
    let [searchterm , setsearchterm] = useState("")  
    const [email, setEmail] = useState("");
      const [clientemail ,setclientemail ] = useState("")
      const [currentchat , setcurrentchat] = useState("")
    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
          setEmail(storedEmail);
        }
      }, []);
    
      // Update localStorage whenever email changes
      const updateEmail = (newEmail) => {
        setEmail(newEmail);
        localStorage.setItem("userEmail", newEmail);
      };
    

    return (
        <ModelOpenContext.Provider value={{ isModelOpen, clientemail ,setclientemail ,setIsModelOpen,currentchat , setcurrentchat, email, setEmail: updateEmail, updateAvtarURL, setupdateAvtarURL ,isSignedUp, setIsSignedUp, searchterm , setsearchterm , istimes, setistimes  }}>
            {children}
        </ModelOpenContext.Provider>
    );
};

export const useModelContext = () => useContext(ModelOpenContext);
