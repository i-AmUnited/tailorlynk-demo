import { Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Home from "./general pages/homePage";
import TailorProfile from "./general pages/tailorProfile";
import ProductDetail from "./general pages/productPage";
import Cart from "./general pages/cart";
import UserAccount from "./userAccount/userAccount";
import AllProducts from "./general pages/Products";
import Checkout from "./general pages/checkout";
import PrivacyPolicy from "./general pages/privacyPolicy";
import Western from "./general pages/westernStyleLanding";
import AllMaterialProducts from "./general pages/allMaterial";

const Structure = () => {
  return (
    <div className="grid content-between min-h-screen gap-4">
      <div className="px-4 md:px-16 lg:px-48 grid gap-4 mb-5">
        <Navbar />
        <Routes >
        <Route index element={<Home />} />
            <Route path="tailor-profile/:vendorID" element={<TailorProfile />} />
            <Route path="all-products" element={<AllProducts />} />
            <Route path="all-materials" element={<AllMaterialProducts />} />
            <Route path="product-detail/:catalogueId" element={<ProductDetail />} />
            <Route path="western" element={<Western />} />
            <Route path="cart" element={<Cart />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="user-account/*" element={<UserAccount />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Structure;
