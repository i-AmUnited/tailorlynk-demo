import React, { useState } from "react";
import arrow from "../../assets/icons/arrow.svg";
import { useListCustomerOrders } from "../reuseableEffects";
import { Link } from "react-router-dom";

const Orders = () => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const orders = useListCustomerOrders() || []

  // const orders = [
  //   {
  //     id: 1,
  //     title: "Traditional agbada with Kampala material - 1",
  //     tailor: "Agbada specialist",
  //     cost: "250",
  //     date: "33 Jan, 2024",
  //     status: "Shipped",
  //   },
  //   {
  //     id: 2,
  //     title: "Traditional agbada with Kampala material - 2",
  //     tailor: "Agbada specialist",
  //     cost: "25000",
  //     date: "33 Jan, 2024",
  //     status: "Shipped",
  //   },
  //   {
  //     id: 3,
  //     title: "Quality linen material - 3",
  //     vendor: "FabricsNG",
  //     cost: "400",
  //     date: "25 Feb, 2024",
  //     status: "Shipped",
  //   },
  //   {
  //     id: 4,
  //     title: "Premium Silk Material",
  //     vendor: "FabricsNG",
  //     cost: "300",
  //     date: "01 Mar, 2024",
  //     status: "Shipped",
  //   },
  //   {
  //     id: 5,
  //     title: "Royal Aso-oke",
  //     tailor: "Royal Tailor",
  //     cost: "450",
  //     date: "10 Apr, 2024",
  //     status: "Shipped",
  //   },
  //   {
  //     id: 6,
  //     title: "Velvet Lace Material",
  //     vendor: "FabricMart",
  //     cost: "35",
  //     date: "05 May, 2024",
  //     status: "Shipped",
  //   },
  //   {
  //     id: 7,
  //     title: "Cotton Ankara Material",
  //     tailor: "Ankara World",
  //     cost: "20",
  //     date: "15 Jun, 2024",
  //     status: "Shipped",
  //   },
  //   {
  //     id: 8,
  //     title: "Embroidered Chiffon",
  //     tailor: "EmbroiderHub",
  //     cost: "4,000",
  //     date: "20 Jul, 2024",
  //     status: "Shipped",
  //   },
  //   {
  //     id: 9,
  //     title: "Designer Wool Material",
  //     vendor: "FabricHub",
  //     cost: "500",
  //     date: "30 Aug, 2024",
  //     status: "Shipped",
  //   },
  // ];

  const totalPages = Math.ceil(orders.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentOrders = orders.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="">
      <div className="px-4 py-6 border-b font-bold secondary-font">Orders</div>
      <div className="px-4 py-6 grid gap-4">
        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-8 grid gap-2">
            <p className="text-gray-500 font-bold secondary-font text-[14px]">No orders found</p>
            <div className="text-xs text-gray-500 secondary-font ">Your havent bought anything from Tailorlynk yet! <Link to={"/all-materials"} className="text-primary font-bold underline">Explore</Link>.</div>
          </div>
        ) : (
          currentOrders.map((order) => (
            <div key={order.id} className="border-b pb-4">
              <div className="grid md:flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1661332530594-cdebec770a38?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="order-img"
                  className="size-16 rounded-md object-cover"
                />
                <div className="grid w-full gap-2">
                  <div className="grid md:flex items-center justify-between gap-1">
                    <div className="font-semibold">{order.title}</div>
                    <div className="text-primary text-xs">[View item]</div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3 md:mt-0 text-xs">
                    <p className="grid col-span-2 md:col-span-1">
                      <span className=" text-black/50">Vendor/Tailor: </span>
                      <span className="text-primary font-semibold">
                        {order.tailor || order.vendor}
                      </span>
                    </p>
                    <p className="grid">
                      <span className=" text-black/50">Cost: </span>
                      <span className="font-semibold">£{order.cost}</span>
                    </p>
                    <p className="grid">
                      <span className=" text-black/50">Order date: </span>
                      <span className="font-semibold">{order.date}</span>
                    </p>
                  </div>
                  <div className="flex gap-2 items-center text-xs text-black/50 cursor-pointer">
                    <span>Order status:</span>
                    <span>{order.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {/* Pagination */}
        <div
          className={`${
            orders.length < 5 ? "hidden" : ""
          }  flex items-center gap-2 mt-6 text-xs`}
        >
          <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="size-8 rounded-md bg-primary/15 flex items-center justify-center disabled:opacity-50"
            >
              <img src={arrow} alt="" className="h-5 rotate-90"/>
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="size-8 rounded-md bg-primary/15 flex items-center justify-center disabled:opacity-50"
            >
              <img src={arrow} alt="" className="h-5 -rotate-90"/>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
