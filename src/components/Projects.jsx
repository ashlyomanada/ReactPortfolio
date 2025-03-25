import React from "react";
import Project1 from "../assets/capstone1.png";
import Project2 from "../assets/capstone2.png";
import Project3 from "../assets/movietune.png";
import { Link } from "react-router-dom";
import Button from "./Button";
// import Project4 from "../assets/bundat.png";
// import Project5 from "../assets/touristspot.png";
// import Project6 from "../assets/kapares.png";

const Projects = () => {
  return (
    <>
      <div
        id="projects"
        className="lg:min-h-screen bg-neutral-200 text-black flex flex-col justify-center items-center py-10"
      >
        <h1 className="text-center p-3 text-3xl lg:pt-10 font-bold">
          My Projects
        </h1>
        <div className="grid grid-cols-1 p-5 gap-5 lg:gap-3 md:grid-cols-2 md:pb-10 lg:px-20 lg:grid-cols-3">
          <div
            data-aos="zoom-in-down"
            data-aos-duration="1000"
            className="bg-neutral-100 shadow-md p-3 rounded-xl flex flex-col  items-start justify-between"
          >
            <div className="flex flex-col gap-2 justify-between">
              <img src={Project1} alt="" className="rounded-xl" />
              <h1 className="font-semibold text-xl">
                EUPER System - Admin Side
              </h1>
              <p className="text-justify text-xs">
                A performance evaluation platform for PNP MIMAROPA, enabling
                higher officers to assess police units across all levels. It
                features automated rankings, performance-based rank predictions,
                advanced analytics, interactive visualizations, and real-time
                report generation, ensuring data-driven decision-making and
                operational efficiency.
              </p>
              <p className="text-justify text-md font-semibold">Techologies:</p>
              <div className="grid grid-cols-6 place-items-center gap-y-2 md:grid-cols-7 lg:grid-cols-8 lg:p-3">
                <img src="./html.png" alt="" className="h-8" />
                <img src="./css.png" alt="" className="h-8" />
                <img src="./javascript.png" alt="" className="h-7" />
                <img src="./php.png" alt="" className="h-6" />
                <img src="./bootstrap.png" alt="" className="h-9" />
                <img src="./vue.png" alt="" className="h-6" />
                <img src="./ci4.webp" alt="" className="h-8" />
                <img src="./mysql.png" alt="" className="h-8" />
              </div>
            </div>
            <Button>
              <Link to="https://e-upper.online/">Visit Site</Link>
            </Button>
          </div>
          <div
            data-aos="zoom-in-down"
            data-aos-duration="1000"
            className="bg-neutral-100 shadow-md p-3 rounded-xl flex flex-col gap-2 items-start justify-between"
          >
            <div className="flex flex-col gap-2 justify-between">
              <img src={Project2} alt="" className="rounded-xl" />
              <h1 className="font-semibold text-xl">
                EUPER System - Client Side
              </h1>
              <p className="text-justify text-xs">
                Enables users to view real-time rankings and performance
                analytics of police units. Users can rate the offices based on
                key indicators and track the real-time deadline for ratings,
                ensuring timely and accurate evaluations.
              </p>
              <p className="text-justify text-md font-semibold">Techologies:</p>
              <div className="grid grid-cols-6 place-items-center gap-y-2 md:grid-cols-7 lg:grid-cols-8 lg:p-3">
                <img src="./html.png" alt="" className="h-8" />
                <img src="./css.png" alt="" className="h-8" />
                <img src="./javascript.png" alt="" className="h-7" />
                <img src="./php.png" alt="" className="h-6" />
                <img src="./bootstrap.png" alt="" className="h-9" />
                <img src="./vue.png" alt="" className="h-6" />
                <img src="./ci4.webp" alt="" className="h-8" />
                <img src="./mysql.png" alt="" className="h-8" />
              </div>
            </div>
            <Button>
              <Link to="https://e-upper.online/">Visit Site</Link>
            </Button>
          </div>
          <div
            data-aos="zoom-in-down"
            data-aos-duration="1000"
            className="bg-neutral-100 shadow-md p-3 rounded-xl flex flex-col gap-2 items-start justify-between"
          >
            <div className="flex flex-col gap-2 justify-between">
              <img src={Project3} alt="" className="rounded-xl" />
              <h1 className="font-semibold text-xl">MovieTuneApp</h1>
              <p className="text-justify text-xs">
                MovieTuneApp is a web application that allows users to discover
                and explore movies, view details like cast, ratings, and
                trailers, and create personalized watchlists. It integrates with
                movie databases to provide real-time information and a seamless
                user experience.
              </p>
              <p className="text-justify text-md font-semibold">Techologies:</p>
              <div className="grid grid-cols-6 place-items-center gap-y-2 md:grid-cols-7 lg:grid-cols-8 lg:p-3">
                <img src="./html.png" alt="" className="h-8" />
                <img src="./css.png" alt="" className="h-8" />
                <img src="./javascript.png" alt="" className="h-7" />
                <img src="./tailwind.png" alt="" className="h-6" />
                <img src="./bootstrap.png" alt="" className="h-9" />
                <img src="./react.png" alt="" className="h-6" />
              </div>
            </div>
            <Button>
              <Link to="https://movietune.netlify.app/">Visit Site</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
