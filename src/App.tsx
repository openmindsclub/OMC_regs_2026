import Design from "./components/department/design.jsx";
import Marketing from "./components/department/marketing.jsx";
import { Route, Routes } from "react-router-dom";
import Footer from "./pages/Footer.js";

export function App() {
  return (
    <div className="font-orbitron bg-black h-screen flex flex-col justify-center">
      <Routes>
        <Route path="/design" element={<Design />} />
        <Route path="/marketing" element={<Marketing />}></Route>
      </Routes>
    </div>
  );
}
