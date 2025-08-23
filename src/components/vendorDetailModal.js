import { useVendorDetail } from "../pages/reuseableEffects";
import { useEffect } from "react";
import Spinner from "../components/Spinners/Spinner";
import Button from "./button";
import { useSelector } from "react-redux";

const VendorDetailModal = ({ vendorId, isOpen, onClose }) => {
    const vendorDetail = useVendorDetail(vendorId);
    const vendorData = vendorDetail?.vendorData;
    const materialData = vendorDetail?.materialData;

    
  const userSessionData = useSelector((state) => state.user.userSession);

    const getRandomItems = (array, count) => {
      if (!array || array.length === 0) return [];

      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, count);
    };

    // Filter for Ready_Made items first
    const readyMadeItems = materialData?.filter(item => item.category === "Ready_Made") || [];

    const vendorPreview = getRandomItems(readyMadeItems, 2);
    // console.log(materialData, readyMadeItems);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-lg mx-4 w-full md:w-1/3 max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
          >
            ×
          </button>
          <div className="p-6">
            {!vendorDetail ? (
              <div className="flex items-center justify-center gap-4 py-8">
                <Spinner />{" "}
                <div className="text-md font-bold text-black">
                  Loading vendor preview...
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Vendor Header */}
                <div className="border-b pb-4 flex items-center gap-2">
                  {vendorData?.brandLogo && (
                    <div className="flex justify-center">
                      <img
                        src={vendorData.brandLogo}
                        alt={`${vendorData.businessName} logo`}
                        className="size-12 object-cover rounded-full"
                      />
                    </div>
                  )}
                  <div className="truncate max-w-[80%]">
                    <p className="font-bold">{vendorData?.businessName}</p>
                    {vendorData?.businessAddress && (
                      <p className="text-gray-600 text-xs truncate">
                        {vendorData.businessAddress}
                      </p>
                    )}
                  </div>
                  {/* <div className="flex">
                    {(() => {
                      const rating = vendorData?.rating;
                      if (!rating || rating === 0) {
                        return (
                          <>
                            <span className="">❓</span>
                            <span className="">
                              Unrated
                            </span>
                          </>
                        );
                      } else if (rating >= 4.0) {
                        return (
                          <>
                            <span className="">🔥</span>
                            <span className="">
                              {rating}
                            </span>
                          </>
                        );
                      } else if (rating >= 3.0) {
                        return (
                          <>
                            <span className="">💪🏽</span>
                            <span className="">
                              {rating}
                            </span>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <span className="">😬</span>
                            <span className="">
                              {rating}
                            </span>
                          </>
                        );
                      }
                    })()}
                  </div> */}
                </div>

                {/* Material Data */}
                {vendorPreview && vendorPreview.length > 0 && (
                  <div className="grid gap-2">
                    <span className="text-gray-700 font-medium">
                      Preview products
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {vendorPreview.map((material, index) => (
                        <div key={index} className="">
                        {material.description && (
                          <img src={material.materialImageOne} alt="" className="aspect-video object-cover rounded-md"/>
                        )}
                        {material.price && (
                            <p className="text-sm font-bold mt-1 secondary-font">
                              £{material.price}
                            </p>
                        )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  
                  <Button 
                    buttonText={"View full profile"}
                    otherStyles={"bg-primary text-white"}
                    // destination={`/tailor-profile/${btoa(vendorID)}`}
                  />
                  <div className={`${!userSessionData ? "hidden" : ""}`}>
                    <Button
                      buttonText={"Chat with vendor"}
                      otherStyles={"bg-primary/10 text-primary"}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default VendorDetailModal;