import { useState } from "react";
import arrow from "../../../assets/icons/arrow.svg";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const VendorCatalogue = ({ products = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <Link key={product.id} to={`/product-detail/${btoa(product.catalogueId)}`}>
            <div className="grid content-between md:text-xs">
              <LazyLoadImage effect="blur" src={product.styleImageOne} alt={product.name} className="w-full aspect-video md:aspect-square object-cover rounded-md" />
              <div className="line-clamp-none md:line-clamp-1 mt-2 mb-1">{product.styleName}</div>
              <div className="text-black/50 font-semibold">{product.cost}, {product.materialId}</div>
            </div>
          </Link>
        ))}
      </div>

      {products.length > itemsPerPage && (
        <div className="flex items-center gap-2 mt-6 text-xs">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="size-8 rounded-md bg-primary/15 flex items-center justify-center disabled:opacity-50">
            <img src={arrow} alt="Previous" className="h-5 rotate-90" />
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="size-8 rounded-md bg-primary/15 flex items-center justify-center disabled:opacity-50">
            <img src={arrow} alt="Next" className="h-5 -rotate-90" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VendorCatalogue;
