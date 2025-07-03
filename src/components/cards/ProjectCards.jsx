import React from "react";
import { Link } from "react-router-dom";
import Button from "../buttons/Button";
const ProjectCards = ({ project }) => {
  const url = import.meta.env.VITE_IMGPATH;
  return (
    <div
      data-aos="zoom-in-down"
      data-aos-duration="1000"
      className="bg-neutral-100 shadow-md p-3 rounded-xl flex flex-col  items-start justify-between"
    >
      <div className="flex flex-col gap-2 justify-between">
        <img src={`${url}/${project.image}`} alt="" className="rounded-xl" />
        <h1 className="font-semibold text-xl">{project.title}</h1>
        <p className="text-justify text-xs">{project.description}</p>
        <p className="text-justify text-md font-semibold">Techologies:</p>
        <div className="flex items-center gap-2 p-2">
          {project.technologies.map((tech) => (
            <img
              key={tech}
              src={`/technologies/${tech}`}
              alt={tech}
              className="h-8 w-8 object-contain"
            />
          ))}
        </div>
      </div>
      <Button>
        <Link to={project.url}>Visit Site</Link>
      </Button>
    </div>
  );
};

export default ProjectCards;
