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
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "../../components/cartContext";
import "react-lazy-load-image-component/src/effects/blur.css";
import placeholderImage from "../../assets/images/placeholder-tailorlynk.png";
import { showErrorMessage, showSuccessMessage } from "../../hooks/constants";
import { useFormik } from "formik";
import { addItemToCart, saveItem } from "../../hooks/local/reducer";
import SelectInput from "../../components/select";
import * as Yup from "yup";
import enlargeimg from "../../assets/icons/enlarge.svg";

const ProductDetail = () => {
  const dispatch = useDispatch();

  const userSessionData = useSelector((state) => state.user.userSession);

  const productURL = window.location.href;
  const handleCopy = () => {
    navigator.clipboard
      .writeText(productURL)
      .then(() => {
        showSuccessMessage("Link copied!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const [fullImageModal, setFullImageModal] = useState(false);

  const toggleFullImageModal = () => {
    setFullImageModal(!fullImageModal);
  }

  const { addToCart } = useCart();

  const { catalogueId } = useParams();
  const decodedCatalogueID = atob(catalogueId);
  const productDetail = useCatalogueDetail(decodedCatalogueID);

  // console.log(productDetail);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const productId = productDetail?.catalogueId || productDetail?.materialId || "";

    const availableSizes = productDetail?.size
    ? productDetail.size.split(", ").map((size) => size.trim())
    : [];

     const availableColors = productDetail?.color
    ? productDetail.color.split(", ").map((color) => color.trim())
    : [];

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleQuantityBlur = () => {
    const value = parseInt(quantity, 10);
    if (isNaN(value) || value < 1) {
      setQuantity("1");
    } else {
      setQuantity(value.toString());
    }
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  console.log(productDetail?.category, productDetail?.materialId)


  // add to cart API
  const addToCartWithAPI = useFormik({
    enableReinitialize: true,
    initialValues: {
      classification: "material", //api accepts material for Ready_Made products
      classification_id: productDetail?.catalogueId || productDetail?.materialId || "",
      weight: productDetail?.weight || "5",
      size: selectedSize,
      color: selectedColor
    },
    validationSchema: Yup.object({
      size: Yup.string().required("Please select a size"),
      color: Yup.string().required("Please select a color"),
    }),
    onSubmit: async (values) => {
      const { payload } = await dispatch(addItemToCart(values));
      if (payload?.statusCode === 200) {
        showSuccessMessage();
      } else {
        showErrorMessage(payload?.message);
      }
    },
  });

  const addToWishList = useFormik({
    initialValues: {
      classification: "material",
      classification_id: productId,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const { payload } = await dispatch(saveItem(values));
      // console.log(values);

      if (payload?.statusCode === 200) {
        showSuccessMessage("Item added to wishlist");
      }
    },
  });

  const image1 =
    productDetail?.styleImageOne || productDetail?.materialImageOne;
  const image2 =
    productDetail?.styleImageTwo || productDetail?.materialImageTwo;
  const image3 =
    productDetail?.styleImageThree || productDetail?.materialImageThree;

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
    <div className="relative">
      <Spinner loading={useSelector((state) => state.user).loading} />

      <div className="flex items-center gap-4 mb-4">
        <div>
          <Back />
        </div>
        <div className="text-sm font-semibold line-clamp-1">
          <div className="">
            {productDetail?.styleName || productDetail?.materialName}{" "}
            <span className="text-primary underline">
              by {productDetail?.vendorData?.businessName}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        <div className="lg:col-span-3 md:relative">
          <div className="md:sticky md:top-5">
            <div className="aspect-square w-full relative rounded-lg overflow-hidden">
              <img
                src={validImages[currentIndex]}
                alt=""
                className="w-full h-full object-cover"
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
                      className="size-8 rounded-md bg-black/30 backdrop-blur-md flex items-center justify-center cursor-pointer"
                    >
                      <img src={arrow} alt="" className="h-4 rotate-90" />
                    </div>
                    <div
                      onClick={goToNext}
                      className="size-8 rounded-md bg-black/30 backdrop-blur-md flex items-center justify-center cursor-pointer"
                    >
                      <img src={arrow} alt="" className="h-4 -rotate-90" />
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute top-0 w-full flex items-start mt-5 justify-center text-white px-4 pb-6">
                <div
                  onClick={toggleFullImageModal}
                  className="p-2 rounded bg-brandGreen/20 w-fit backdrop-blur-md flex gap-[6px] items-center cursor-pointer"
                >
                  <span>View full image</span>{" "}
                  <img src={enlargeimg} alt="" className="h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="text-xs font-semibold mb-2">Product description:</div>
          <div className="text-xs leading-5">{productDetail?.description}</div>
          <form
            onSubmit={addToCartWithAPI.handleSubmit}
            className="grid gap-6 mt-6"
          >
            {!productDetail?.category ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid">
                  <div className="text-xs font-semibold">Tailor</div>
                  <div className="">
                    {productDetail?.vendorData?.businessName}
                  </div>
                </div>
                <div className="grid">
                  <div className="text-xs font-semibold">Price</div>
                  <div className="">£{productDetail?.cost}</div>
                </div>
                <div className="grid">
                  <div className="text-xs font-semibold">Material type:</div>
                  <div className="">{productDetail?.material}</div>
                </div>
                <div className="grid">
                  <div className="text-xs font-semibold">Number of yards:</div>
                  <div className="">{productDetail?.noOfYard}</div>
                </div>
              </div>
            ) : productDetail?.category === "Western" ||
              productDetail?.category === "Ready_Made" ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid">
                  <div className="text-xs font-semibold">Weight:</div>
                  <div className="">{productDetail?.weight || "12"}</div>
                </div>
                <div className="grid">
                  <div className="text-xs font-semibold">Stock:</div>
                  <div className="">{productDetail?.stock}</div>
                </div>
              </div>
            ) : productDetail?.category === "Material" ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid">
                  <div className="text-xs font-semibold">Vendor</div>
                  <div className="">
                    {productDetail?.vendorData?.businessName}
                  </div>
                </div>
                <div className="grid">
                  <div className="text-xs font-semibold">Available colors:</div>
                  <div className="">{productDetail?.color}</div>
                </div>
                <div className="grid">
                  <div className="text-xs font-semibold">Cost per yard</div>
                  <div className="secondary-font font-bold">
                    £{productDetail?.costPerYard}
                  </div>
                </div>
              </div>
            ) : null}

            {userSessionData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="">
                  <SelectInput
                    label="Available sizes"
                    name="size"
                    id="size"
                    options={[
                      { value: "", label: "Select size", isDisabled: true },
                      ...(availableSizes.length > 0
                        ? availableSizes.map((size) => ({
                            value: size,
                            label: size,
                          }))
                        : [{ value: "Free size", label: "Free size" }]),
                    ]}
                    value={addToCartWithAPI.values.size}
                    onChange={addToCartWithAPI.handleChange}
                    onBlur={addToCartWithAPI.handleBlur}
                    onError={
                      addToCartWithAPI.touched.size &&
                      addToCartWithAPI.errors.size
                        ? addToCartWithAPI.errors.size
                        : null
                    }
                  />
                </div>
                <div className="">
                  <SelectInput
                    label="Available colors"
                    name="color"
                    id="color"
                    options={[
                      { value: "", label: "Select color", isDisabled: true },
                      ...(availableColors.length > 0
                        ? availableColors.map((color) => ({
                            value: color,
                            label: color,
                          }))
                        : [{ value: "not_defined", label: "Multi-coloured" }]),
                    ]}
                    value={addToCartWithAPI.values.color}
                    onChange={addToCartWithAPI.handleChange}
                    onBlur={addToCartWithAPI.handleBlur}
                    onError={
                      addToCartWithAPI.touched.color &&
                      addToCartWithAPI.errors.color
                        ? addToCartWithAPI.errors.color
                        : null
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Input
                    label="Quantity:"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="">
                  <SelectInput
                    label="Available sizes"
                    name="size"
                    id="size"
                    options={[
                      { value: "", label: "Select size", isDisabled: true },
                      ...(availableSizes.length > 0
                        ? availableSizes.map((size) => ({
                            value: size,
                            label: size,
                          }))
                        : [{ value: "Free size", label: "Free size" }]),
                    ]}
                    value={selectedSize}
                    onChange={handleSizeChange}
                  />
                </div>
                <div className="">
                  <SelectInput
                    label="Available colors"
                    name="color"
                    id="color"
                    options={[
                      { value: "", label: "Select color", isDisabled: true },
                      ...(availableColors.length > 0
                        ? availableColors.map((color) => ({
                            value: color,
                            label: color,
                          }))
                        : [{ value: "not_defined", label: "Multi-coloured" }]),
                    ]}
                    value={selectedColor}
                    onChange={handleColorChange}
                  />
                </div>
                <div className="md:col-span-2">
                  <Input
                    label="Quantity:"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    onBlur={handleQuantityBlur}
                  />
                </div>
              </div>
            )}

            <div className="grid">
              <div className="text-xs font-semibold">Price</div>
              <div className="font-bold text-lg">£{productDetail?.price}</div>
            </div>
            <div className="grid lg:flex gap-2 items-center">
              <div className="grid grid-cols-2 md:flex gap-2 items-center">
                <div
                  className={`${productDetail?.stock === "0" ? "" : "hidden"}`}
                >
                  <Button
                    buttonRole={"custom"}
                    buttonText={"item out of stock"}
                    otherStyles={"text-red-500 bg-red-100 cursor-not-allowed"}
                  />
                </div>
                <div
                  className={`${productDetail?.stock === "0" ? "hidden" : ""}`}
                >
                  {userSessionData ? (
                    <Button
                      buttonRole="submit"
                      buttonText={"Add to Cart"}
                      otherStyles={"bg-primary text-white"}
                    />
                  ) : (
                    <Button
                      buttonRole="custom"
                      buttonText={"Add to Cart"}
                      otherStyles={"bg-primary text-white"}
                      onClick={() =>
                        addToCart(
                          productDetail,
                          quantity,
                          selectedSize,
                          selectedColor
                        )
                      }
                    />
                  )}
                </div>
                <IconButton
                  buttonText={"Save this item"}
                  otherStyles={`bg-primary/20 text-primary ${
                    !userSessionData ? "hidden" : ""
                  }`}
                  icon={save}
                  onClick={addToWishList.handleSubmit}
                />
              </div>
              <div className="grid grid-cols-2">
                <div
                  onClick={handleCopy}
                  className="cursor-pointer text-xs font-medium py-5 md:py-4 px-6 rounded flex items-center gap-2 bg-white text-primary w-fit"
                >
                  <img src={share} alt="" className="h-4" />
                  <span className="md:hidden">Share item</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {fullImageModal && (
        <div className="fixed inset-0 bg-black text-white bg-opacity-70 z-50 flex items-center justify-center p-4">
          <img
                src={validImages[currentIndex]}
                alt=""
                className="h-full object-fit"
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
                      className="size-8 rounded-md bg-black/30 backdrop-blur-md flex items-center justify-center cursor-pointer"
                    >
                      <img src={arrow} alt="" className="h-4 rotate-90" />
                    </div>
                    <div
                      onClick={goToNext}
                      className="size-8 rounded-md bg-black/30 backdrop-blur-md flex items-center justify-center cursor-pointer"
                    >
                      <img src={arrow} alt="" className="h-4 -rotate-90" />
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute top-0 w-full flex items-start mt-5 justify-end text-white px-4 pb-6">
                <div
                  onClick={toggleFullImageModal}
                  className="p-2 rounded bg-brandGreen/20 w-fit backdrop-blur-md flex gap-[6px] items-center cursor-pointer"
                >
                  Close
                </div>
              </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
