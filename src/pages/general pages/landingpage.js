
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Home from "./homePage";

const Landing = () => {
  return (
    <div className="grid content-between min-h-screen gap-4">
      <div className="px-4 md:px-16 lg:px-48 grid gap-4">
        <Navbar />
        <Home />
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
