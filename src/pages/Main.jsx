import React from "react";
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import Home from "./Home";
import Work from "./Work";
import About from "./About";
import Contact from "./Contact/Contact";
import "./main.scss";

export default function Main() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about-me" element={<About />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
  );
}
