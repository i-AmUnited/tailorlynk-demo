import { useState } from "react";
import { useSelector } from "react-redux";
import Back from "../../components/goBack";
import filterIcon from "../../assets/icons/filter.svg";
import Input from "../../components/input";
import arrow from "../../assets/icons/arrow.svg";
import { useMaterialList } from "../reuseableEffects";
import Spinner from "../../components/Spinners/pageLoadingSpinner";
import MaterialProductCard from "../../components/materialProductCard";

const AllMaterialProducts = () => {
  const listMaterial = useMaterialList();
  const loading = useSelector((state) => state.user.loading);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 12;

  // Filtered vendor list
  const filteredList = listMaterial
  .filter((material) => material.category?.toLowerCase() === "material")
  .filter((material) =>
    material.materialName.toLowerCase().includes(searchQuery.toLowerCase())
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
            Materials
            <span className="text-black/60 font-medium text-xs">
              [{searchQuery ? filteredList.length : filteredList.length}]
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
        </div>
      </div>

      {filteredList.length === 0 ? (
        <div>No vendor matches your search result.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentVendors.map((material) => (
              <MaterialProductCard 
                key={material.materialId}
                materialName={material.materialName}
                materialPhoto={material.materialImageOne}
                materialID={material.materialId}
                price={material.costPerYard}
              />
            ))}
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

export default AllMaterialProducts;
