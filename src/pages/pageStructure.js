import { Route, Routes } from "react-router-dom";
import Home from "./general pages/homePage";
import Navbar from "../components/navbar";

const Structure = () => {
    return ( 
        <div className="px-4 md:px-24 lg:px-48 grid gap-4 mb-10">
            <Navbar />
            <Routes >
                <Route index element={<Home />} />
            </Routes>
        </div>
     );
}
 
export default Structure;