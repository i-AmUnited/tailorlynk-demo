import React, { useState } from "react";
import arrow from "../../assets/icons/arrow.svg";
import { Link, useNavigate } from "react-router-dom";
import { useListSavedItems } from "../reuseableEffects";
import Spinner from "../../components/Spinners/pageLoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import deleteIcon from "../../assets/icons/delete.svg";
import { useFormik } from "formik";
import { removeSavedItem } from "../../hooks/local/reducer"; // adjust path if needed

function SavedItems() {
  const savedStyles = useListSavedItems();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const dispatch = useDispatch();
   const navigate = useNavigate();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = savedStyles.slice(startIndex, endIndex);
  const totalPages = Math.ceil(savedStyles.length / itemsPerPage);

  const formik = useFormik({
    initialValues: { id: "" },
    onSubmit: async (values) => {
      if (values.id) {
        try {
          await dispatch(removeSavedItem(values.id)).unwrap(); 
          // unwrap ensures you only continue if fulfilled
          navigate("/user-account/saved-styles");
        } catch (error) {
          console.error("Failed to remove item:", error);
          
        }
      }
    },
});

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="">
      <Spinner loading={useSelector((state) => state.user).loading} />
      <div className="px-4 py-6 border-b font-bold secondary-font">
        Saved items
      </div>

      <div className="px-4 py-6">
        {savedStyles.length === 0 ? (
          <div className="text-center py-8 grid gap-2">
            <p className="text-gray-500 font-bold secondary-font text-[14px]">
              No styles found
            </p>
            <div className="text-xs text-gray-500 secondary-font ">
              Your haven't saved any styles yet!{" "}
              <Link
                to={"/all-materials"}
                className="text-primary font-bold underline"
              >
                See what we have to offer
              </Link>
              .
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
              <div key={product.productData.materialId} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    formik.setFieldValue("id", product.productData.materialId);
                    formik.handleSubmit();
                  }}
                  className="size-8 absolute w-full h-full flex justify-end p-4"
                >
                  <div className="bg-red-500/80 backdrop-blur-lg size-8 flex items-center justify-center rounded">
                    <img alt="delete" src={deleteIcon} className="h-4" />
                  </div>
                </button>
                <Link
                  to={`/product-detail/${btoa(
                    product.productData.materialId
                  )}`}
                >
                  <div className="grid content-between md:text-xs">
                    <div>
                      <img
                        src={product?.productData.materialImageOne}
                        alt={product?.productData.materialName}
                        className="w-full aspect-video md:aspect-square object-cover rounded-md"
                      />
                      <div className="line-clamp-none md:line-clamp-1 mt-2 mb-1">
                        {product?.productData.materialName}
                      </div>
                    </div>
                    <div className="text-black/50 font-semibold">
                      £{product?.productData.price}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div
          className={`${
            savedStyles.length < 6 ? "hidden" : ""
          } flex items-center gap-2 mt-6 text-xs`}
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
    </div>
  );
}

export default SavedItems;
