import Button from "./Button";

const Services = () => {
  return (
    <>
      <div
        id="services"
        className="lg:min-h-screen bg-neutral-200 p-5 text-black flex flex-col justify-center items-center gap-3 pb-10"
      >
        <h1 className="text-center text-3xl p-3 font-bold">My Services</h1>
        <div className="grid col-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:px-20 lg:py-10">
          <div
            data-aos="zoom-in"
            data-aos-duration="1000"
            className="flex flex-col justify-center items-center p-3 bg-neutral-100 rounded-xl gap-3 text-center shadow-2xl"
          >
            <h2 className="text-3xl lg:text-4xl text-teal-800 ">
              <i className="fa-solid fa-code"></i>
            </h2>
            <h2 className="font-semibold text-lg">Custom Web Development</h2>
            <p className="text-sm">
              Build feature-rich and scalable web applications tailored to your
              business needs using the latest technologies. Whether it's a
              dynamic front end with Vue.js or a robust backend with
              Laravel/CI4, I ensure high-quality solutions.
            </p>
            <Button>Read More</Button>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-duration="2000"
            className="flex flex-col justify-center items-center p-3 bg-neutral-100 rounded-xl gap-3 text-center shadow-2xl"
          >
            <h2 className="text-3xl lg:text-4xl text-teal-800 ">
              <i className="fa-solid fa-cloud"></i>
            </h2>
            <h2 className="font-semibold text-lg">
              API Integration and Development
            </h2>
            <p className="text-sm">
              Seamlessly integrate third-party APIs or develop custom APIs to
              connect and enhance your applications. My expertise ensures
              secure, efficient, and scalable solutions for your projects.
            </p>
            <Button>Read More</Button>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-duration="3000"
            className="flex flex-col justify-center items-center p-3 bg-neutral-100 rounded-xl gap-3 text-center shadow-2xl"
          >
            <h2 className="text-3xl lg:text-4xl text-teal-800 ">
              <i className="fa-solid fa-wrench"></i>
            </h2>
            <h2 className="font-semibold text-lg">
              Maintenance & Performance Optimization
            </h2>
            <p className="text-sm">
              Keep your website running smoothly with my maintenance services.
              From fixing bugs to optimizing performance, I ensure your
              application stays fast, secure, and up-to-date with modern
              standards.
            </p>
            <Button>Read More</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
