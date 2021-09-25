import React, { createContext, useEffect, useState } from "react";

export const ClickContext = createContext();

export const ClickProvider = ({ children }) => {

    const [displayPopUp, setDisplayPopUp] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const closeDisplayPopUp = (e) => {
        setDisplayPopUp(false);
        setSearchTerm("");
      };

      const value = {
        displayPopUp, 
        setDisplayPopUp,
        searchTerm,
        setSearchTerm,
        closeDisplayPopUp
      }


    
    return (
    
    <ClickContext.Provider value={value}>
    
    {children}
    
    </ClickContext.Provider>
    
    );
    
    };
