import info from "../../assets/icons/info.svg";
import { Link } from "react-router-dom";
import { useCart } from "../../components/cartContext";
import removeItemIcon from "../../assets/icons/remove.svg";
import store from "../../assets/icons/store.svg";
import material from "../../assets/icons/material.svg";
import { useState } from "react";
import Back from "../../components/goBack";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateCartQuantity } = useCart();
  
  // Track individual product quantities
  const [quantity, setQuantity] = useState(
    cart.reduce((acc, product) => {
      acc[product.catalogueId] = product.quantity || 1;
      return acc;
    }, {})
  );

  // const handleIncrease = (id) => {
  //   setQuantity((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  // };

  // const handleDecrease = (id) => {
  //   if (quantity[id] > 1) {
  //     setQuantity((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  //   }
  // };

  const handleIncrease = (id) => {
  setQuantity((prev) => {
    const newQuantity = prev[id] + 1;
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
          <div className="lg:col-span-8 bg-white border rounded-md overflow-hidden">
            <div className="flex items-center justify-between bg-white px-4 py-4 border-b">
              <div className="font-bold secondary-font flex items-center gap-3">
                <Back />
                <div>My cart</div>
              </div>
              {/* <Link to={"/all-products"} className="text-xs text-primary font-semibold underline underline-offset-2 cursor-pointer">
                Continue shopping
              </Link> */}
              <button onClick={clearCart} className="text-red-600 text-xs font-semibold underline underline-offset-2 cursor-pointer">Clear Cart</button>
            </div>
            <div className="p-4">
              {cart.map((product) => (
                <div key={product.catalogueId} className="grid md:flex gap-4 pb-4 border-b last:pb-0 mb-4">
                  <div className="rounded-md overflow-hidden size-32 bg-green-400 flex-shrink-0">
                    <img src={product.styleImageOne} alt="" className="object-cover h-full w-full" />
                  </div>
                  <div className="w-full">
                    <div className="mb-3 md:mb-2 grid md:flex gap-1 items-center justify-between">
                      <Link
                        to={`/product-detail/${btoa(product.catalogueId)}`}
                        className="font-semibold text-[14px] hover:underline hover:text-primary"
                      >
                        {product.styleName}
                      </Link>
                      <div className="font-medium">
                        <span className="text-black/50 font-bold">NGN</span>
                        {product.cost}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 md:gap-0 md:divide-x-2">
                      <Link to={`/tailor-profile/${btoa(product.vendorData.vendorId)}`} className="flex items-center gap-1 md:pe-4">
                        <img src={store} alt="" className="h-[14px]" />
                        <div className="text-black/50 text-xs">{product.vendorData.businessName}</div>
                      </Link>
                      <div className="flex items-center gap-1 md:ps-4">
                        <img src={material} alt="" className="h-[18px]" />
                        <div className="text-black/50 text-xs">{product.material}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1">
                        <span
                          onClick={() => handleDecrease(product.catalogueId)}
                          className="rounded-md text-xs px-3 py-2 font-semibold bg-primary/30 text-primary cursor-pointer"
                          disabled={quantity[product.catalogueId] === 1}
                        >
                          -
                        </span>
                        <span className="w-8 text-center text-xs font-semibold">{quantity[product.catalogueId]}</span>
                        <div
                          onClick={() => handleIncrease(product.catalogueId)}
                          className="rounded-md text-xs px-3 py-2 font-semibold bg-primary/30 text-primary cursor-pointer"
                        >
                          +
                        </div>
                      </div>
                      <div className="cursor-pointer" onClick={() => removeFromCart(product.catalogueId)}>
                        <img alt="" src={removeItemIcon} className="h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4 grid md:flex gap-3 items-center">
                <img alt="" src={info} />
                <div className="text-xs leading-5">
                  You haven’t added a clothing material to this purchase. Your tailor will need a material to work with.
                  <span className="text-primary underline underline-offset-2"> Explore “Traditional kampala” materials</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 lg:relative">
            <div className="bg-white border rounded-md overflow-hidden lg:sticky lg:top-5">
              <div className="bg-primary text-white px-4 py-6 border-b">
                <div className="font-bold secondary-font">Summary</div>
              </div>
              <div className="p-4 grid gap-6">
                <div className="flex justify-between">
                  <div className="text-[#c4c4c4]">Transaction code:</div>
                  <div>VC115665</div>
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <div className="text-[#c4c4c4]">Tailor charge:</div>
                    <div>&#8358;25,000 </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[#c4c4c4]">Material:</div>
                    <div>&#8358;5,000 </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[#c4c4c4]">Delivery:</div>
                    <div>&#8358;2,500 </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[#c4c4c4]">Insurance:</div>
                    <div>&#8358;2,500 </div>
                  </div>
                </div>
                <div className="flex justify-between text-primary text-sm font-semibold">
                  <div>Total:</div>
                  <div>&#8358;35,000 </div>
                </div>
                <Link to={"/checkout"}>Checkout</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
