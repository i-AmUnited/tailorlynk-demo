import { useState } from "react";
import { useSelector } from "react-redux";
import Back from "../../components/goBack";
import filterIcon from "../../assets/icons/filter.svg";
import Input from "../../components/input";
import ProductCard from "../../components/productCard";
import arrow from "../../assets/icons/arrow.svg";
import { useVendorList } from "../reuseableEffects";
import Spinner from "../../components/Spinners/pageLoadingSpinner";

const AllProducts = () => {
  const vendorList = useVendorList();
  const loading = useSelector((state) => state.user.loading);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 12;

  // Filtered vendor list
  const filteredList = vendorList.filter(
    (vendor) =>
      vendor.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.businessAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const currentVendors = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Spinner loading={loading} />
      <div className="grid md:flex items-center md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <Back />
          <div className="text-sm font-semibold">
            Tailors -{" "}
            <span className="text-black/60 font-medium text-xs">
              [{searchQuery ? filteredList.length : vendorList.length}]
            </span>
          </div>
        </div>
        <div className="grid md:flex gap-2 md:gap-4 items-center">
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
          {currentVendors.map((vendor) => {
            const coverPhoto = vendor.brandLogo || "";
            const baseImageURL = coverPhoto.replace(/(&sz=).*$/, "&sz=");

            const newSize = "w100";
            const placeholderImage = baseImageURL + newSize

            return (
              <ProductCard
                key={vendor.vendorId}
                vendorName={vendor.businessName}
                vendorLocation={vendor.businessAddress}
                rating={vendor.rating}
                coverPhoto={coverPhoto}
                loadingPlaceholderImage={placeholderImage}
                vendorID={vendor.vendorId}
              />
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {filteredList.length > itemsPerPage && (
        <div className="flex items-center gap-2 mt-6 text-xs">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="size-8 rounded-md bg-primary/15 flex items-center justify-center disabled:opacity-50"
          >
            <img src={arrow} alt="Previous" className="h-5 rotate-90" />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage >= totalPages}
            className="size-8 rounded-md bg-primary/15 flex items-center justify-center disabled:opacity-50"
          >
            <img src={arrow} alt="Next" className="h-5 -rotate-90" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
