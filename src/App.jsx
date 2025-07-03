import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Technologies from "./components/Technologies";
import AOS from "aos";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    AOS.init({ duration: 5000 });
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Home />
        <About />
        <Services />
        <Technologies />
        <Projects />
        <Contact />
        <Footer />
      </Router>
    </>
  );
}

export default App;
