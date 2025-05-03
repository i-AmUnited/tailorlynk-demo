import Button from "../../components/button";
import RecommendedVendors from "./General pages components/recommendedVendors";
import gramIcon from "../../assets/icons/instagram.svg";
import EducationalResources from "./General pages components/educationalResources";
import Accordion from "../../components/faq";
import Carousel from "./General pages components/homePageCarousel";
import tailor_register from "../../assets/images/tailor_register.png";
import { Link } from "react-router-dom";
import casual_landing from "../../assets/images/casual_landing.jpg";
import traditional_landing from "../../assets/images/traditional_landing.jpg";
import { useState } from "react";
import RecommendedMaterials from "./General pages components/recommendedMaterials";

const Home = () => {

  // const [tradionalHeroSection, setTraditionalHeroSection] = useState(true)
  // const [casualHeroSection, setCasualHeroSection] = useState(false)

  // const toggleTraditionalSection = () => {
  //   setTraditionalHeroSection(true)
  //   setCasualHeroSection(false)
  // };

  // const toggleCasualSection = () => {
  //   setTraditionalHeroSection(false)
  //   setCasualHeroSection(true)
  // };
 
  const img2 = "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826"  
  
  return (
    <div className="grid gap-14">

      {/* {tradionalHeroSection &&
      <div className="h-[500px] md:h-[350px] relative rounded-lg overflow-hidden">
            <div>
                <img
                    src={traditional_landing}
                    alt=""
                    className="h-[550px] md:h-[350px] w-full object-cover"
                />
            </div>
            <div className="bg-black/50 absolute top-0 w-full h-full flex items-end justify-center text-white px-8 py-12 md:px-12 md:py-16">
                <div>
                    <div className="text-[10px] w-fit bg-black/20 backdrop-blur-md text-primary py-3 px-5 rounded-md">Traditional wear</div>
                    <div className="grid gap-3 text-pretty mt-4">
                        <span className="font-semibold text-lg secondary-font md:w-3/4 lg:w-1/2">Your Dream Outfit, Rooted in Tradition, Tailored for You.</span>
                        <span className="w-full md:w-3/4">
                        Experience the elegance of culture with expertly crafted traditional outfits that blend heritage and style. Celebrate your roots with timeless designs made just for you.
                        </span>
                    </div>
                    <div className="mt-10 grid md:flex gap-6">
                      <div className="mb-4 md:mb-0">
                        <Button buttonRole={"link"} destination={"/sign-up"} buttonText={"Get started"} otherStyles={"bg-primary text-white"}/>
                      </div>
                      <div onClick={toggleCasualSection} className="grid md:flex gap-2 md:gap-1 text-xs"><span>Looking for something modern? </span><span className="hover:text-primary hover:underline hover:cursor-pointer underline-offset-4 transition-all">[Switch to Casual Wear]</span></div>
                    </div>
                </div>
            </div>
      </div>
      }

      {casualHeroSection &&
      <div className="h-[500px] md:h-[350px] relative rounded-lg overflow-hidden">
            <div>
                <img
                    src={casual_landing}
                    alt=""
                    className="h-[550px] md:h-[350px] w-full object-cover"
                />
            </div>
            <div className="bg-black/50 absolute top-0 w-full h-full flex items-end justify-center text-white px-8 py-12 md:px-12 md:py-16">
                <div>
                    <div className="text-[10px] w-fit bg-black/20 backdrop-blur-md text-primary py-3 px-5 rounded-md">Casual wears</div>
                    <div className="grid gap-3 text-pretty mt-4">
                        <span className="font-semibold text-lg secondary-font md:w-3/4 lg:w-1/2">Your Everyday Style, Effortlessly You.</span>
                        <span className="w-full md:w-3/4">
                        Experience the perfect blend of comfort and contemporary fashion with our expertly designed casual outfits. Whether you're relaxing or on the move, our collections are crafted for versatility, so you always look and feel your best.
                        </span>
                    </div>
                    <div className="mt-10 grid md:flex gap-6">
                      <div className="mb-4 md:mb-0">
                        <Button buttonRole={"link"} destination={"/sign-up"} buttonText={"Get started"} otherStyles={"bg-primary text-white"}/>
                      </div>
                      <div onClick={toggleTraditionalSection} className="grid md:flex gap-2 md:gap-1 text-xs"><span>Looking for something modern? </span><span className="hover:text-primary hover:underline hover:cursor-pointer underline-offset-4 transition-all">[Switch to Casual Wear]</span></div>
                    </div>
                </div>
            </div>
      </div>
      } */}

      <Carousel />
      <RecommendedVendors />
      {/* Register */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
          <div className="grid gap-10 lg:col-span-2">
            <div>
              <p className="font-bold text-[16px] secondary-font text-primary mb-2">
                Register as a Tailor Today!
              </p>
              <p>
              Join TailorLynk to showcase your skills, attract more clients, and grow your business. Set your own terms, receive custom orders, and enjoy seamless bookings and payments—all in one place. Sign up now and take your tailoring career to the next level! 
              </p>
            </div>
            <div className="">
            <Button
              buttonRole={"link"}
              destination={"/sign-in"}
              buttonText={"Get started"}
              otherStyles={"bg-primary text-white"}
            />
            </div>
          </div>
          <div className="lg:col-span-3 mt-6 md:mt-0 border">
          <div className="w-full aspect-video rounded-md overflow-hidden">
            <img src={tailor_register} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      <RecommendedMaterials />
      {/* Fashion inspiration */}
      <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-end gap-4">
            <div className="relative lg:col-span-1">
              <img
                alt=""
                src={img2}
                className="aspect-square w-full object-cover rounded-lg"
              />
              <div className="absolute top-0 w-full h-full p-4 flex items-end">
                <div className="bg-black/10 backdrop-blur-md p-3 rounded text-xs w-fit text-white flex items-center gap-2">
                  <img alt="" src={gramIcon} className="h-5" />
                  <span>@styled_by_Mariam</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="grid gap-2">
                <span className="font-bold text-[16px] secondary-font"> Fashion inspiration of the month! </span>
                <span className="text-primary">[January]</span>
              </div>
              <div className="mt-4"> Elegance, culture, and style—this month's fashion inspiration is a tribute to the richness of African heritage. From bold prints to intricate designs, every outfit tells a story of tradition and modern sophistication.
              <div className="my-4 text-gray-500">
                At TailorLynk, we celebrate the creativity and craftsmanship that bring fashion to life. Want to be featured in our next post? Share your best looks and use the tag <span className="font-bold text-primary">#TailorLynkFashion</span> to get noticed! Let’s inspire the world—one stunning outfit at a time. ✨👗🌍
              </div>
              <Link to={"https://www.instagram.com/tailor.lynk/"} target="__blank" className="text-primary underline">Follow Tailorlynk on Instagram</Link>
            </div>
            </div>
          </div>
      </div>
      <EducationalResources />
      <div className="bg-white rounded-lg border p-5 grid gap-8 text-brandGreen">
        <div>
          <span className="secondary-font text-primary font-semibold">
            Tailorlynk
          </span>{" "}
          is a platform that affords you the opportunity to dive into the
          dazzling realm of Nigerian fashion with affordable tailor-made pieces,
          delivered to your doorstep.
        </div>
        <div className="grid gap-1">
          <span className="secondary-font font-bold">Hiring a tailor:</span>
          <span>
            Hiring a tailor is easy. All you need to do is browse throuh our
            list of registered....
          </span>
        </div>
        <div className="grid gap-1">
          <span className="secondary-font font-bold">Buying materials:</span>
          <span>
            Buying material online is obviously a difficult task but we have
            made it easy! Select a vendor....
          </span>
        </div>
        <div className="grid gap-1">
          <span className="secondary-font font-bold">
            Frequently asked questions:
          </span>
          <Accordion />
        </div>
      </div>
    </div>
  );
}
 
export default Home;