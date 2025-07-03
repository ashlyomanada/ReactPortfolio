import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollProvider from "./context/ScrollContext";

AOS.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScrollProvider>
      <App />
    </ScrollProvider>
  </StrictMode>
);
