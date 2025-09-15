import React, { useState } from "react";
import { Link, Route, Routes, NavLink } from "react-router-dom";
import { HiMenuAlt2, HiOutlineX } from "react-icons/hi";
import SavedItems from "./savedItems";
import ChangePassword from "./changePassword";
import Measurements from "./Measurements";
import Overview from "./Overview";
import MessageCenter from "./MessageCenter";
import Order from "./Order";
import SavedStyles from "./SavedStyles";
import ShippingAddress from "./ShippingAddress";
import Feedback from "./Feedback";
import ErrorPage from "../errorPage";
import { useSelector } from "react-redux";
import SignOut from "../auth pages/signOut";

const SideLinks = [
  { id: 1, url: "/user-account", text: "Overview" },
  { id: 2, url: "/user-account/measurements", text: "Measurements" },
  { id: 3, url: "/user-account/saved-styles", text: "Saved items" },
  { id: 4, url: "/user-account/message-center", text: "Message Center" },
  { id: 5, url: "/user-account/order", text: "Order" },
  { id: 6, url: "/user-account/shipping-address", text: "Shipping Address" },
  { id: 7, url: "/user-account/change-password", text: "Change Password" },
  { id: 8, url: "/user-account/feedback", text: "Feedback" },
];

function UserAccount() {
  const [mobileNav, setMobileNav] = useState(false);

  const handleNavLinkClick = () => {
    setMobileNav(false);
  };

  const userSessionData = useSelector((state) => state.user.userSession);
  if (!userSessionData) {
    return <SignOut />;
  }


  return (
    <div className="">
      {/* Main content with sidebar and routes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 relative">
        {/* Sidebar */}
        <div className="lg:col-span-3 bg-white border rounded-md hidden lg:block h-fit">
          <div className="px-4 py-6 border-b">
            <Link to="/" className="font-semibold">
              <p className="text-primary"> [Back to homepage] </p>
            </Link>
          </div>

          <ul className="px-4 py-5 grid gap-5">
            {SideLinks.map(({ id, url, text }) => (
              <li key={id} className="">
                <NavLink
                  to={url}
                  end={url === "/user-account"}
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-semibold text-xs"
                      : "text-gray-700 text-xs"
                  }
                >
                  {text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="w-full bg-white border rounded-md lg:col-span-9">
          <div className="px-4 pt-6 -mb-4 lg:hidden">
            <button onClick={() => setMobileNav(!mobileNav)}>
              <HiMenuAlt2 className="text-xl text-primary" />
            </button>
          </div>
          <Routes>
            <Route index element={<Overview />} />
            <Route path="saved-items" element={<SavedItems />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="measurements" element={<Measurements />} />
            <Route path="overview" element={<Overview />} />
            <Route path="message-center" element={<MessageCenter />} />
            <Route path="order" element={<Order />} />
            <Route path="saved-styles" element={<SavedStyles />} />
            <Route path="shipping-address" element={<ShippingAddress />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="sign-out" element={<SignOut />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>

        {mobileNav && (
        <div className="lg:hidden bg-white/60 border backdrop-blur-lg rounded fixed top-0 left-0 right-0 px-4 py-6">
          <div>
            <div className="">
              <button onClick={() => setMobileNav(!mobileNav)}>
                  <HiOutlineX className="text-xl text-primary" />
              </button>
            </div>

            <ul className="grid gap-5 mt-5">
              {SideLinks.map(({ id, url, text }) => (
                <li key={id} className="">
                  <NavLink
                    to={url}
                    end={url === "/user-account"}
                    onClick={handleNavLinkClick}
                    className={({ isActive }) =>
                      isActive
                        ? "text-black font-semibold text-xs"
                        : "text-gray-700 text-xs"
                    }
                  >
                    {text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        )}

      </div>
    </div>
  );
}

export default UserAccount;
