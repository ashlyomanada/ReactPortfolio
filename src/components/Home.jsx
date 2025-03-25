import React from "react";
import MyImage from "../assets/picture.png";
import Button from "./Button";

const Home = () => {
  return (
    <>
      <div className="h-screen bg-neutral-200 text-black">
        <div className="h-screen flex flex-col-reverse justify-center items-center sm:flex-col-reverse md:flex-col-reverse lg:flex-row gap-3 lg:gap:0">
          <div
            data-aos="fade-right"
            data-aos-duration="3000"
            className="md:w-4/6 lg:w-1/2 flex flex-col gap-4 text-center sm:text-center lg:text-start lg:gap-2 p-5 md:p-0"
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl md:text-3xl lg:text-5xl">
                Hi, I'm{" "}
                <span className="font-bold text-teal-800">Ashly Omanada</span>
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                Fullstack Developer
              </h2>
            </div>
            <p className="text-sm lg:text-md">
              I specialize in creating high-performance web applications with
              clean code and modern technologies like Vue.js, React.js,
              CodeIgniter 4, and Laravel. Let's bring your ideas to life with
              user-focused design and robust functionality.
            </p>
            <div className="flex gap-2 justify-center sm:justify-center lg:justify-start">
              <Button>Hire Me</Button>
              <Button>Let's Talk</Button>
            </div>
          </div>
          <div>
            <div data-aos="fade-left" data-aos-duration="3000">
              <img
                src={MyImage}
                className="w-60 md:w-80 lg:w-full drop-shadow-2xl"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
