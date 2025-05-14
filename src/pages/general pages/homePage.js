import Button from "../../components/button";
import RecommendedVendors from "./General pages components/recommendedVendors";
import gramIcon from "../../assets/icons/instagram.svg";
import EducationalResources from "./General pages components/educationalResources";
import Accordion from "../../components/faq";
import Carousel from "./General pages components/homePageCarousel";
import tailor_register from "../../assets/images/tailor_register.png";
import { Link } from "react-router-dom";
import RecommendedMaterials from "./General pages components/recommendedMaterials";

const Home = () => {
 
  const img2 = "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826"  
  
  return (
    <div className="grid gap-14">

      <Carousel />
      <RecommendedVendors />
      {/* Register */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="grid gap-10">
            <div className="grid gap-4">
              <p className="font-bold text-[16px] secondary-font">
                Register as a Tailor Today!
              </p>
              <p className="text-pretty">
              Join TailorLynk to showcase your skills, attract more clients, and grow your business. Set your own terms, receive custom orders, and enjoy seamless bookings and payments—all in one place. Sign up now and take your tailoring career to the next level! 
              </p>
            </div>
           
            <Button
              buttonRole={"link"}
              destination={"/sign-in"}
              buttonText={"Get started"}
              otherStyles={"bg-primary text-white"}
            />
          </div>
          <div className="mt-6 md:mt-0 border">
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