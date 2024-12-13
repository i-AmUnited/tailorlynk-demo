import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Structure from "./pages/pageStructure";
import SignIn from "./pages/auth pages/signin";
import CreateAccount from "./pages/auth pages/createAccount";
import ResetPassword from "./pages/auth pages/resetPassword";
import Home from "./pages/general pages/homePage";
import TailorProfile from "./pages/general pages/tailorProfile";
import ErrorPage from "./pages/errorPage";
import ProductDetail from "./pages/general pages/productPage";
import Cart from "./pages/general pages/cart";
import UserAccount from "./pages/userAccount/userAccount";
import AccountDetails from "./pages/userAccount/AccountDetails";
import SavedItems from "./pages/userAccount/savedItems";
import ChangePassword from "./pages/userAccount/changePassword";
import Measurements from "./pages/userAccount/Measurements";
import Overview from "./pages/userAccount/Overview";
import MessageCenter from "./pages/userAccount/MessageCenter";
import Order from "./pages/userAccount/Order";
import SavedStyles from "./pages/userAccount/SavedStyles";
import ShippingAddress from "./pages/userAccount/ShippingAddress";
import Feedback from "./pages/userAccount/Feedback";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Structure />}>
            <Route index element={<Home />} />
            <Route path="tailor-profile" element={<TailorProfile />} />
            <Route path="product-detail" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
          </Route>

          {/* User Account Dashboard */}
          <Route path="/user-account" element={<UserAccount />}>
            <Route path="details" element={<AccountDetails />} />
            <Route path="measurements" element={<Measurements />} />
            <Route path="saved-items" element={<SavedItems />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="Overview" element={<Overview />} />
            <Route path="message-center" element={<MessageCenter />} />
            <Route path="order" element={<Order />} />
            <Route path="saved-styles" element={<SavedStyles />} />
            <Route path="shipping-address" element={<ShippingAddress />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
