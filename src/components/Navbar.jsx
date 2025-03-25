import React, { useState } from "react";

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleMenu = () => {
    setIsHidden(!isHidden);
  };

  return (
    <nav className="bg-neutral-200 fixed top-0 w-full px-5 py-2 text-lg text-black shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-5">
        <h1 className="font-bold text-xl">Portfolio</h1>

        <ul
          className={`lg:flex gap-5 lg:gap-14 absolute h-screen w-full flex-col justify-center items-center lg:static top-0 left-0 lg:justify-start lg:items-center lg:flex-row lg:h-10 lg:w-auto bg-neutral-200 p-5 lg:p-0 lg:bg-transparent transition-all duration-300 ${
            isHidden ? "hidden" : "flex"
          }`}
        >
          <li>
            <a
              className="hover:text-teal-800 hover:border-b-2 hover:border-teal-800 text-2xl text-sm"
              href="#"
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="hover:text-teal-800 hover:border-b-2 hover:border-teal-800 text-2xl text-sm"
              href="#about"
            >
              About
            </a>
          </li>
          <li>
            <a
              className="hover:text-teal-800 hover:border-b-2 hover:border-teal-800 text-2xl text-sm"
              href="#services"
            >
              Services
            </a>
          </li>
          <li>
            <a
              className="hover:text-teal-800 hover:border-b-2 hover:border-teal-800 text-2xl text-sm"
              href="#projects"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              className="hover:text-teal-800 hover:border-b-2 hover:border-teal-800 text-2xl text-sm"
              href="#contact"
            >
              Contact
            </a>
          </li>
        </ul>

        <button onClick={toggleMenu} className="lg:hidden text-2xl z-10">
          {isHidden ? (
            <i className="fa-solid fa-bars"></i>
          ) : (
            <i class="fa-solid fa-x"></i>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
