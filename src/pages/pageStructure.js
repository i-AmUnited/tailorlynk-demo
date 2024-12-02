import { Route, Routes } from "react-router-dom";
import Home from "./general pages/homePage";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Structure = () => {
    return ( 
        <div className="px-4 md:px-18 lg:px-48 grid gap-4">
            <Navbar />
            <Routes >
                <Route index element={<Home />} />
            </Routes>
            <Footer />
        </div>
     );
}
 
export default Structure;