import React, { useState } from "react";
import arrow from "../../assets/icons/arrow.svg";

const Orders = () => {
  
  const [orderStatusDetails, setOrderStatusDetails] = useState(false);
  const toggleOrderStatusDetails = (orderId) => {
    setOrderStatusDetails((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const orders = [
    {
      id: 1,
      title: "Traditional agbada with Kampala material - 1",
      tailor: "Agbada specialist",
      cost: "25,000,000 naira",
      date: "33 Jan, 2024",
      status: "Shipped",
    },
    {
      id: 2,
      title: "Traditional agbada with Kampala material - 2",
      tailor: "Agbada specialist",
      cost: "25,000 naira",
      date: "33 Jan, 2024",
      status: "Work in progress",
    },
    {
      id: 3,
      title: "Quality linen material - 3",
      vendor: "FabricsNG",
      cost: "25,000 naira",
      date: "25 Feb, 2024",
      delivered: true,
    },
    {
      id: 4,
      title: "Premium Silk Material",
      vendor: "FabricsNG",
      cost: "30,000 naira",
      date: "01 Mar, 2024",
    },
    {
      id: 5,
      title: "Royal Aso-oke",
      tailor: "Royal Tailor",
      cost: "40,000 naira",
      date: "10 Apr, 2024",
      status: "Work completed",
    },
    {
      id: 6,
      title: "Velvet Lace Material",
      vendor: "FabricMart",
      cost: "35,000 naira",
      date: "05 May, 2024",
    },
    {
      id: 7,
      title: "Cotton Ankara Material",
      tailor: "Ankara World",
      cost: "20,000 naira",
      date: "15 Jun, 2024",
    },
    {
      id: 8,
      title: "Embroidered Chiffon",
      tailor: "EmbroiderHub",
      cost: "45,000 naira",
      date: "20 Jul, 2024",
    },
    {
      id: 9,
      title: "Designer Wool Material",
      vendor: "FabricHub",
      cost: "50,000 naira",
      date: "30 Aug, 2024",
    },
  ];

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
        {currentOrders.map((order) => (
          <div key={order.id} className="border-b pb-4">
            <div className="grid md:flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1661332530594-cdebec770a38?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="order-img"
                className="size-16 rounded-md object-cover"
              />
              <div className="grid w-full gap-4">
                <div className="grid gap-2 md:flex items-center justify-between">
                  <div className="font-semibold order-2 md:order-1">{order.title}</div>
                  <div className="text-primary text-xs order-1 md:order-2">[View item]</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <p className="grid col-span-2 md:col-span-1">
                    <span className="font-medium">Vendor/Tailor: </span>
                    <span className="text-primary">
                      {order.tailor || order.vendor}
                    </span>
                  </p>
                  <p className=" grid">
                    <span className="font-medium">Cost: </span>
                    <span>{order.cost}</span>
                  </p>
                  <p className="grid">
                    <span className="font-medium">Date: </span>
                    <span>{order.date}</span>
                  </p>
                </div>
                <div className="grid gap-1 text-xs">
                  <div className="flex gap-2 items-center text-black/50 cursor-pointer" onClick={() => toggleOrderStatusDetails(order.id)}>
                    <span>Order status:</span>
                    <span>Work in progress</span>
                    <img alt="" src={arrow} className={`${orderStatusDetails[order.id] ? "rotate-180 h-5" : "-rotate-90 h-5"} `} />
                  </div>
                  {
                    orderStatusDetails[order.id] &&
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                      <div className="flex items-center gap-2"><div className="size-2 bg-primary rounded-full"></div><div>Order received</div></div>
                      <div className="flex items-center gap-2 opacity-35"><div className="size-2 bg-primary rounded-full"></div><div>Work in progress</div></div>
                      <div className="flex items-center gap-2 opacity-35"><div className="size-2 bg-primary rounded-full"></div><div>Work completed</div></div>
                      <div className="flex items-center gap-2 opacity-35"><div className="size-2 bg-primary rounded-full"></div><div>Order shipped</div></div>
                    </div>
                  }
                </div>
              </div>
            </div>
            {/* Order status */}
            {order.delivered && (
              <div className="mt-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <span className="mr-2">ℹ️</span>
                  Your order has been delivered.{" "}
                  <a href="#" className="text-[#CB997E] underline ml-1">
                    Write a review
                  </a>
                </span>
              </div>
            )}
          </div>
        ))}
        {/* Pagination */}
        <div className="flex items-center gap-2 mt-6 text-xs">
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
