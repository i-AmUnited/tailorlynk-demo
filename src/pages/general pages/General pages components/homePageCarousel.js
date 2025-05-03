import { useState, useEffect } from "react";
import Button from "../../../components/button";
import image1 from "../../../assets/images/image 1.jpg";
import image2 from "../../../assets/images/image 2.jpg";
import image3 from "../../../assets/images/image 3.jpg";
import arrow from "../../../assets/icons/whiteArrow.svg";

const slides = [
  {
    image: image1,
    title: "Meet Expert Tailors Across Africa",
    description: "Connect with verified African tailors and enjoy custom-made outfits crafted with precision, style, and your exact measurements.",
    buttonText: "hello",
    destination: "/sign-up",
  },
  {
    image: image2,
    title: "Shop Fabrics from Trusted Material Sellers",
    description:
      "Browse a wide variety of high-quality fabrics — lace, Ankara, silk, and more — directly from reputable vendors.",
    buttonText: "world",
    destination: "/sign-up",
  },
  {
    image: image3,
    title: "Explore Western Styles",
    description:
      "From sharp suits to elegant dresses, discover tailors who specialize in creating modern Western wear that fits and flatters.",
    buttonText: "Explore Western",
    destination: "/western",
  },
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="border h-[450px] md:h-[350px] relative rounded-lg overflow-hidden">
          {/* Slider container */}
          <div
            className="flex w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full h-full flex-shrink-0 relative">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="h-[450px] md:h-[350px] w-full object-cover"
                />
                {/* Slide-specific content */}
                <div className="absolute inset-0 bg-black/60 flex items-end justify-center text-white px-4 pb-16 md:pb-18">
                  <div>
                    <div className="grid gap-3 text-center text-pretty">
                      <span className="font-bold text-lg secondary-font">{slide.title}</span>
                      <span className="w-full md:w-3/4 justify-self-center">{slide.description}</span>
                    </div>
                    <div className="flex justify-center my-10 md:my-8">
                      <Button
                        buttonRole={"link"}
                        destination={slide.destination}
                        buttonText={slide.buttonText}
                        otherStyles={"bg-primary text-white"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
      
          {/* Navigation buttons */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md rounded-full size-10 flex items-center justify-center"
          >
            <img src={arrow} alt="prev" className="size-5 rotate-90"/>
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md rounded-full size-10 flex items-center justify-center"
          >
            <img src={arrow} alt="prev" className="size-5 -rotate-90"/>
          </button>
      
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="p-2 rounded bg-brandGreen/20 w-fit backdrop-blur-md flex gap-[6px]">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`size-2 ${
                    currentIndex === index ? "bg-primary" : "bg-gray-300/20"
                  } rounded-full`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      );
      
};

export default Carousel;
