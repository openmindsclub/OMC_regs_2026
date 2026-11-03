import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AboutUs from "./components/screens/AboutUs";
import RegisterationForm from "./components/screens/RegisterationForm";
import DepartmentSelection from "./components/screens/DepartmentSelection";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<RegisterationForm />} />
        <Route path="/departments" element={<DepartmentSelection />} />
      </Routes>
    </BrowserRouter>
  );
  
}
