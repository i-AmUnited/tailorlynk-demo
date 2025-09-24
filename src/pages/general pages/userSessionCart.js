import { Link, useNavigate } from "react-router-dom";
import store from "../../assets/icons/store.svg";
import material from "../../assets/icons/material.svg";
import productColor from "../../assets/icons/colorPallete.svg";
import Back from "../../components/goBack";
import Button from "../../components/button";
import { useCustomerCartList } from "../reuseableEffects";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { removeCartItem } from "../../hooks/local/reducer";
import Spinner from "../../components/Spinners/pageLoadingSpinner";
import cartIcon from "../../assets/icons/cart.svg";

const SessionCart = () => {
  const customerCartList = useCustomerCartList()

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
      initialValues: { id: "" },
      onSubmit: async (values) => {
        if (values.id) {
          try {
            await dispatch(removeCartItem(values.id)).unwrap(); 
            navigate("/user-cart");
          } catch (error) {
            console.error("Failed to remove item:", error);
          }
        }
      },
  });

  const orderTotal = customerCartList.reduce((total, item) => {
    const price = parseFloat(item.productData.price) || 0;
    return total + price;
  }, 0);

  const platformFee = 10;

  const formattedTotalPrice = orderTotal + platformFee;

  return (
    <div>
      <Spinner loading={useSelector((state) => state.user).loading} />

      <div>
        {customerCartList.length === 0 ? (
        <div className="flex justify-center mb-5 mt-20">
            <div className="text-center py-8 grid gap-2">
                <div className="mx-auto mb-4"><img src={cartIcon} alt="" className="size-8"/></div>
              <p className="text-gray-500 font-bold secondary-font text-[14px]">
                Cart empty!
              </p>
              <div className="text-xs text-gray-500 secondary-font ">
                Your havent added anything to Tailorlynk cart yet!{" "}
                <Link
                  to={"/all-materials"}
                  className="text-primary font-bold underline"
                >
                  Continue shopping
                </Link>
                .
              </div>
            </div>
          </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <div className="bg-white border rounded-md overflow-hidden">
              <div className="flex items-center justify-between bg-white px-4 py-4 border-b">
                <div className="font-bold secondary-font flex items-center gap-3">
                  <Back />
                  <div>My cart</div>
                </div>
                {/* <button
                  className="text-red-600 text-xs font-semibold underline underline-offset-2 cursor-pointer"
                >
                  Clear Cart
                </button> */}
              </div>
              <div className="p-4">
                {customerCartList.map((product) => {
                  return (
                    <div
                      key={product?.productData?.materialId}
                      className="grid md:flex gap-4 pb-4 border-b mb-4"
                    >
                      <div className="rounded-md overflow-hidden size-32 bg-green-400 flex-shrink-0">
                        <img
                          src={
                            product?.productData?.styleImageOne ||
                            product?.productData?.materialImageOne
                          }
                          alt=""
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div className="w-full">
                        <div className="mb-3 md:mb-2 grid md:flex gap-1 items-center justify-between">
                          <Link
                            to={`/product-detail/${btoa(
                              product?.productData?.catalogueId ||
                                product?.productData?.materialId
                            )}`}
                            className="font-semibold text-[14px] hover:underline hover:text-primary"
                          >
                            {product?.productData?.styleName ||
                              product?.productData?.materialName}
                          </Link>
                          <div className="font-bold text-xs">
                            £{product?.productData?.price.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 md:gap-0 md:divide-x-2">
                          <Link
                            to={`/tailor-profile/${btoa(
                              product?.productData?.vendorId
                            )}`}
                            className="flex items-center gap-1 md:pe-4"
                          >
                            <img src={store} alt="" className="h-[14px]" />
                            <div className="text-black/50 text-xs">
                              {product?.productData?.vendorData?.businessName}
                            </div>
                          </Link>
                          <div className="flex items-center gap-1 md:ps-4">
                            <img src={material} alt="" className="h-[18px]" />
                            <div className="text-black/50 text-xs">
                              {product?.size}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 md:ps-4">
                            <img
                              src={productColor}
                              alt=""
                              className="h-[18px]"
                            />
                            <div className="text-black/50 text-xs">
                              {product?.color}
                            </div>
                          </div>
                          <div
                            className={`${
                              !product.material
                                ? "hidden"
                                : "flex items-center gap-1 md:ps-4"
                            }`}
                          >
                            <img src={material} alt="" className="h-[18px]" />
                            <div className="text-black/50 text-xs">
                              {product?.productData?.material}
                            </div>
                          </div>
                        </div>
                        <div
                          className="mt-4 text-red-500"
                          onClick={() => {
                            formik.setFieldValue("id", product.id);
                            formik.handleSubmit();
                          }}
                        >
                          remove item
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 lg:relative">
            <div className="bg-white border rounded-md overflow-hidden lg:sticky lg:top-5">
              <div className="bg-primary text-white px-4 py-6 border-b">
                <div className="font-bold secondary-font">Summary</div>
              </div>
              <div className="p-4">
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <div className="text-[#c4c4c4]">Order amount:</div>
                    <div className="text-xs font-bold">£{orderTotal}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[#c4c4c4]">Platform fee:</div>
                    <div className="text-xs font-bold">£{platformFee} </div>
                  </div>
                  {/* <div className="flex justify-between">
                    <div className="text-[#c4c4c4]">Delivery:</div>
                    <div className="text-xs font-bold">£0.00 </div>
                  </div> */}
                </div>
                <div className="flex justify-between text-primary text-sm font-semibold border-t mt-5 pt-5">
                  <div>Total:</div>
                  <div className="font-bold">£{formattedTotalPrice} </div>
                </div>
                <div className="mt-10 mb-4 flex justify-end">
                  <Button
                    buttonRole={"link"}
                    destination={"/user-checkout"}
                    buttonText={"Continue"}
                    otherStyles={"bg-primary/30 text-primary w-full"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
     
    </div>
  );
};

export default SessionCart;