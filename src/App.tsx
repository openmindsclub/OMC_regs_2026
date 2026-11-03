import { Routes, Route } from "react-router-dom";
import { departmentRoutes } from "./components/department/Departments.jsx";
import AboutUs from "./components/screens/AboutUs";
import RegisterationForm from "./components/screens/RegisterationForm";
import DepartmentSelection from "./components/screens/DepartmentSelection";
import Footer from "./pages/Footer.js";

export function App() {
  return (
    <div className="font-orbitron">
      <Routes>
        {departmentRoutes}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<RegisterationForm />} />
        <Route path="/departments" element={<DepartmentSelection />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </div>
  );
}
