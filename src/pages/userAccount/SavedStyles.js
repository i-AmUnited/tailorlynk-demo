import React, { useState } from "react";
import arrow from "../../assets/icons/arrow.svg";
import { Link } from "react-router-dom";


function SavedItems() {
  const [savedStylesDisplay, setSavedStylesDisplay] = useState(true);
const [savedMaterialsDisplay, setSavedMaterialsDisplay] = useState(false);

const showSavedStyles = () => { 
  setSavedStylesDisplay(true)
  setSavedMaterialsDisplay(false)
}
const showSavedMaterials = () => { 
  setSavedMaterialsDisplay(true)
  setSavedStylesDisplay(false)
}

const savedStyles = [
  { id: 1, name: "Traditional agbada with Kampala material", price: "320,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
  { id: 2, name: "Casual Ankara shirt", price: "45,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
  { id: 3, name: "Kente gown", price: "120,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
  { id: 4, name: "Igbo traditional wear", price: "90,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
  { id: 5, name: "Yoruba buba and sokoto", price: "75,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
  { id: 6, name: "Modern agbada", price: "150,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
  { id: 7, name: "Wedding gown", price: "400,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
  { id: 8, name: "Casual native wear", price: "50,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
  { id: 9, name: "Igbo wrapper and blouse", price: "85,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
];

const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProducts = savedStyles.slice(startIndex, endIndex);

  const totalPages = Math.ceil(savedStyles.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="">
      <div className="px-4 py-6 border-b font-bold secondary-font">
        Saved items
      </div>

      <div className="px-4 py-6">
        <div className="mb-6 flex gap-1 text-xs border rounded w-fit font-medium p-1">
          <span
            onClick={showSavedStyles}
            className={`cursor-pointer px-4 py-2 ${
              savedStylesDisplay
                ? " bg-primary/10 text-primary"
                : " text-black/60"
            }`}
          >
            Styles
          </span>
          <div className="border-l my-1"></div>
          <span
            onClick={showSavedMaterials}
            className={`cursor-pointer px-4 py-2  ${
              savedMaterialsDisplay
                ? " bg-primary/10 text-primary"
                : " text-black/60"
            }`}
          >
            Materials
          </span>
        </div>
        {savedStylesDisplay && (
          <div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
              <Link to={"/product-detail"}>
                <div key={product.id} className="grid content-between md:text-xs">
                  <div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-video md:aspect-square object-cover rounded-md"
                    />
                    <div className="line-clamp-none md:line-clamp-1 mt-2 mb-1">{product.name}</div>
                  </div>
                  <div className="text-black/50 font-semibold">{product.price}</div>
                </div>
              </Link>
            ))}
          </div>
    
          {/* Pagination */}
          <div className="flex items-center gap-2 mt-6 text-xs">
            <button
              onClick={goToPreviousPage}
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
        )}
        {savedMaterialsDisplay && <div>Saved materials</div>}
      </div>
    </div>
  );
}

export default SavedItems;
