import Back from "../../components/goBack";
import filterIcon from "../../assets/icons/filter.svg";
import Input from "../../components/input";
import ProductCard from "../../components/productCard";
import { useState } from "react";
import arrow from "../../assets/icons/arrow.svg";

const AllProducts = () => {
  const products = [
    { id: 1, vendorName: "Adekunle Couture", vendorLocation: "Lagos" },
    { id: 2, vendorName: "Chukwu Stitches", vendorLocation: "Abuja" },
    { id: 3, vendorName: "Oluwafemi Designs", vendorLocation: "Ibadan" },
    { id: 4, vendorName: "Amaka Tailoring", vendorLocation: "Enugu" },
    { id: 5, vendorName: "Usman Bespoke", vendorLocation: "Kano" },
    { id: 6, vendorName: "Ngozi Creations", vendorLocation: "Onitsha" },
    {
      id: 7,
      vendorName: "Babatunde Fashion House",
      vendorLocation: "Port Harcourt",
    },
    { id: 8, vendorName: "Halima Styles", vendorLocation: "Maiduguri" },
    { id: 9, vendorName: "Yakubu Fashions", vendorLocation: "Kaduna" },
    { id: 10, vendorName: "Funke Tailors", vendorLocation: "Ilorin" },
    { id: 11, vendorName: "Obinna Apparel", vendorLocation: "Owerri" },
    { id: 12, vendorName: "Aisha Couture", vendorLocation: "Sokoto" },
    { id: 13, vendorName: "Gbenga Stitches", vendorLocation: "Abeokuta" },
    { id: 14, vendorName: "Kehinde Designs", vendorLocation: "Akure" },
    { id: 15, vendorName: "Maryam Bespoke Tailoring", vendorLocation: "Yola" },
    { id: 16, vendorName: "Eze Custom Wears", vendorLocation: "Umuahia" },
    { id: 17, vendorName: "Fatai Couture", vendorLocation: "Osogbo" },
    { id: 18, vendorName: "Hassan Designs", vendorLocation: "Zaria" },
    { id: 19, vendorName: "Ifeoma Creations", vendorLocation: "Asaba" },
    { id: 20, vendorName: "Ahmed Styles", vendorLocation: "Minna" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProducts = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div className="grid md:flex items-center md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <div>
            <Back />
          </div>
          <div className="text-sm font-semibold">
            Tailors -{" "}
            <span className="text-[#c4c4c4] font-semibold text-xs">(41)</span>
          </div>
        </div>
        <div className="grid md:flex gap-2 md:gap-4 items-center">
          <div>
            <Input
              placeholder={"Search..."}
              type={"search"}
              customStyles={"w-full"}
              isSearch={"true"}
            />
          </div>
          <div className="flex items-center gap-4 px-6 py-5 md:py-4 w-fit justify-self-end border bg-white rounded-md">
            <img src={filterIcon} alt="filter" className="h-4" />
            <span className="text-primary">Filter</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            vendorName={product.vendorName}
            vendorLocation={product.vendorLocation}
          />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex items-center gap-2 mt-6 text-xs">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="size-8 rounded-md bg-primary/15 flex items-center justify-center disabled:opacity-50"
        >
          <img src={arrow} alt="" className="h-5 rotate-90" />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="size-8 rounded-md bg-primary/15 flex items-center justify-center disabled:opacity-50"
        >
          <img src={arrow} alt="" className="h-5 -rotate-90" />
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
