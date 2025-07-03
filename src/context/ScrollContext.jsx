// src/context/ScrollContext.js
import React, { createContext, useContext, useRef } from "react";

// Create context
const ScrollContext = createContext();

// Custom hook for consuming the context
export const useScroll = () => useContext(ScrollContext);

// ScrollContext Provider Component
const ScrollProvider = ({ children }) => {
  // Create refs for all sections
  const sectionRefs = {
    Home: useRef(null),
    About: useRef(null),
    Services: useRef(null),
    Projects: useRef(null),
    Contact: useRef(null),
  };

  // Scroll to specific section
  const scrollToSection = (section) => {
    sectionRefs[section]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <ScrollContext.Provider value={{ scrollToSection, sectionRefs }}>
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollProvider;
