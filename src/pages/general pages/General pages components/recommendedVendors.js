import { Link } from "react-router-dom";
import { useVendorList } from "../../reuseableEffects";
import { useSelector } from "react-redux";
import { useState } from "react";
import Spinner from "../../../components/Spinners/Spinner";
import VendorCard from "../../../components/vendorCard";
import VendorDetailModal from "../../../components/vendorDetailModal";

const RecommendedVendors = () => {
    const vendorList = useVendorList();
    const [selectedVendorId, setSelectedVendorId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loading = useSelector((state) => state.user.loading);

    function shuffle(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    const recommendedVendors = shuffle(vendorList).slice(0, 10);
    // console.log(recommendedVendors);

    const handleVendorClick = (vendorId) => {
        setSelectedVendorId(vendorId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedVendorId(null);
    };

    return (
        <div className="grid gap-4">
            <div className="flex items-center justify-between">
                <div className="font-bold secondary-font">
                    Recommended <span className="text-primary">Vendors</span>
                </div>
                <Link to={"/all-vendors"} className="text-xs text-black/50 hover:text-primary">
                    [ View all vendors ]
                </Link>
            </div>
            {loading ? (
                <div className="flex items-center gap-4">
                    <Spinner />
                    <div className="text-md font-bold text-[#c4c4c4]">loading vendors, please wait...</div>
                </div>
            ) : (
                <div className="flex gap-6 overflow-x-auto overflow-y-hidden items-center">
                    {recommendedVendors.map((vendor) => (
                        <div key={vendor.vendorId} onClick={() => handleVendorClick(vendor.vendorId)} className="cursor-pointer">
                            <VendorCard
                                vendorName={vendor.businessName}
                                vendorLocation={vendor.businessAddress}
                                coverPhoto={vendor.brandLogo}
                                vendorID={vendor.vendorId}
                                vendorRating={vendor.rating}
                            />
                        </div>
                    ))}
                </div>
            )}

            <div>{recommendedVendors.length === 0 ? <span className="text-md font-bold text-[#c4c4c4]">We haven't added any vendors yet</span> : <span></span>}</div>

            {/* Vendor Detail Modal */}
            {isModalOpen && selectedVendorId && (
                <VendorDetailModal
                    vendorId={selectedVendorId}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}

export default RecommendedVendors;