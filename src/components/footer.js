import twitterIcon from "../assets/icons/X.svg";
import instagramIcon from "../assets/icons/instagram.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
    return ( 
        <div className="mt-10 bg-brandGreen px-4 md:px-16 py-5 text-white grid gap-6 text-xs">
            <div className="grid grid-cols-3 md:flex gap-6 items-center">
              <span>About us</span>
              <span>Contact</span>
              <span>FAQs</span>
              <span>Privacy policy</span>
              <span>Terms of service</span>
            </div>
            <hr  className="opacity-30"/>
            <div className="grid md:flex items-center gap-2 md:gap-4">
              <div className="text-lg font-bold secondary-font">Tailorlynk</div>
              <div className="flex justify-between w-full items-center pt-1">
                <div>© {currentYear} Tailorlynk. All rights reserved</div>
                <div className="flex gap-4">
                  <span><img src={twitterIcon} alt="" className="h-4" /></span>
                  <span><img src={instagramIcon} alt="" className="h-4" /></span>
                </div>
              </div>
            </div>
        </div>
     );
}
 
export default Footer;