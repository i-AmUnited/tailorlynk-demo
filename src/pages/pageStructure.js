import { Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Home from "./general pages/homePage";
import TailorProfile from "./general pages/tailorProfile";
import ProductDetail from "./general pages/productPage";
import Cart from "./general pages/cart";
import UserAccount from "./userAccount/userAccount";
import Checkout from "./general pages/checkout";
import PrivacyPolicy from "./general pages/privacyPolicy";
import Western from "./general pages/westernStyleLanding";
import AllMaterialProducts from "./general pages/allMaterial";
import AllVendors from "./general pages/Products";
import Title from "../components/pageTitleEffect";
import MeasurementGuide from "./general pages/measurementsGuide";
import PaymentStatus from "./general pages/paymentStatus";
import AboutUs from "./general pages/about";
import ComingSoon from "./general pages/comingSoon";
import SessionCart from "./general pages/userSessionCart";
import SessionCheckout from "./general pages/userSessionCheckout";
import TermsOfService from "./general pages/termsOfService";

const Structure = () => {
    
  return (
    <div className="grid content-between min-h-screen gap-4">
      <div className="px-4 md:px-16 lg:px-48 grid gap-4 mb-5">
        <Navbar />
        <Routes>
          <Route index element={<Title title="Home"><Home /></Title>} />
          <Route path="tailor-profile/:vendorID" element={<Title title="Tailor Profile"><TailorProfile /></Title>} />
          <Route path="all-vendors" element={<Title title="Vendors"><AllVendors /></Title>} />
          <Route path="all-materials" element={<Title title="Materials"><AllMaterialProducts /></Title>} />
          <Route path="product-detail/:catalogueId" element={<Title title="Product Detail"><ProductDetail /></Title>} />
          <Route path="western" element={<Title title="Western Styles"><Western /></Title>} />
          <Route path="cart" element={<Title title="Cart"><Cart /></Title>} />
          <Route path="user-cart" element={<Title title="Cart"><SessionCart /></Title>} />
          <Route path="privacy-policy" element={<Title title="Privacy Policy"><PrivacyPolicy /></Title>} />
          <Route path="terms" element={<Title title="Terms Of Service"><TermsOfService /></Title>} />
          <Route path="about-us" element={<Title title="About US"><AboutUs /></Title>} />
          <Route path="measurement-guide" element={<Title title="Measurements Guide"><MeasurementGuide /></Title>} />
          <Route path="checkout" element={<Title title="Checkout"><Checkout /></Title>} />
          <Route path="user-checkout" element={<Title title="Checkout"><SessionCheckout /></Title>} />
          <Route path="coming-soon" element={<Title title="Coming soon..."><ComingSoon /></Title>} />
          <Route path="payment-status" element={<Title title="Payment Status"><PaymentStatus /></Title>} />
          <Route path="user-account/*" element={<Title title="My Account"><UserAccount /></Title>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Structure;
