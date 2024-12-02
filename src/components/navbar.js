import logo from "../assets/logos/logo.svg";
const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-4 border-b border-b-[#c4c4c432]">
      <div>
        <img src={logo} alt="" className="h-14" />
      </div>

      <div>
        Guest
      </div>
    </div>
  );
};

export default Navbar;
