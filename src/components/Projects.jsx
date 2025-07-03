import React, { useState } from "react";

import { useScroll } from "../context/ScrollContext";
import { data } from "../services/Projects";
import ProjectCards from "../components/cards/ProjectCards";
const Projects = () => {
  const { sectionRefs } = useScroll();
  const [projects, setProjects] = useState([]);

  return (
    <>
      <div
        id="projects"
        ref={sectionRefs.Projects}
        className="lg:min-h-screen bg-neutral-200 text-black flex flex-col justify-center items-center py-10"
      >
        <h1 className="text-center p-3 text-3xl lg:pt-10 font-bold">
          My Projects
        </h1>
        <div className="grid grid-cols-1 p-5 gap-5 lg:gap-3 md:grid-cols-2 md:pb-10 lg:px-20 lg:grid-cols-3">
          {data?.length > 0 &&
            data.map((project, index) => (
              <ProjectCards key={index} project={project} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
