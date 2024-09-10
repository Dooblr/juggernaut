import React, { useEffect } from "react";
import WebFont from "webfontloader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./components/Home";
import Services from "./components/Services";
import Contact from "./components/Contact";
import About from "./components/About"; // Import the About component
import Layout from "./components/Layout"; // Import Layout

const App: React.FC = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Bebas Neue", "Inter"],
      },
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Wrap all routes inside Layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          {/* <Route path="/site/services" element={<Layout><Services /></Layout>} />
          <Route path="/site/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/site/about" element={<Layout><About /></Layout>} /> Add about route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
