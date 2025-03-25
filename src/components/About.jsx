import Button from "./Button";
import AboutImg from "../assets/about.jpg";

const About = () => {
  return (
    <>
      <div
        id="about"
        className="min-h-screen py-10 md:py-0 text-black bg-neutral-200 flex justify-center items-center flex-col gap-3 md:gap-12 lg:flex-row"
      >
        <div data-aos="fade-left" data-aos-duration="2000">
          <img
            src={AboutImg}
            className="aspect-square h-60 md:h-96 rounded-full drop-shadow-2xl"
            alt=""
            srcSet=""
          />
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="2000"
          className="text-center md:w-4/6 lg:w-1/2 flex flex-col gap-2 lg:gap-5 items-center p-5 md:p-0"
        >
          <div>
            <h1 className="text-3xl font-bold">About Me</h1>
            <h2 className="text-xl">Fullstack Developer</h2>
          </div>
          <p className="text-sm">
            Hi, I'm an enthusiastic junior full-stack developer with a strong
            foundation in Vue.js, React.js CodeIgniter 4 (CI4), and Laravel. I
            am passionate about creating modern, responsive web applications
            that deliver great user experiences and solve real-world problems. I
            enjoy learning and growing with every project I work on, whether
            it's building interactive user interfaces, developing secure APIs,
            or optimizing application performance. My focus is on writing clean,
            maintainable code and collaborating effectively to bring ideas to
            life.
          </p>
          <Button>Read More</Button>
        </div>
      </div>
    </>
  );
};

export default About;
