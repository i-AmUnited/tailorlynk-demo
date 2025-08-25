import Button from "../../components/button";
import RecommendedVendors from "./General pages components/recommendedVendors";
import gramIcon from "../../assets/icons/instagram.svg";
import EducationalResources from "./General pages components/educationalResources";
import Accordion from "../../components/faq";
import Carousel from "./General pages components/homePageCarousel";
import tailor_register from "../../assets/images/tailor_register.jpg";
import { Link } from "react-router-dom";
import RecommendedMaterials from "./General pages components/recommendedMaterials";
import { useState } from "react";
import close from "../../assets/icons/close.svg";
import MaterialFeed from "./General pages components/materialFeed";

const Home = () => { 
  const img2 = "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826"  
  
  const [reportModal, setReportModal] = useState(false);

  return (
    <div className="grid gap-14">
      <Carousel />
      <RecommendedVendors />
      {/* Register */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 items-center">
        <div className="lg:col-span-3 grid gap-6">
          <div className="grid gap-2">
            <div className="font-bold secondary-font">
              Register as a <span className="text-primary">vendor</span> today!
            </div>
            <p className="text-pretty text-[13px]">
              TailorLynk is your online storefront for custom fashion. Display your designs, reach more customers, and manage orders with ease. Set your prices, and enjoy secure payments—all in one platform. Start selling today and grow your tailoring business online.
            </p>
          </div>

          <Button
            buttonRole={"link"}
            destination={"https://tailorlynk-dash.netlify.app/log-in"}
            buttonText={"Get started"}
            otherStyles={"bg-primary text-white"}
          />
        </div>
        <div className="lg:col-span-2">
          <div className="w-full aspect-video rounded-md overflow-hidden">
            <img
              src={tailor_register}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <MaterialFeed />
      {/* <RecommendedMaterials /> */}
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
              <Link to={"https://www.instagram.com/tailor.lynk/"} className="bg-black/10 backdrop-blur-md p-3 rounded text-xs w-fit text-white flex items-center gap-2">
                <img alt="" src={gramIcon} className="h-5" />
                <span>@styled_by_Mariam</span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="grid gap-2">
              <span className="font-bold text-[16px] secondary-font">
                {" "}
                Fashion inspiration of the week!{" "}
              </span>
              {/* <span className="text-primary">[January]</span> */}
            </div>
            <div className="mt-4">
              {" "}
              This month’s fashion picks celebrate the beauty of African heritage. From bold prints to detailed designs, each piece blends tradition with modern style, carrying a story of elegance and culture.
              <div className="my-4 text-gray-500 italic">
                At TailorLynk, we celebrate the creativity and craftsmanship
                that brings fashion to life. Want to be featured in our next
                post? Share your best looks and tag the official Taiorlynk instagram account
                to get noticed! Let’s inspire the world—one stunning outfit at a
                time.
              </div>
              <Link
                to={"https://www.instagram.com/tailor.lynk/"}
                target="__blank"
                className="text-primary underline"
              >
                Follow Tailorlynk on Instagram
              </Link>
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
          dazzling realm of African fashion with affordable tailor-made pieces,
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

      {/* {reportModal && (
      <div className="fixed inset-0 bg-black/80">
        <div className="flex items-center justify-center h-[100vh]">
          <div className="bg-white  px-8 rounded-lg w-[90%] grid h-[90%] overflow-y-scroll relative">
            <div className="flex justify-between items-center mb-6">
              <div className="font-bold text-[15px]">Book an appointment</div>
              <div onClick={() => setReportModal(false)} className="size-8 rounded-md bg-primary/15 flex items-center justify-center cursor-pointer">
                <img src={close} alt="" className="h-4 rotate-90" />
              </div>
            </div>
            <iframe src="https://calendly.com/tobiamusa/30min" className="h-full w-full" title="W3Schools Free Online Web Tutorials"></iframe>
          </div>
        </div>
      </div>
      )} */}
    </div>
  );
}
 
export default Home;