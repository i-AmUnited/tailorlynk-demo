import westernImageSample from "../../assets/images/western.png";
import Button from "../../components/button";

const AboutUs = () => {

  return (
    <div className="grid gap-8">
      <div className="border h-[550px] md:h-[350px] relative rounded-md overflow-hidden">
        <img
          src={westernImageSample}
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute top-0 p-10 bg-gradient-to-t from-black/80 to-black/0 w-full h-full flex items-end pb-16 md:pb-10">
          <div className="grid gap-4 w-full md:w-2/3 text-pretty text-white text-center md:text-start">
            <p className="text-2xl md:text-xl secondary-font font-bold">
              Where African Fashion Meets Global Access
            </p>
            <p className="text-xs leading-5">
            TailorLynk is the Afrocentric fashion-tech marketplace connecting tailors, designers, and fabric vendors with a global audience.
            </p>
            <div className="mt-6 grid md:flex gap-14 md:gap-2">
              <Button 
                buttonRole={"link"}
                buttonText={"Explore marketplace"}
                otherStyles={"bg-primary"}
              />
              <Button 
                buttonRole={"link"}
                buttonText={"Become a vendor"}
                otherStyles={"bg-brandGreen"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* our mission */}
      <section className="bg-primary/10 rounded-md p-5 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-end gap-4 md:gap-8">
                <div className="lg:col-span-2">
                    <div className="font-bold text-[16px] secondary-font mb-2 text-primary">Our Mission</div>
                    <p className="leading-5">
                        At TailorLynk, we believe African fashion deserves a global stage. Our platform bridges the gap between 
                        talented local artisans and fashion enthusiasts worldwide, creating opportunities for authentic cultural 
                        expression while empowering creators with the tools they need to thrive in the digital age.
                    </p>
                    <p className="leading-5 mt-4">
                        We're more than just a marketplace – we're a community dedicated to celebrating the rich heritage of 
                        African craftsmanship while embracing modern technology to make these beautiful creations accessible 
                        to everyone, everywhere.
                    </p>
                </div>
                <div className="relative lg:col-span-1">
                  <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="African tailor at work" className="rounded-lg" />
                </div>
            </div>
      </section>

    {/* <!-- Core Values Section --> */}
    <section className="bg-brandGreen/10 rounded-md p-5 md:p-8">
            <h2 className="font-bold text-[16px] secondary-font mb-6 text-brandGreen text-center">What Drives Us</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="px-4 py-8 rounded-lg text-center bg-white/20 text-brandGreen hover:bg-brandGreen hover:text-white cursor-pointer transition-all duration-300">
                    <div className="text-4xl mb-4">🌍</div>
                    <h3 className="font-bold mb-1">Global Access</h3>
                    <p className="text-xs leading-5">Bringing African fashion to the world through seamless digital connectivity.</p>
                </div>
                
                <div className="px-4 py-8 rounded-lg text-center bg-white/20 text-brandGreen hover:bg-brandGreen hover:text-white cursor-pointer transition-all duration-300">
                    <div className="text-4xl mb-4">🧵</div>
                    <h3 className="font-bold mb-1">Bespoke Craftsmanship</h3>
                    <p className="text-xs leading-5">Perfect fits, tailored for you with meticulous attention to detail.</p>
                </div>
                
                <div className="px-4 py-8 rounded-lg text-center bg-white/20 text-brandGreen hover:bg-brandGreen hover:text-white cursor-pointer transition-all duration-300">
                    <div className="text-4xl mb-4">🤝</div>
                    <h3 className="font-bold mb-1">Empowering Vendors</h3>
                    <p className="text-xs leading-5">Supporting local creators and strengthening communities through fair trade.</p>
                </div>
                
                <div className="px-4 py-8 rounded-lg text-center bg-white/20 text-brandGreen hover:bg-brandGreen hover:text-white cursor-pointer transition-all duration-300">
                    <div className="text-4xl mb-4">🎨</div>
                    <h3 className="font-bold mb-1">Celebrating Culture</h3>
                    <p className="text-xs leading-5">Modern style rooted in rich African traditions and heritage.</p>
                </div>
            </div>
    </section>

    {/* timeline */}
    <section className="bg-primary/10 p-5 md:p-8 rounded-md">
        <div className="font-bold text-[16px] secondary-font text-center text-primary mb-10">
          Our Journey
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-4">
            <div className="text-center">
                <div className="size-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-md">
                    1
                  </span>
                </div>
                <div className="font-bold mb-2 text-gray-900">
                  The Challenge
                </div>
                <p className="text-gray-600 text-xs leading-5">African fashion lacks global accessibility.</p>
            </div>
            <div className="text-center">
                <div className="size-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-md">
                    1
                  </span>
                </div>
                <div className="font-bold mb-2 text-gray-900">
                  The Vision
                </div>
                <p className="text-gray-600 text-xs leading-5">To showcase Africa’s richness with pride.</p>
            </div>
            <div className="text-center">
                <div className="size-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-md">
                    1
                  </span>
                </div>
                <div className="font-bold mb-2 text-gray-900">
                  The Solution
                </div>
                <p className="text-gray-600 text-xs leading-5">TailorLynk connects artisans & customers with tech.</p>
            </div>
            <div className="text-center">
                <div className="size-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-md">
                    1
                  </span>
                </div>
                <div className="font-bold mb-2 text-gray-900">
                  The Future
                </div>
                <p className="text-gray-600 text-xs leading-5">A globally recognized African fashion ecosystem.</p>
            </div>
        </div>
    </section>

    {/* <!-- Closing CTA Section --> */}
    <section className="bg-brandGreen rounded-md p-5 md:px-32 py-20">
            <div className="text-lg secondary-font font-bold text-center text-white">
                Join us in shaping the future of African fashion.
            </div>
            <div className="text-center text-xs text-white mt-2 mb-10">Be part of a vibrant community where tradition meets creativity, and together we redefine what African fashion means to the world.</div>
            <div className="grid gap-14 md:gap-10 justify-center">
                <div className="flex justify-center w-full">
                    <Button
                    buttonRole={"link"}
                    buttonText={"Shop now!"}
                    otherStyles={"bg-white text-brandGreen"}
                    destination={"/all-materials"}
                    />
                </div>
              <div className="flex justify-center w-full">
                  <Button
                    buttonRole={"link"}
                    buttonText={"Register as a Vendor"}
                    otherStyles={"bg-white/20 text-white"}
                    destination={"https://tailorlynk-dash.netlify.app/log-in"}
                  />
              </div>
            </div>
    </section>
    </div>
  );
};

export default AboutUs;
