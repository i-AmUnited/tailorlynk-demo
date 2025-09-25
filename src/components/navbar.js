import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logos/logo.svg";
import cartIcon from "../assets/icons/cart.svg";
import arrow from "../assets/icons/arrow.svg";
import { useSelector } from "react-redux";
import { useCart } from "./cartContext";
import menuIcon from "../assets/icons/menu.svg";
import blackProfile from "../assets/icons/blackProfile.svg";
import { useCustomerCartList } from "../pages/reuseableEffects";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { cart } = useCart();
  const customerCartList = useCustomerCartList();


  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const userSessionData = useSelector((state) => state.user.userSession)
  const username = userSessionData?.fullName;


  return (
    <div className="flex justify-between items-end py-4 border-b border-b-[#c4c4c432] relative">
      <Link to={"/"}>
        <img src={logo} alt="Logo" className="h-12 md:h-14" />
      </Link>

      <div className="flex items-center gap-6">
        <div className="gap-4 text-[13px] text-black/50 font-medium hidden lg:flex">
          <Link to={"/"}>Vendor</Link>
          <Link to={"/coming-soon"}>Tailor</Link>
          <Link to={"/coming-soon"}>Material Seller</Link>
        </div>

        <div className="border rounded py-2 flex items-center divide-x">
          <div
            className="flex items-center px-3 font-semibold cursor-pointer relative"
            onClick={toggleDropdown}
            ref={dropdownRef}
          >
            <div className="md:flex items-center hidden">
              {!userSessionData ? <span>Guest</span> : <span>{username}</span>}
              <img src={arrow} alt="Arrow" className="h-5" />
            </div>
            <img alt="" src={menuIcon} className="md:hidden" />
            {showDropdown && (
              <div className="absolute top-full mt-4 right-0 w-auto min-w-52 bg-white shadow-lg border rounded-lg z-10 font-medium">
                <ul className="p-2 truncate">
                  <li className="p-3 md:hidden flex items-center gap-2">
                    <img src={blackProfile} alt="Arrow" className="h-[18px]" />
                    {!userSessionData ? (
                      <span>Guest</span>
                    ) : (
                      <span>{username}</span>
                    )}
                  </li>
                  <li className="p-3 md:hidden flex items-center gap-2">
                    <img src={blackProfile} alt="Arrow" className="h-[18px]" />
                    <div>Explore Casual wears</div>
                  </li>
                  {!userSessionData ? (
                    <div>
                      <Link to="/Sign-up">
                        <li className="p-3 rounded hover:bg-primary/10 cursor-pointer truncate hover:text-primary transition-all">
                          <span className="truncate">Sign up</span>
                        </li>
                      </Link>
                      <Link to="/sign-in">
                        <li className="p-3 rounded hover:bg-primary/10 cursor-pointer truncate hover:text-primary transition-all">
                          <span className="truncate">Sign in</span>
                        </li>
                      </Link>
                      <div className="border-t my-4 w-full lg:hidden"></div>
                      <div className="lg:hidden">
                        <Link to="/">
                          <li className="p-3 rounded hover:bg-primary/10 cursor-pointer truncate hover:text-primary transition-all">
                            <span className="truncate">Vendor</span>
                          </li>
                        </Link>
                        <Link to="/coming-soon">
                          <li className="p-3 rounded hover:bg-primary/10 cursor-pointer truncate hover:text-primary transition-all">
                            <span className="truncate">Tailor</span>
                          </li>
                        </Link>
                        <Link to="/coming-soon">
                          <li className="p-3 rounded hover:bg-primary/10 cursor-pointer truncate hover:text-primary transition-all">
                            <span className="truncate">Material sellers</span>
                          </li>
                        </Link>
                      </div>
                    </div>
                  ):(
                    <div>
                      <Link to="/user-account">
                        <li className="p-3 rounded hover:bg-primary/10 cursor-pointer truncate hover:text-primary transition-all">
                          <span className="truncate">My account</span>
                        </li>
                      </Link>
                      <Link to="/user-account/message-center">
                        <li className="p-3 rounded hover:bg-primary/10 cursor-pointer truncate hover:text-primary transition-all">
                          <span className="truncate">Messages</span>
                        </li>
                      </Link>
                      <Link to="user-account/order">
                        <li className="p-3 rounded hover:bg-primary/10 cursor-pointer truncate hover:text-primary transition-all">
                          <span className="truncate">Orders</span>
                        </li>
                      </Link>
                      <Link to="/user-account/saved-styles">
                        <li className="p-3 rounded hover:bg-primary/10 cursor-pointer truncate hover:text-primary transition-all">
                          <span className="truncate">Saved styles</span>
                        </li>
                      </Link>
                      <Link to={"/user-account/sign-out"}>
                        <li className="p-3 rounded hover:bg-red-500/10 text-red-500 cursor-pointer truncate">
                          <span className="truncate">Signout</span>
                        </li>
                      </Link>
                      <div className="border-t my-4 w-full lg:hidden">
                      <Link to="/">
                        <li className="p-3 rounded hover:bg-primary/10 cursor-pointer truncate hover:text-primary transition-all">
                          <span className="truncate">Vendor</span>
                        </li>
                      </Link>
                      <Link to="/coming-soon">
                        <li className="p-3 rounded hover:bg-primary/10 cursor-pointer truncate hover:text-primary transition-all">
                          <span className="truncate">Tailor</span>
                        </li>
                      </Link>
                      <Link to="/coming-soon">
                        <li className="p-3 rounded hover:bg-primary/10 cursor-pointer truncate hover:text-primary transition-all">
                          <span className="truncate">Material sellers</span>
                        </li>
                      </Link>
                      </div>
                    </div>
                  )}
                </ul>
              </div>
            )}
          </div>
          <Link
            to={userSessionData ? "/user-cart" : "/cart"}
            className="flex items-end gap-1 font-semibold text-[13px] px-3 text-primary"
          >
            <img src={cartIcon} alt="Cart" className="h-5" />
            <span>{userSessionData ? customerCartList.length : cart.length}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
