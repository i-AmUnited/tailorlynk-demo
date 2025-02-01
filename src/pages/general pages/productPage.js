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
import { useCart } from "../../components/cartContext";

const ProductDetail = () => {
  const { addToCart, cart, removeFromCart } = useCart();

  const { catalogueId } = useParams();
  const decodedCatalogueID = atob(catalogueId);
  const productDetail = useCatalogueDetail(decodedCatalogueID);

  const [quantity, setQuantity] = useState(0);

  const isInCart = cart.some(
    (item) => item.catalogueId === productDetail.catalogueId
  );

  // Handle input change
  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1); // Ensure at least 1
    setQuantity(value);
  };

  const image1 = productDetail?.styleImageOne;
  const image2 = productDetail?.styleImageTwo;
  const image3 = productDetail?.styleImageThree;

  const images = [image1, image2, image3].filter((image) => image);

  const placeholderImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrM4LKSRMQ1x9wl7ySwcTbyDW6a5PBxMa3-w&s";
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
          <div className="">{productDetail?.styleName}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        <div className="lg:col-span-3 md:relative">
          <div className="md:sticky md:top-5">
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
          <div className="text-sm font-semibold mb-1">Product description:</div>
          <div>{productDetail?.description}</div>
          <div className="grid gap-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid">
                <div className="text-sm font-medium">Tailor</div>
                <div className="text-black/80">
                  {productDetail?.vendorData?.businessName}
                </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2">
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
              <div className="grid grid-cols-2 md:flex gap-4 items-center">
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
                  buttonText={"Save this item"}
                  otherStyles={
                    "bg-primary/20 text-primary"
                  }
                  icon={save}
                />
              </div>
              <div className="grid grid-cols-2">
                <div className="cursor-pointer text-xs font-medium py-5 md:py-4 px-6 rounded flex items-center gap-2 bg-white text-primary w-fit">
                    <img src={share} alt="" className="h-4" />
                    <span className="md:hidden">Share item</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
