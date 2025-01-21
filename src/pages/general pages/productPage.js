import Back from "../../components/goBack";
import { useState } from "react";
import arrow from "../../assets/icons/whiteArrow.svg";
import Input from "../../components/input";
import SelectInput from "../../components/select";
import Button from "../../components/button";
import IconButton from "../../components/buttonWithIcon";
import save from "../../assets/icons/bookmark.svg";
import share from "../../assets/icons/share.svg";
import { useParams } from "react-router-dom";
import { useCatalogueDetail } from "../reuseableEffects";
import Spinner from "../../components/Spinners/Spinner";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const { catalogueId } = useParams();
  const productDetail = useCatalogueDetail(catalogueId);

  // used vendorID that is present in catalogue detail to get the business name from vendorDetail API
  // const vendorID = productDetail?.vendorId || null;
  // const vendorDetail = useVendorDetail(vendorID);
  // const vendorName = vendorDetail?.vendorData?.businessName;

  const image1 = productDetail?.styleImageOne;
  const image2 = productDetail?.styleImageTwo;
  const image3 = productDetail?.styleImageThree;

  const images = [image1, image2, image3].filter((image) => image);

  const placeholderImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrM4LKSRMQ1x9wl7ySwcTbyDW6a5PBxMa3-w&s"; 
  const validImages = images.length > 0 ? images : [placeholderImage];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    if (validImages.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length);
    }
  };

  const goToPrevious = () => {
    if (validImages.length > 0) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + validImages.length) % validImages.length
      );
    }
  };

  const serviceType = [
    { value: "express", label: "Express service" },
    { value: "standard", label: "Standard service" },
  ];

  return (
    <div>
      <Spinner loading={useSelector((state) => state.user).loading} />
      <div className="flex items-center gap-4 mb-4">
        <div>
          <Back />
        </div>
        <div className="text-sm font-semibold line-clamp-1">
          <div className="">{productDetail?.styleName}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        <div className="lg:col-span-3 lg:relative">
          <div className="lg:sticky lg:top-5">
            <div className="aspect-square w-full relative rounded-lg overflow-hidden">
              <img
                src={validImages[currentIndex] || placeholderImage}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full aspect-square object-cover transition-opacity duration-500 opacity-100"
              />
              <div className="absolute top-0 w-full h-full flex items-end justify-center text-white px-4 pb-6">
                <div className="p-2 rounded bg-brandGreen/20 w-fit backdrop-blur-md flex gap-[6px]">
                  {validImages.map((_, index) => (
                    <div
                      key={index}
                      className={`h-[8px] w-[8px] ${
                        currentIndex === index ? "bg-primary" : "bg-gray-300"
                      } rounded-full`}
                    ></div>
                  ))}
                </div>
              </div>
              {validImages.length > 1 && (
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
              )}
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
            <div className="text-sm font-semibold mb-1">
              Product description:
            </div>
            <div>{productDetail?.description}</div>
          <div className="grid gap-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid">
                <div className="text-sm font-medium">Tailor</div>
                <div className="text-black/80">Vendor name</div>
              </div>
              <div className="grid">
                <div className="text-sm font-medium">Price</div>
                <div className="text-black/80">{productDetail?.cost}</div>
              </div>
              <div className="grid">
                <div className="text-sm font-medium">Material type:</div>
                <div className="text-black/80">{productDetail?.material}</div>
              </div>
              <div className="grid">
                <div className="text-sm font-medium">Number of yards:</div>
                <div className="text-black/80">{productDetail?.noOfYard}</div>
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
};

export default ProductDetail;
