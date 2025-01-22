import { useState } from "react";
import arrow from "../../../assets/icons/arrow.svg";
import { Link } from "react-router-dom";

<<<<<<< HEAD
const VendorCatalogue = () => {
  const products = [
    { id: 1, name: "Traditional agbada with Kampala material", price: "320,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
    { id: 2, name: "Casual Ankara shirt", price: "45,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
    { id: 3, name: "Kente gown", price: "120,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
    { id: 4, name: "Igbo traditional wear", price: "90,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
    { id: 5, name: "Yoruba buba and sokoto", price: "75,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
    { id: 6, name: "Modern agbada", price: "150,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
    { id: 7, name: "Wedding gown", price: "400,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
    { id: 8, name: "Casual native wear", price: "50,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
    { id: 9, name: "Igbo wrapper and blouse", price: "85,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
    { id: 10, name: "Ankara skirt and blouse", price: "60,000 naira", image: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826" },
  ];
=======
const VendorCatalogue = ({ products = [], catalogueId}) => {
>>>>>>> 600ca51a835616c18fbbf9ae68acfe480e9e58ef

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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <Link to={`/product-detail/${product.catalogueId}`} >
            <div key={product.id} className="grid content-between md:text-xs">
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-video md:aspect-square object-cover rounded-md"
                />
                <div className="line-clamp-none md:line-clamp-1 mt-2 mb-1">{product.name}</div>
              </div>
<<<<<<< HEAD
              <div className="text-black/50 font-semibold">{product.price}</div>
=======
              <div className="text-black/50 font-semibold">{product.cost}, {product.materialId}</div>
>>>>>>> 600ca51a835616c18fbbf9ae68acfe480e9e58ef
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className={`flex items-center gap-2 mt-6 text-xs ${products.length > 6 ? "block" : "hidden"}`}>
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
  );
};

export default VendorCatalogue;
