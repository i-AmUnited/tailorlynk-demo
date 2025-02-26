import { useState } from "react";
import arrow from "../../../assets/icons/arrow.svg";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const VendorCatalogue = ({ products = [], catalogueId}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  if (products.length === 0) {
    return <div className="text-gray-500">No products available.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <Link to={`/product-detail/${btoa(product.catalogueId)}`}>
            <div key={product.id} className="grid content-between md:text-xs">
              <div>
                {/* <img
                  src={product.styleImageOne}
                  alt={product.name}
                  className="w-full aspect-video md:aspect-square object-cover rounded-md"
                /> */}
                <LazyLoadImage
                  effect="blur"
                  src={product.styleImageOne}
                  alt={product.name}
                  className="w-full aspect-video md:aspect-square object-cover rounded-md"
                />
                <div className="line-clamp-none md:line-clamp-1 mt-2 mb-1">
                  {product.styleName}
                </div>
              </div>
              <div className="text-black/50 font-semibold">
                {product.cost}, {product.materialId}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div
        className={`flex items-center gap-2 mt-6 text-xs ${
          products.length > 6 ? "block" : "hidden"
        }`}
      >
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

export default VendorCatalogue;
