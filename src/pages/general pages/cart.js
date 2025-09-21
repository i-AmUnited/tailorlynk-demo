import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../components/cartContext";
import removeItemIcon from "../../assets/icons/remove.svg";
import store from "../../assets/icons/store.svg";
import material from "../../assets/icons/material.svg";
import { useState, useEffect } from "react";
import Back from "../../components/goBack";
import Button from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { removeCartItem } from "../../hooks/local/reducer";
import Spinner from "../../components/Spinners/pageLoadingSpinner";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateCartQuantity } = useCart();
  console.log(cart);

    const dispatch = useDispatch();
   const navigate = useNavigate();

  const formik = useFormik({
      initialValues: { id: "" },
      onSubmit: async (values) => {
        if (values.id) {
          try {
            await dispatch(removeCartItem(values.id)).unwrap(); 
            // unwrap ensures you only continue if fulfilled
            navigate("/cart");
          } catch (error) {
            console.error("Failed to remove item:", error);
          }
        }
      },
  });

  const getItemPrice = (item) => {
    if (!item.category) {
      return parseFloat(item.cost || 0);
    }
    
    switch (item.category) {
      case "Ready_Made":
      case "Western":
        return parseFloat(item.price || 0);
      case "Material":
        return parseFloat(item.costPerYard || 0);
      default:
        return 0;
    }
  };

  const getDisplayPrice = (product) => {
    if (!product.category) {
      return product.cost;
    }
    
    switch (product.category) {
      case "Ready_Made":
      case "Western":
        return product.price;
      case "Material":
        return product.costPerYard;
      default:
        return "N/A";
    }
  };

  // Fixed price calculation using the local helper function
  const rawOrderTotal = cart.reduce((sum, item) => {
    const price = getItemPrice(item);
    return sum + (price * item.quantity);
  }, 0);

  const deliveryFee = 0.00;
  const insuranceFee = 5;

  const totalPrice = rawOrderTotal + deliveryFee + insuranceFee;
  const formattedOrderTotal = rawOrderTotal.toLocaleString();
  const formattedTotalPrice = totalPrice.toLocaleString();

  const [quantity, setQuantity] = useState(() => {
  return cart.reduce((acc, product) => {
    acc[product.cartInstanceId] = parseInt(product.quantity) || 1; // Ensure number
    return acc;
  }, {});
});

useEffect(() => {
  setQuantity(cart.reduce((acc, product) => {
    acc[product.cartInstanceId] = parseInt(product.quantity) || 1; // Ensure number
    return acc;
  }, {}));
}, [cart]);

  const handleIncrease = (cartInstanceId) => {
  setQuantity((prev) => {
    const currentQuantity = parseInt(prev[cartInstanceId]) || 1; // Convert to number
    const newQuantity = currentQuantity + 1;
    updateCartQuantity(cartInstanceId, newQuantity);
    return { ...prev, [cartInstanceId]: newQuantity };
  });
};

const handleDecrease = (cartInstanceId) => {
  setQuantity((prev) => {
    const currentQuantity = parseInt(prev[cartInstanceId]) || 1; // Convert to number
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      updateCartQuantity(cartInstanceId, newQuantity);
      return { ...prev, [cartInstanceId]: newQuantity };
    }
    return prev;
  });
};

  return (
    <div>
      <Spinner loading={useSelector((state) => state.user).loading} />
      <div>
        {cart.length === 0 ? (
        <p>Your cart is empty.</p>
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <div className="bg-white border rounded-md overflow-hidden">
              <div className="flex items-center justify-between bg-white px-4 py-4 border-b">
                <div className="font-bold secondary-font flex items-center gap-3">
                  <Back />
                  <div>My cart</div>
                </div>
                <button
                  onClick={clearCart}
                  className="text-red-600 text-xs font-semibold underline underline-offset-2 cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
              <div className="p-4">
                {cart.map((product) => {
                  return (
                    <div
                      key={product.cartInstanceId}
                      className="grid md:flex gap-4 pb-4 border-b mb-4"
                    >
                      <div className="rounded-md overflow-hidden size-32 bg-green-400 flex-shrink-0">
                        <img
                          src={
                            product.styleImageOne || product.materialImageOne
                          }
                          alt=""
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div className="w-full">
                        <div className="mb-3 md:mb-2 grid md:flex gap-1 items-center justify-between">
                          <Link
                            to={`/product-detail/${btoa(product.catalogueId || product.materialId)}`}
                            className="font-semibold text-[14px] hover:underline hover:text-primary"
                          >
                            {product.styleName || product.materialName}
                          </Link>
                          <div className="font-bold text-xs">
                            £{getDisplayPrice(product)}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 md:gap-0 md:divide-x-2">
                          <Link
                            to={`/tailor-profile/${btoa(
                              product.vendorData.vendorId
                            )}`}
                            className="flex items-center gap-1 md:pe-4"
                          >
                            <img src={store} alt="" className="h-[14px]" />
                            <div className="text-black/50 text-xs">
                              {product.vendorData.businessName}
                            </div>
                          </Link>
                          <div className="flex items-center gap-1 md:ps-4">
                            <img src={material} alt="" className="h-[18px]" />
                            <div className="text-black/50 text-xs">
                              {product.selectedSize}
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
                              {product.material}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1">
                            <span
                              onClick={() => handleDecrease(product.cartInstanceId)}
                              className="rounded-md text-xs px-3 py-2 font-semibold bg-primary/30 text-primary cursor-pointer"
                            >
                              -
                            </span>
                            <span className="w-8 text-center text-xs font-semibold">
                              {product.quantity}
                            </span>
                            <div
                              onClick={() => handleIncrease(product.cartInstanceId)}
                              className="rounded-md text-xs px-3 py-2 font-semibold bg-primary/30 text-primary cursor-pointer"
                            >
                              +
                            </div>
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => removeFromCart(product.cartInstanceId)}
                          >
                            <img alt="" src={removeItemIcon} className="h-5" />
                          </div>
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
                    <div className="text-xs font-bold">£{formattedOrderTotal}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[#c4c4c4]">Insurance fee:</div>
                    <div className="text-xs font-bold">£{insuranceFee} </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[#c4c4c4]">Delivery:</div>
                    <div className="text-xs font-bold">£{deliveryFee} </div>
                  </div>
                </div>
                <div className="flex justify-between text-primary text-sm font-semibold border-t mt-5 pt-5">
                  <div>Total:</div>
                  <div className="font-bold">£{formattedTotalPrice} </div>
                </div>
                <div className="mt-10 mb-4 flex justify-end">
                  <Button
                    buttonRole={"link"}
                    destination={"/checkout"}
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

export default Cart;