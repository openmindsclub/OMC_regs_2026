import { BrowserRouter, Routes, Route } from "react-router-dom";
import { departmentRoutes } from "./components/department/Departments.jsx";
import AboutUs from "./components/screens/AboutUs";
import RegisterationForm from "./components/screens/RegisterationForm";

export function App() {
  return (
    <>
      <div className="font-orbitron bg-black h-screen flex flex-col justify-center">
        <Routes>
          {departmentRoutes}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<RegisterationForm />} />
        </Routes>
        {/* If you want the Footer rendered globally, you can include it here or inside specific routes */}
      </div>
    </>
  );
}
