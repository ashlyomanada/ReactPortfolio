import React from "react";
import Button from "../buttons/Button";

const ServicesCards = ({ myServices }) => {
  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="1000"
      className="flex flex-col justify-center items-center p-3 bg-neutral-100 rounded-xl gap-3 text-center shadow-2xl"
    >
      <h2 className="text-3xl lg:text-4xl text-teal-800 ">
        <i className={`fa-solid ${myServices.icons}`}></i>
      </h2>
      <h2 className="font-semibold text-lg">{myServices.title}</h2>
      <p className="text-sm">{myServices.description}</p>
      <Button>Read More</Button>
    </div>
  );
};

export default ServicesCards;
