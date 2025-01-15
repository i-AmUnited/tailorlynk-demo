import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logos/logo.svg";
import cart from "../assets/icons/cart.svg";
import arrow from "../assets/icons/arrow.svg";
import bookmark from "../assets/icons/bookmark.svg";
import profile from "../assets/icons/profile.svg";
import receipt from "../assets/icons/receipt.svg";
import signout from "../assets/icons/signout.svg";
import message from "../assets/icons/message.svg";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
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

  return (
    <div className="flex justify-between items-end py-4 border-b border-b-[#c4c4c432] relative">
      <Link to={"/"}>
        <img src={logo} alt="Logo" className="h-12 md:h-14" />
      </Link>

      <div className="border rounded py-2 flex items-center divide-x">
        <div
          className="flex items-center px-3 font-semibold cursor-pointer relative"
          onClick={toggleDropdown}
          ref={dropdownRef}
        >
          <span>Guest</span>
          <img src={arrow} alt="Arrow" className="h-5" />

          {showDropdown && (
            <div className="absolute top-full mt-2 right-0 min-w-44 max-w-56 bg-white shadow-lg border rounded-lg z-10 font-medium">
              <ul className="p-2 truncate">
                <Link to="/user-account">
                  <li className="p-3 rounded hover:bg-primary/10 cursor-pointer flex items-center gap-2 truncate hover:text-primary transition-all">
                    <img src={profile} alt="Arrow" className="h-[18px]" />
                    <span className="truncate">My account</span>
                  </li>
                </Link>

                <li className="p-3 rounded hover:bg-primary/10 cursor-pointer flex items-center gap-2 truncate hover:text-primary transition-all">
                  <img src={message} alt="Arrow" className="h-[18px]" />
                  <span className="truncate">Messages</span>
                </li>
                <li className="p-3 rounded hover:bg-primary/10 cursor-pointer flex items-center gap-2 truncate hover:text-primary transition-all">
                  <img src={receipt} alt="Arrow" className="h-[18px]" />
                  <span className="truncate">Orders</span>
                </li>
                <li className="p-3 rounded hover:bg-primary/10 cursor-pointer flex items-center gap-2 truncate hover:text-primary transition-all">
                  <img src={bookmark} alt="Arrow" className="h-[18px]" />
                  <span className="truncate">Saved styles</span>
                </li>
                <li className="p-3 rounded hover:bg-red-500/10 text-red-500 cursor-pointer flex items-center gap-2 truncate">
                  <img src={signout} alt="Arrow" className="h-[18px]" />
                  <span className="truncate">Signout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-end gap-1 font-semibold text-[13px] px-3 text-primary">
          <img src={cart} alt="Cart" className="h-5" />
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import logo from "../assets/logos/logo.svg";
// import cart from "../assets/icons/cart.svg";
// import arrow from "../assets/icons/arrow.svg";
// import bookmark from "../assets/icons/bookmark.svg";
// import profile from "../assets/icons/profile.svg";
// import receipt from "../assets/icons/receipt.svg";
// import signout from "../assets/icons/signout.svg";
// import message from "../assets/icons/message.svg";

// const Navbar = () => {
//   // Mock authentication state (replace with actual authentication logic)
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   const toggleDropdown = () => {
//     setShowDropdown((prev) => !prev);
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setShowDropdown(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="flex justify-between items-end py-4 border-b border-b-[#c4c4c432] relative">
//       {/* Logo */}
//       <Link to={"/"}>
//         <img src={logo} alt="Logo" className="h-12 md:h-14" />
//       </Link>

//       {/* Menu */}
//       <div className="border rounded py-2 flex items-center divide-x">
//         <div
//           className="flex items-center px-3 font-semibold cursor-pointer relative"
//           onClick={toggleDropdown}
//           ref={dropdownRef}
//         >
//           <span>{isAuthenticated ? "User Name" : "User Icon"}</span>
//           <img src={arrow} alt="Arrow" className="h-5" />

//           {/* Dropdown */}
//           {showDropdown && (
//             <div className="absolute top-full mt-2 right-0 min-w-44 max-w-56 bg-white shadow-lg border rounded-lg z-10 font-medium">
//               <ul className="p-2 truncate">
//                 {isAuthenticated ? (
//                   <>
//                     <Link to="/user-account">
//                       <li className="p-3 rounded hover:bg-primary/10 cursor-pointer flex items-center gap-2 truncate hover:text-primary transition-all">
//                         <img src={profile} alt="Profile" className="h-[18px]" />
//                         <span className="truncate">My Account</span>
//                       </li>
//                     </Link>
//                     <li className="p-3 rounded hover:bg-primary/10 cursor-pointer flex items-center gap-2 truncate hover:text-primary transition-all">
//                       <img src={message} alt="Message" className="h-[18px]" />
//                       <span className="truncate">Messages</span>
//                     </li>
//                     <li className="p-3 rounded hover:bg-primary/10 cursor-pointer flex items-center gap-2 truncate hover:text-primary transition-all">
//                       <img src={receipt} alt="Orders" className="h-[18px]" />
//                       <span className="truncate">Orders</span>
//                     </li>
//                     <li className="p-3 rounded hover:bg-primary/10 cursor-pointer flex items-center gap-2 truncate hover:text-primary transition-all">
//                       <img
//                         src={bookmark}
//                         alt="Saved Styles"
//                         className="h-[18px]"
//                       />
//                       <span className="truncate">Saved Styles</span>
//                     </li>
//                     <li
//                       className="p-3 rounded hover:bg-red-500/10 text-red-500 cursor-pointer flex items-center gap-2 truncate"
//                       onClick={() => setIsAuthenticated(false)} // Mock logout
//                     >
//                       <img src={signout} alt="Sign Out" className="h-[18px]" />
//                       <span className="truncate">Sign Out</span>
//                     </li>
//                   </>
//                 ) : (
//                   <>
//                     <Link to="/sign-in">
//                       <li className="p-3 rounded hover:bg-primary/10 cursor-pointer flex items-center gap-2 truncate hover:text-primary transition-all">
//                         <span className="truncate">Login</span>
//                       </li>
//                     </Link>
//                     <Link to="/register">
//                       <li className="p-3 rounded hover:bg-primary/10 cursor-pointer flex items-center gap-2 truncate hover:text-primary transition-all">
//                         <span className="truncate">Register</span>
//                       </li>
//                     </Link>
//                   </>
//                 )}
//               </ul>
//             </div>
//           )}
//         </div>
//         <div className="flex items-end gap-1 font-semibold text-[13px] px-3 text-primary">
//           <img src={cart} alt="Cart" className="h-5" />
//           <span>0</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
