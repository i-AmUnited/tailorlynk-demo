import Button from "../../components/button";
import Carousel from "../../components/homePageCarousel";
import RecommendedVendors from "./General pages components/recommendedVendors";

const Home = () => {
  const img1 = "https://plus.unsplash.com/premium_photo-1670871853624-87056a19a28f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    return (
      <div className="grid gap-16">
        <Carousel />
        <RecommendedVendors />
        {/* Register */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2 flex justify-center text-center lg:text-start">
            <div>
              <div className="mb-6">
                <p className="font-semibold text-2xl crimson-font text-primary mb-2">Register as a tailor!</p>
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
        <div>
          <div className="text-center leading-8">
            <span className="font-semibold text-2xl crimson-font">Fashion inspiration of the month!</span> <br />
            <span>[January]</span>
          </div>
          <div className="border p-4 w-1/2 flex justify-content-center">
            <div>dfdfslkjldsfldfsfdsnl dfslbliusheroghewr slgliuhrwilblirtgs lsigifdsgier sidflhgherwil sghiuerhloue fsdihiuherr</div>
          </div>
        </div>
      </div>
    );
}
 
export default Home;