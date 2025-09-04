import info from "../../assets/icons/info.svg";
import { Link } from "react-router-dom";
import { useCart } from "../../components/cartContext";
import removeItemIcon from "../../assets/icons/remove.svg";
import store from "../../assets/icons/store.svg";
import material from "../../assets/icons/material.svg";
import { useState, useEffect } from "react";
import Back from "../../components/goBack";
import Button from "../../components/button";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateCartQuantity } = useCart();

  // console.log(cart)

  const rawOrderTotal = cart.reduce((sum, item) => {
  const price = parseFloat(item.price.replace(/,/g, ''));
  return sum + (price * item.quantity);
}, 0);

const deliveryFee = 10;
const insuranceFee = 10;

// Keep as numbers for calculation
const totalPrice = rawOrderTotal + deliveryFee + insuranceFee;

// Format only when you need to display them
const formattedOrderTotal = rawOrderTotal.toLocaleString();
const formattedTotalPrice = totalPrice.toLocaleString();
  
  // Track individual product quantities - handles both catalogueId and materialId
  const [quantity, setQuantity] = useState(() => {
    return cart.reduce((acc, product) => {
      // Use whichever ID is available
      const productId = product.catalogueId || product.materialId;
      acc[productId] = product.quantity || 1;
      return acc;
    }, {});
  });
  
  // Update quantities when cart changes
  useEffect(() => {
    setQuantity(cart.reduce((acc, product) => {
      const productId = product.catalogueId || product.materialId;
      acc[productId] = product.quantity || 1;
      return acc;
    }, {}));
  }, [cart]);

  // Helper function to get product ID (either catalogueId or materialId)
  const getProductId = (product) => {
    return product.catalogueId || product.materialId;
  };

  const handleIncrease = (id) => {
    setQuantity((prev) => {
      const newQuantity = (prev[id] || 1) + 1;
      updateCartQuantity(id, newQuantity);
      return { ...prev, [id]: newQuantity };
    });
  };

  const handleDecrease = (id) => {
    if (quantity[id] > 1) {
      setQuantity((prev) => {
        const newQuantity = prev[id] - 1;
        updateCartQuantity(id, newQuantity);
        return { ...prev, [id]: newQuantity };
      });
    }
  };

  return (
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
                  const productId = getProductId(product);
                  return (
                    <div
                      key={productId}
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
                            to={`/product-detail/${btoa(productId)}`}
                            className="font-semibold text-[14px] hover:underline hover:text-primary"
                          >
                            {product.styleName || product.materialName}
                          </Link>
                          <div className="font-bold text-xs">
                            £
                            {!product.category
                              ? product.cost
                              : product.category === "Ready_Made" ||
                                product.category === "Western"
                              ? product.price
                              : product.category === "Material"
                              ? product.costPerYard
                              : "N/A"}
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
                              onClick={() => handleDecrease(productId)}
                              className="rounded-md text-xs px-3 py-2 font-semibold bg-primary/30 text-primary cursor-pointer"
                              disabled={quantity[productId] === 1}
                            >
                              -
                            </span>
                            <span className="w-8 text-center text-xs font-semibold">
                              {quantity[productId] || 1}
                            </span>
                            <div
                              onClick={() => handleIncrease(productId)}
                              className="rounded-md text-xs px-3 py-2 font-semibold bg-primary/30 text-primary cursor-pointer"
                            >
                              +
                            </div>
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => removeFromCart(productId)}
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
                {/* <Link to={"/checkout"}>Checkout</Link> */}
                <div className="mt-10 mb-4 flex justify-end">
                  <Button
                    buttonRole={"link"}
                    destination={"/checkout"}
                    buttonText={"Checkout"}
                    otherStyles={"bg-primary/30 text-primary w-full"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;