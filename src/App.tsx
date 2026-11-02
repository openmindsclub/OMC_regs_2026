import { BrowserRouter, Routes, Route } from "react-router-dom";
import Design from "./components/department/design.jsx";
import Marketing from "./components/department/marketing.jsx";
import AboutUs from "./components/screens/AboutUs";
import RegisterationForm from "./components/screens/RegisterationForm";
import Footer from "./pages/Footer.js";

export function App() {
  return (
    <BrowserRouter>
      <div className="font-orbitron bg-black h-screen flex flex-col justify-center">
        <Routes>
          <Route path="/design" element={<Design />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<RegisterationForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
