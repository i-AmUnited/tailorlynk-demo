import logo from "../../assets/logos/whiteLogo.svg";

const Waitlist = () => {
  return (
    <div className=" bg-[#6b705c] min-h-screen flex items-center px-4 md:px-16 lg:px-48">
      <div className="grid grid-cols-1 lg:grid-cols-5 items-end gap-6 w-full">
        <div className="lg:col-span-3">
          <img src={logo} alt="" className="h-12 md:h-14"/>
          <div className="mt-6">
            <p className="font-bold text-[14px] secondary-font mb-2 text-white">Be the First to Experience TailorLynk!</p>
            <p className="text-[12px] text-white/70">TailorLynk is bringing authentic Nigerian traditional attire to the diaspora by connecting you with skilled tailors in Nigeria. Get custom-made outfits tailored to perfection—just for you.</p>
            <div className="mt-4 mb-3 font-semibold text-white">📌 Why Join the Waitlist?</div>
            <div className="grid gap-1 text-white">
              <span>✅ Early Access – Be among the first to explore our platform.</span>
              <span>✅ Exclusive Discounts – Enjoy special offers for waitlist members.</span>
              <span>✅ Seamless Experience – Get updates on our launch and features.</span>
            </div>
            <div className="mt-4 text-white">🔗 Sign up now and stay ahead! Tailored fashion, crafted just for you.</div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white px-4 py-6 rounded-md grid gap-4">
            <div>
              <label>Full name:</label>
              <input className="w-full px-4 py-5 md:py-4 border text-sm placeholder:text-[12px] focus:outline-0 focus:border-[#cb997e] rounded-md"/>
            </div>
            <div>
              <label>Email address:</label>
              <input className="w-full px-4 py-5 md:py-4 border text-sm placeholder:text-[12px] focus:outline-0 focus:border-[#cb997e] rounded-md"/>
            </div>
            <button className="cursor-pointer text-xs py-5 md:py-4 px-8 rounded truncate bg-[#cb997e] w-fit text-white"> 
              Join wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;
