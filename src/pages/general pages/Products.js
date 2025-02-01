import { useState } from "react";
import Back from "../../components/goBack";
import filterIcon from "../../assets/icons/filter.svg";
import Input from "../../components/input";
import ProductCard from "../../components/productCard";
import arrow from "../../assets/icons/arrow.svg";
import { useVendorList } from "../reuseableEffects";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinners/Spinner";


const AllProducts = () => {

  const vendorList = useVendorList();

  // const products = [
  //   { id: 1, vendorName: "Adekunle Couture", vendorLocation: "Lagos" },
  //   { id: 2, vendorName: "Chukwu Stitches", vendorLocation: "Abuja" },
  //   { id: 3, vendorName: "Oluwafemi Designs", vendorLocation: "Ibadan" },
  //   { id: 4, vendorName: "Amaka Tailoring", vendorLocation: "Enugu" },
  //   { id: 5, vendorName: "Usman Bespoke", vendorLocation: "Kano" },
  //   { id: 6, vendorName: "Ngozi Creations", vendorLocation: "Onitsha" },
  //   {
  //     id: 7,
  //     vendorName: "Babatunde Fashion House",
  //     vendorLocation: "Port Harcourt",
  //   },
  //   { id: 8, vendorName: "Halima Styles", vendorLocation: "Maiduguri" },
  //   { id: 9, vendorName: "Yakubu Fashions", vendorLocation: "Kaduna" },
  //   { id: 10, vendorName: "Funke Tailors", vendorLocation: "Ilorin" },
  //   { id: 11, vendorName: "Obinna Apparel", vendorLocation: "Owerri" },
  //   { id: 12, vendorName: "Aisha Couture", vendorLocation: "Sokoto" },
  //   { id: 13, vendorName: "Gbenga Stitches", vendorLocation: "Abeokuta" },
  //   { id: 14, vendorName: "Kehinde Designs", vendorLocation: "Akure" },
  //   { id: 15, vendorName: "Maryam Bespoke Tailoring", vendorLocation: "Yola" },
  //   { id: 16, vendorName: "Eze Custom Wears", vendorLocation: "Umuahia" },
  //   { id: 17, vendorName: "Fatai Couture", vendorLocation: "Osogbo" },
  //   { id: 18, vendorName: "Hassan Designs", vendorLocation: "Zaria" },
  //   { id: 19, vendorName: "Ifeoma Creations", vendorLocation: "Asaba" },
  //   { id: 20, vendorName: "Ahmed Styles", vendorLocation: "Minna" },
  // ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 12;

  const filteredList = vendorList.filter(
    (vendor) =>
      vendor.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.businessAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVendors = filteredList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Spinner loading={useSelector((state) => state.user).loading} />
      <div className="grid md:flex items-center md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <div>
            <Back />
          </div>
          <div className="text-sm font-semibold">
            Tailors -{" "}
            <span className="text-black/60 font-medium text-xs">
              [{searchQuery ? filteredList.length : vendorList.length}]
            </span>
          </div>
        </div>
        <div className="grid md:flex gap-2 md:gap-4 items-center">
          <div>
            <Input
              placeholder="Search..."
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              customStyles="w-full"
              isSearch="true"
            />
          </div>
          <div className="flex items-center gap-4 px-6 py-5 md:py-4 w-fit justify-self-end border cursor-pointer hover:border-primary transition-all bg-white rounded-md">
            <img src={filterIcon} alt="filter" className="h-4" />
            <span className="text-primary">Filter</span>
          </div>
        </div>
      </div>
      {filteredList.length === 0 ? (
        <div>No vendor matches your search result.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentVendors.map((vendor) => (
            <ProductCard
              key={vendor.vendorId}
              vendorName={vendor.businessName}
              vendorLocation={vendor.businessAddress}
              rating={vendor.rating}
              coverPhoto={vendor.brandLogo}
              vendorID={vendor.vendorId}
            />
          ))}
        </div>
      )}
      {/* Pagination */}
      <div className={`${filteredList.length === 0 || filteredList.length < 12 ? "hidden" : ""} flex items-center gap-2 mt-6 text-xs`}>
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
