import { Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Home from "./general pages/homePage";
import TailorProfile from "./general pages/tailorProfile";
import ProductDetail from "./general pages/productPage";
import Cart from "./general pages/cart";
import UserAccount from "./userAccount/userAccount";
import AllProducts from "./general pages/Products";

const Structure = () => {
  return (
    <div className="grid content-between min-h-screen gap-4">
      <div className="px-4 md:px-16 lg:px-48 grid gap-4">
        <Navbar />
        <Routes >
        <Route index element={<Home />} />
            <Route path="tailor-profile" element={<TailorProfile />} />
            <Route path="all-products" element={<AllProducts />} />
            <Route path="product-detail" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="user-account/*" element={<UserAccount />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Structure;
