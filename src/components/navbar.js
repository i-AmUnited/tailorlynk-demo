import logo from "../assets/logos/logo.svg";
import cart from "../assets/icons/cart.svg";
import arrow from "../assets/icons/arrow.svg";
const Navbar = () => {
  return (
    <div className="flex justify-between items-end py-4 border-b border-b-[#c4c4c432]">
      <div>
        <img src={logo} alt="" className="h-12 md:h-14" />
      </div>

      <div className="border rounded py-2 flex items-center divide-x">
        <div className="flex items-center px-3 font-semibold">
          <span>Guest</span>
          <img src={arrow} alt="" className="h-5" />
        </div>
        <div className="flex items-end gap-1 font-semibold text-[13px] px-3 text-primary">
          <img src={cart} alt="" className="h-5"/>
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
