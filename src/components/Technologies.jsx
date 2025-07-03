import React from "react";
import { useScroll } from "../context/ScrollContext";
import { technologies } from "../services/Technologies";

const Technologies = () => {
  const { sectionRefs } = useScroll();

  return (
    <div
      className="flex flex-col justify-center items-center py-10 bg-neutral-200 lg:min-h-screen"
      ref={sectionRefs.Technologies}
    >
      <h1 className="text-center p-3 text-3xl lg:pt-10 text-black font-bold">
        Technologies
      </h1>

      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 lg:px-20 place-items-center gap-3 p-5 ">
        {technologies?.length > 0 &&
          technologies.map((tech, index) => (
            <TechCard key={index} tech={tech} />
          ))}
      </div>
    </div>
  );
};

const TechCard = ({ tech }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="3000"
      className="bg-neutral-100 p-3 h-30 w-full shadow-md flex items-center justify-center  "
    >
      <img
        src={`./technologies/${tech.image}`}
        alt=""
        className="object-contain h-24"
      />
    </div>
  );
};

export default Technologies;
