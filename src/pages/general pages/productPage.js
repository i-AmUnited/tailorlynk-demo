import Back from "../../components/goBack";
import { useState } from "react";
import arrow from "../../assets/icons/whiteArrow.svg";
import Input from "../../components/input";
import Button from "../../components/button";
import IconButton from "../../components/buttonWithIcon";
import save from "../../assets/icons/bookmark.svg";
import share from "../../assets/icons/share.svg";
import { useParams } from "react-router-dom";
import { useCatalogueDetail } from "../reuseableEffects";
import Spinner from "../../components/Spinners/pageLoadingSpinner";
import { useSelector } from "react-redux";
import { useCart } from "../../components/cartContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import placeholderImage from "../../assets/images/placeholder-tailorlynk.png";
import { showSuccessMessage } from "../../hooks/constants";

const ProductDetail = () => {
  const loading = useSelector((state) => state.user.loading);
  
  const productLink = window.location.href;
  const handleCopy = () => {
    navigator.clipboard.writeText(productLink).then(() => {
      showSuccessMessage("Product link copied!")
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };


  const { addToCart, cart, removeFromCart } = useCart();

  const { catalogueId } = useParams();
  const decodedCatalogueID = atob(catalogueId);
  const productDetail = useCatalogueDetail(decodedCatalogueID);
  console.log(productDetail);

  const [quantity, setQuantity] = useState(1);

  const isInCart = cart.some(
    (item) => item.catalogueId === productDetail.catalogueId
  );

  // Handle input change
  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1); // Ensure at least 1
    setQuantity(value);
  };

  const image1 = productDetail.styleImageOne ? productDetail.styleImageOne : productDetail.materialImageOne;
  const image2 = productDetail?.styleImageTwo;
  const image3 = productDetail?.styleImageThree;

  const images = [image1, image2, image3].filter((image) => image);

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

  

  return (
    <div>
      <Spinner loading={useSelector((state) => state.user).loading} />

      <div className="flex items-center gap-4 mb-4">
        <div>
          <Back />
        </div>
        <div className="text-sm font-semibold line-clamp-1">
          <div className="">
            {productDetail.styleName
              ? productDetail.styleName
              : productDetail.materialName}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        <div className="lg:col-span-3 md:relative">
          <div className="md:sticky md:top-5">
            <div className="aspect-square w-full relative rounded-lg overflow-hidden bg-black">
              <LazyLoadImage
                src={validImages[currentIndex]}
                effect="blur"
                alt=""
                placeholderSrc={placeholderImage}
                className="object-cover object-center w-full h-full"
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
        <div className="lg:col-span-4 text-black">
          <div>
            <div className="font-semibold mb-1">
              {productDetail.styleName
                ? productDetail.styleName
                : productDetail.materialName}
            </div>
            <div className="text-xs">
              Vendor:{" "}
              <span className="underline text-primary">
                {productDetail?.vendorData?.businessName}
              </span>
            </div>
          </div>
          <div className="grid gap-1 mt-5">
            <span className="font-medium">Description</span>
            <span className="text-xs">{productDetail?.description}</span>
          </div>

          {!productDetail.category ? (
            // Tailor catalogue details
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="grid gap-1">
              <span className="font-medium">No of yards needed</span>
              <span className="text-xs">{productDetail?.noOfYard}</span>
            </div>
            <div className="grid gap-1">
              <span className="font-medium">Material used</span>
              <span className="text-xs">{productDetail?.material}</span>
            </div>
            <div className="grid gap-1">
              <span className="font-medium">Price</span>
              <span className="font-bold text-sm secondary-font">{productDetail?.cost}</span>
            </div>
          </div>
          ) : productDetail.category === "Western" ||
              productDetail.category === "Ready-Made" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="grid gap-1 my-5">
                <span className="font-medium">Available colors</span>
                <span className="text-xs">{productDetail?.color}</span>
              </div>
              <div className="grid gap-1 my-5">
                <span className="font-medium">Price</span>
                <span className="font-bold text-sm secondary-font">{productDetail?.price}</span>
              </div>
            </div>
          ) : (
            // Ordinary cloth material details
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="grid gap-1 my-5">
                <span className="font-medium">Available colors</span>
                <span className="text-xs">{productDetail?.color}</span>
              </div>
              <div className="grid gap-1 my-5">
                <span className="font-medium">Cost per yard</span>
                <span className="font-bold text-sm secondary-font">{productDetail?.costPerYard}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
            {!isInCart && (
              <Input
                label={"Quantity:"}
                type={"number"}
                value={quantity}
                onChange={handleQuantityChange}
              />
            )}
          </div>
          <div className="grid lg:flex gap-4 items-center">
            <div className="grid grid-cols-2 md:flex gap-2 items-center">
              <div>
                <Button
                  buttonRole="custom"
                  buttonText={isInCart ? "Remove from Cart" : "Add to Cart"}
                  otherStyles={
                    isInCart
                      ? "text-red-500 bg-red-100"
                      : "bg-primary text-white"
                  }
                  onClick={() =>
                    isInCart
                      ? removeFromCart(productDetail.catalogueId)
                      : addToCart(productDetail, quantity)
                  }
                />
              </div>
              <IconButton
                buttonText={"Save item"}
                otherStyles={"bg-primary/20 text-primary"}
                icon={save}
              />
            </div>
            <div className="grid grid-cols-2">
              <div onClick={handleCopy} className="cursor-pointer text-xs font-medium py-5 md:py-4 px-6 rounded flex items-center gap-2 bg-white text-primary w-fit">
                <img src={share} alt="" className="h-4" />
                <span className="md:hidden">Share item</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
