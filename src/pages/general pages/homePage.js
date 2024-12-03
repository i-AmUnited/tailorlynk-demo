import Button from "../../components/button";
import RecommendedVendors from "./General pages components/recommendedVendors";
import gramIcon from "../../assets/icons/instagram.svg";
import EducationalResources from "./General pages components/educationalResources";
import Accordion from "../../components/faq";
import Carousel from "./General pages components/homePageCarousel";

const Home = () => {
  const img1 = "https://plus.unsplash.com/premium_photo-1670871853624-87056a19a28f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  const img2 = "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826"  
  return (
      <div className="grid gap-14">
        <Carousel />
        <RecommendedVendors />
        {/* Register */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2 flex justify-center text-center lg:text-start">
            <div>
              <div className="mb-6">
                <p className="font-bold text-xl secondary-font mb-2">Register as a vendor!</p>
                <p>
                  Embrace the opportunity to showcase your skills and connect
                  with clients
                </p>
              </div>
              <Button buttonText={"Get started"} otherStyles={"bg-primary text-white"}/>
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="w-full aspect-video rounded-md overflow-hidden h-[300px]">
              <img src={img1} alt="" />
            </div>
          </div>
        </div>
        {/* Fashion inspiration */}
        <div className="flex justify-center">
          <div className="w-full md:w-[80%] grid gap-6">
            <div className="leading-7 text-center">
              <span className="font-bold text-xl secondary-font">Fashion inspiration of the month!</span> <br />
              <span>[January]</span>
            </div>
            <div className="relative">
              <img alt="" src={img2} className="h-[300px] w-full object-cover rounded-lg"/>
              <div className="absolute top-0 w-full h-full p-4 flex items-end">
                <div className="bg-black/10 backdrop-blur-md p-3 rounded text-xs w-fit text-white flex items-center gap-2">
                  <img alt="" src={gramIcon} className="h-5"/>
                  <span>@styled_by_Mariam</span>
                </div>
              </div>
            </div>
            <div className="text-center lg:px-24">Our Fashion inspiration for January is this amazing adire styled as an East Asian traditional clothing.</div>
          </div>
        </div>
        <EducationalResources />
        <div className="bg-white rounded-lg border p-5 grid gap-8 text-brandGreen">
          <div>
            <span className="secondary-font text-primary font-semibold">Tailorlynk</span> is a platform that affords you the opportunity to dive into the dazzling realm of Nigerian fashion with affordable
            tailor-made pieces, delivered to your doorstep.
          </div>
          <div className="grid gap-1">
            <span className="secondary-font font-bold">Hiring a tailor:</span>
            <span>Hiring a tailor is easy. All you need to do is browse throuh our list of registered....</span>
          </div>
          <div className="grid gap-1">
            <span className="secondary-font font-bold">Buying materials:</span>
            <span>Buying material online is obviously a difficult task but we have made it easy! Select a vendor....</span>
          </div>
          <div className="grid gap-1">
            <span className="secondary-font font-bold">Frequently asked questions:</span>
            <Accordion />
          </div>
        </div>
      </div>
    );
}
 
export default Home;