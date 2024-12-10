import Back from "../../components/goBack";
import image1 from "../../assets/images/image 1.jpg";
import image2 from "../../assets/images/image 2.jpg";
import image3 from "../../assets/images/image 3.jpg";
import { useState } from "react";
import arrow from "../../assets/icons/whiteArrow.svg";
import Input from "../../components/input";
import SelectInput from "../../components/select";
import Button from "../../components/button";
import IconButton from "../../components/buttonWithIcon";
import save from "../../assets/icons/bookmark.svg";
import share from "../../assets/icons/share.svg";

const ProductDetail = () => {
    const images = [image1, image2, image3];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const serviceType = [
    { value: 'express', label: 'Express service' },
    { value: 'standard', label: 'Standard service' },
  ];

    return (
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div>
              <Back />
          </div>
          <div className="text-sm font-semibold line-clamp-1">
            <div className="">Traditional agbada with Kampala material</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          <div className="lg:col-span-3">
            <div className="aspect-square w-full relative rounded-lg overflow-hidden">
              <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full aspect-square object-cover transition-opacity duration-500 opacity-100"
              />
              <div className="absolute top-0 w-full h-full flex items-end justify-center text-white px-4 pb-6">
                <div className="p-2 rounded bg-brandGreen/20 w-fit backdrop-blur-md flex gap-[6px]">
                  <div
                    className={`h-[8px] w-[8px] ${
                      currentIndex === 0 ? "bg-primary" : "bg-gray-300"
                    } rounded-full`}
                  ></div>
                  <div
                    className={`h-[8px] w-[8px] ${
                      currentIndex === 1 ? "bg-primary" : "bg-gray-300"
                    } rounded-full`}
                  ></div>
                  <div
                    className={`h-[8px] w-[8px] ${
                      currentIndex === 2 ? "bg-primary" : "bg-gray-300"
                    } rounded-full`}
                  ></div>
                </div>
              </div>
              <div className="absolute top-0 w-full h-full flex items-center px-6">
                <div className="flex justify-between w-full">
                  <div
                    onClick={goToPrevious}
                    className="size-8 rounded-md bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer"
                  >
                    <img src={arrow} alt="" className="h-4 rotate-90" />
                  </div>
                  <div
                    onClick={goToNext}
                    className="size-8 rounded-md bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer"
                  >
                    <img src={arrow} alt="" className="h-4 -rotate-90" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div>
              <div className="text-sm font-semibold mb-1">
                Product description:
              </div>
              <div>
                Short description of the style, this can include Lorem ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam
              </div>
            </div>
            <div className="grid gap-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid">
                  <div className="text-sm font-medium">Tailor</div>
                  <div className="text-black/80">Agbada specialist</div>
                </div>
                <div className="grid">
                  <div className="text-sm font-medium">Price</div>
                  <div className="text-black/80">Agbada specialist</div>
                </div>
                <div className="grid">
                  <div className="text-sm font-medium">Material type:</div>
                  <div className="text-black/80">Agbada specialist</div>
                </div>
                <div className="grid">
                  <div className="text-sm font-medium">Tailor</div>
                  <div className="text-black/80">Agbada specialist</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label={"Quantity:"} type={"number"} />
                <SelectInput label={"Service type"} options={serviceType} />
              </div>
              <div className="grid md:flex gap-4 items-center">
                  <div className="flex gap-4 items-center">
                    <Button
                      buttonRole={"link"}
                      buttonText={"Add to cart"}
                      destination={"/cart"}
                      otherStyles={"bg-primary text-white"}
                    />
                    <IconButton
                      buttonText={"Save this item"}
                      otherStyles={
                        "bg-white border-[1.5px] border-primary text-primary"
                      }
                      icon={save}
                    />
                  </div>
                  <div>
                      <IconButton
                          buttonText={"Share item"}
                          otherStyles={"text-primary"}
                          icon={share}
                        />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default ProductDetail;