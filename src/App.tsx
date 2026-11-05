import { Routes, Route, Navigate } from "react-router-dom";
import { departmentRoutes } from "./components/department/Departments.jsx";
import About from "./pages/About";
import Register from "./pages/Register";
import Home from "./pages/Home.jsx";
import ScrollToTop from "./components/common/ScrollToTop";

export function App() {
  return (
    <div className="font-orbitron">
      <ScrollToTop />
      <Routes>
        {departmentRoutes}
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/application" element={<Navigate to="/register" replace />} />
        <Route path="/teams" element={<Navigate to="/design" replace />} />
        <Route path="/departments" element={<Navigate to="/design" replace />} />
        <Route path="/" element={<Home />} />
        <Route path="/footer" element={<Navigate to="/#footer" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
