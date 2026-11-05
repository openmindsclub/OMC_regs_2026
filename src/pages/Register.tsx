import Navbar from "../components/department/Navbar";
import { DEPARTMENT_LINKS } from "../components/department/DepartmentLinks.js";
import RegisterationForm from "../components/screens/RegisterationForm";
import Footer from "./Footer";

export default function Register() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-between">
      <div className="relative z-30">
        <Navbar departments={DEPARTMENT_LINKS} />
      </div>
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <RegisterationForm />
      </div>
      <Footer />
    </main>
  );
}
