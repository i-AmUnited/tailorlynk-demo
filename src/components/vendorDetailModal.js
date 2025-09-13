import { useVendorDetail } from "../pages/reuseableEffects";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinners/Spinner";
import Button from "./button";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { sendChat } from "../hooks/local/reducer";
import { showSuccessMessage } from "../hooks/constants";
import Input from "./input";
import sendIcon from "../assets/icons/send.svg";

const VendorDetailModal = ({ vendorId, isOpen, onClose }) => {
    const vendorDetail = useVendorDetail(vendorId);
    const vendorData = vendorDetail?.vendorData;
    const materialData = vendorDetail?.materialData;
    // console.log(vendorDetail)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const userSessionData = useSelector((state) => state.user.userSession);

    const sendMessageForm = useFormik({
        initialValues: {
          vendor_id: vendorData?.vendorId || "",
          customer_id: userSessionData.customerId,
          message: "",
          sender_type: "customer",
        },

        enableReinitialize: true,
        
        onSubmit: async (values, { resetForm }) => {
          const { vendor_id, customer_id, message, sender_type } = values;
          let sendMessageData = { vendor_id, customer_id, message, sender_type };
          const { payload } = await dispatch(sendChat(sendMessageData));
          if (payload.statusCode === 200) {
            showSuccessMessage("message sent!");
            resetForm();
            toggleChatConfirmation();
            navigate("/user-account/message-center")
          }
        },
      });

    const [chatConfirmation, setChatConfirmation] = useState(false);
    const toggleChatConfirmation = () => setChatConfirmation(!chatConfirmation);

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
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
          <div className="p-5">
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
                <div className="border-b pb-1">
                  <Link
                    to={`/tailor-profile/${btoa(vendorId)}`}
                    className="flex items-center gap-2 w-fit"
                  >
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
                  </Link>
                </div>

                {readyMadeItems.length === 0 && (
                  <div>This vendor hasn't uploaded any products yet</div>
                )}

                {/* Material Data */}
                {vendorPreview && vendorPreview.length > 0 && (
                  <div className="grid gap-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {vendorPreview.map((material, index) => (
                        <Link
                          to={`/product-detail/${btoa(material.materialId)}`}
                          key={index}
                          className=""
                        >
                          <img
                            src={material.materialImageOne}
                            alt=""
                            className="aspect-video object-cover rounded-md"
                          />
                          {material.price && (
                            <p className="text-xs font-bold mt-1">
                              £{material.price}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 py-4 items-center">
                  <Button
                    buttonText={"View full profile"}
                    otherStyles={"bg-primary text-white"}
                    buttonRole={"link"}
                    destination={`/tailor-profile/${btoa(vendorId)}`}
                  />
                  {userSessionData && (
                    <Button
                      buttonText={"Chat"}
                      buttonRole={"custom"}
                      otherStyles={"bg-primary/10 text-primary"}
                      onClick={toggleChatConfirmation}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Confirmation Modal */}
        {chatConfirmation && (
          <div className="absolute inset-0 z-60 flex items-center justify-center">
            <div
              className="absolute inset-0"
              onClick={toggleChatConfirmation}
            />
            <div className="relative bg-white rounded-lg mx-4 w-full md:w-1/3 h-full overflow-y-auto max-h-[80%]">
              <button
                onClick={toggleChatConfirmation}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
              >
                ×
              </button>
              <div className="p-5 flex items-end w-full h-full">
                <div className="w-full mb-24">
                  <p className="text-center mb-5 font-semibold">Your about to send a message to {vendorData?.businessName}</p>
                  <form
                    onSubmit={sendMessageForm.handleSubmit}
                    className="w-full relative"
                  >
                    <Input
                      placeholder="Start typing ..."
                      customStyles="w-full pr-12"
                      name={"message"}
                      value={sendMessageForm.values.message}
                      onChange={sendMessageForm.handleChange}
                      onBlur={sendMessageForm.handleBlur}
                      onError={
                        sendMessageForm.touched.message && sendMessageForm.errors.message
                          ? sendMessageForm.errors.message
                          : null
                      }
                    />
                    <button
                      type="button"
                      onClick={sendMessageForm.handleSubmit}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center"
                    >
                      <img alt="send" src={sendIcon} className="size-5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default VendorDetailModal;