import React, { useState, useEffect } from "react";
import { useScroll } from "../context/ScrollContext";

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(true);
  const { sectionRefs, scrollToSection } = useScroll();
  const [activeSection, setActiveSection] = useState("Home");

  const toggleMenu = () => {
    setIsHidden(!isHidden);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionKeys = Object.keys(sectionRefs);
      for (let key of sectionKeys) {
        const ref = sectionRefs[key]?.current;
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveSection(key);
            break;
          }
        }
      }
      setIsHidden(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]);

  return (
    <nav className="bg-neutral-200 fixed top-0 w-full px-5 py-2 text-lg text-black shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-5">
        <h1 className="font-bold text-xl">Portfolio</h1>

        {/* Menu Items */}
        <ul
          className={`lg:flex gap-5 lg:gap-14 absolute h-screen w-full flex-col justify-center items-center lg:static top-0 left-0 lg:justify-start lg:items-center lg:flex-row lg:h-10 lg:w-auto bg-neutral-200 p-5 lg:p-0 lg:bg-transparent transition-all duration-300 ease-in-out ${
            isHidden ? "left-full" : "left-0 flex"
          }`}
        >
          {["Home", "About", "Services", "Projects", "Contact"].map(
            (section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={`${
                    activeSection === section
                      ? "text-teal-800 border-b-2 border-teal-800"
                      : ""
                  } hover:text-teal-800 hover:border-b-2 hover:border-teal-800 text-sm font-semibold`}
                >
                  {section}
                </button>
              </li>
            )
          )}
        </ul>

        {/* Hamburger Icon for Mobile */}
        <button onClick={toggleMenu} className="lg:hidden text-2xl z-10">
          {isHidden ? (
            <i className="fa-solid fa-bars"></i>
          ) : (
            <i className="fa-solid fa-x"></i>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
