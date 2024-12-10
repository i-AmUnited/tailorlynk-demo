import { useState, useEffect } from "react";
import Button from "../../../components/button";
import image1 from "../../../assets/images/image 1.jpg";
import image2 from "../../../assets/images/image 2.jpg";
import image3 from "../../../assets/images/image 3.jpg";

const Carousel = () => {
    const images = [image1, image2, image3 ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                setIsTransitioning(false);
            }, 1000); 
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="border h-[450px] md:h-[350px] relative rounded-lg overflow-hidden">
            <div>
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className={`h-[450px] md:h-[350px] w-full object-cover transition-opacity duration-500 ${
                        isTransitioning ? "opacity-80" : "opacity-100"
                    }`}
                />
            </div>
            <div className="bg-black/60 absolute top-0 w-full h-full flex items-end justify-center text-white px-4 pb-10">
                <div>
                    <div className="grid gap-3 text-center text-pretty">
                        <span className="font-bold text-xl secondary-font">Your Dream Outfit, Made in Nigeria.</span>
                        <span className="w-full md:w-3/4 justify-self-center">
                            Dive into the dazzling realm of Nigerian fashion with affordable tailor-made pieces, delivered to your doorstep.
                        </span>
                    </div>
                    <div className="flex justify-center my-10 md:my-8">
                        <Button buttonRole={"link"} destination={"/sign-up"} buttonText={"Get started"} otherStyles={"bg-primary text-white"}/>
                    </div>
                    <div className="flex justify-center">
                        <div className="p-2 rounded bg-brandGreen/20 w-fit backdrop-blur-md flex gap-[6px]">
                            <div className={`h-[10px] w-[10px] ${currentIndex === 0 ? 'bg-primary' : 'bg-gray-300'} rounded-full`}></div>
                            <div className={`h-[10px] w-[10px] ${currentIndex === 1 ? 'bg-primary' : 'bg-gray-300'} rounded-full`}></div>
                            <div className={`h-[10px] w-[10px] ${currentIndex === 2 ? 'bg-primary' : 'bg-gray-300'} rounded-full`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
