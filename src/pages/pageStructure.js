import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Structure = () => {
  return (
    <div className="grid content-between min-h-screen">
      <div className="px-4 md:px-16 lg:px-48 grid gap-4">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Structure;
