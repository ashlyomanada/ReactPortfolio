import Button from "./buttons/Button.jsx";
import { useScroll } from "../context/ScrollContext";
import { myServices } from "../services/Services.js";
import ServicesCards from "./cards/ServicesCards";

const Services = () => {
  const { sectionRefs } = useScroll();

  return (
    <>
      <div
        id="services"
        ref={sectionRefs.Services}
        className="lg:min-h-screen bg-neutral-200 p-5 text-black flex flex-col justify-center items-center gap-3 pb-10"
      >
        <h1 className="text-center text-3xl p-3 font-bold">My Services</h1>
        <div className="grid col-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:px-20 lg:py-10">
          {myServices?.length > 0 &&
            myServices.map((service, index) => (
              <ServicesCards key={index} myServices={service} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Services;
