import Navbar from "../components/department/Navbar";
import AboutUs from "../components/screens/AboutUs";
import Footer from "./Footer";

export default function About() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col justify-between">
      <div className="relative z-30">
        <Navbar />
      </div>
      <div className="flex-1 py-8 md:py-12">
        <AboutUs />
      </div>
      <Footer />
    </main>
  );
}
