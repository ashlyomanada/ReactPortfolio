import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="h-1/2 flex flex-col">
        <div className="h-30 bg-neutral-100 shadow-md text-black flex flex-col items-center justify-center gap-3">
          <div className="flex justify-center gap-5">
            <span className="text-xl bg-teal-800 py-1 px-2 rounded-full">
              <i class="fa-brands fa-facebook text-white rounded-full"></i>
            </span>
            <span className="text-xl bg-teal-800 py-1 px-2 rounded-full">
              <i class="fa-brands fa-instagram text-white rounded-full"></i>
            </span>
            <span className="text-xl bg-teal-800 py-1 px-2 rounded-full">
              <i class="fa-brands fa-twitter text-white rounded-full"></i>
            </span>
            <span className="text-xl bg-teal-800 py-1 px-2 rounded-full">
              <i class="fa-brands fa-youtube text-white rounded-full"></i>
            </span>
          </div>
          <ul className="flex gap-3 md:gap-8">
            <li>
              <a className="" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="" href="#services">
                Services
              </a>
            </li>
            <li>
              <a className="" href="#projects">
                Projects
              </a>
            </li>
            <li>
              <a className="" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="h-12 flex justify-center items-center bg-teal-800">
          <h1 className="text-white">Copyright @2025 by Ashly A. Omanada</h1>
        </div>
      </footer>
    </>
  );
};

export default Footer;
