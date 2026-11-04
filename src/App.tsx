import { Routes, Route } from "react-router-dom";
import { departmentRoutes } from "./components/department/Departments.jsx";
import AboutUs from "./components/screens/AboutUs";
import RegisterationForm from "./components/screens/RegisterationForm";

import Footer from "./pages/Footer.js";
import Home from "./pages/Home.jsx";

export function App() {
  return (
    <div className="font-orbitron">
      <Routes>
        {departmentRoutes}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<RegisterationForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </div>
  );
}
