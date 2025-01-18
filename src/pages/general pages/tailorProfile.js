import Back from "../../components/goBack";
import VendorCatalogue from "./General pages components/vendorCatalogue";
import chat from "../../assets/icons/chatIcon.svg";
import SelectInput from "../../components/select";
import Button from "../../components/button";
import { useEffect, useState } from "react";
import Modal from "../../components/modal";
import { useParams } from "react-router-dom";
import { useVendorDetail, useVendorReviews } from "../reuseableEffects";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinners/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup"
import { writeReview } from "../../hooks/local/reducer";
import Input from "../../components/input";

const TailorProfile = () => {
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();

  const { vendorID } = useParams();
  const vendorDetail = useVendorDetail(vendorID)
  const vendorReviews = useVendorReviews(vendorID);

  const vendorPersonal = vendorDetail?.vendorData;
  const vendorCatalogue = vendorDetail?.catalogueData;
  const vendorMaterialList = vendorDetail?.materialData;

  const userSessionData = useSelector((state) => state.user.userSession);
  const username = userSessionData?.data?.customerData?.fullName;


  const [reportModal, setReportModal] = useState(false);

  const reportReasons = [
    { value: "fraud", label: "Fraudulent Activity" },
    { value: "harassment", label: "Harassment or Abuse" },
    { value: "poor_quality", label: "Poor Quality of Service" },
    { value: "scam", label: "Scam or False Advertising" },
  ];

  const ratings = [
    { value: "1", label: "1 Star" },
    { value: "2", label: "2 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "5", label: "5 Stars" },
  ];

  const sendReviewForm = useFormik({
        initialValues: {
          vendor_id: vendorID,
          rating: "",
          review: "",
          customer_name: username,
        },
        validationSchema: Yup.object({
          rating: Yup.string().required("Please select a rating"),
          review: Yup.string().required("Please write a review"),
        }),
        onSubmit: async (values) => {
          const { vendor_id, rating, review, customer_name } = values;
          let sendReviewData = { vendor_id, rating, review, customer_name };
          const { payload } = await dispatch(writeReview(sendReviewData));
          if (payload.statusCode === 200) {
            setReportModal(false);
          }
        },
      });

  return (
    <div>
      <Spinner loading={useSelector((state) => state.user).loading} />
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        <div className="lg:col-span-4">
          <div className="grid gap-4 mb-10">
            <div className="bg-white rounded-md overflow-hidden border">
              <div className="p-4 font-medium flex items-center gap-4">
                <Back />
                <span>{vendorPersonal?.businessName}</span>
              </div>
              <img src={vendorPersonal?.brandLogo} alt="" className="h-[250px] w-full object-cover" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 items-start gap-6 md:gap-4">
              <div className="grid">
                <div>Category:</div>
                <div className="text-xs text-black/50">Male clothing</div>
              </div>
              <div className="grid">
                <div>Location:</div>
                <div className="text-xs text-black/50">{vendorPersonal?.businessAddress}</div>
              </div>
              <div className="grid">
                <div>Availability:</div>
                <div className="text-xs text-green-500 flex items-center gap-1">
                  <span className="size-2 rounded-full bg-green-500"></span>
                  <span>Ready to work</span>
                </div>
              </div>
            </div>
            <div className="text-xs">
              Orders are typically ready and shipped within 7 days
            </div>
          </div>
          <div className="grid gap-6 mb-10">
            <div className="">
              <div className="font-bold secondary-font mb-4">Catalogue:</div>
              <VendorCatalogue products={vendorCatalogue}/>
            </div>
            <div className="">
              <div className="font-bold secondary-font mb-4">Materials:</div>
              <VendorCatalogue products={vendorMaterialList}/>
            </div>
          </div>
          <div className="bg-white border rounded-md p-4 flex items-center gap-6">
            <img src={chat} alt="" className="size-12" />
            <div className="text-xs text-pretty leading-5">
              Can’t find a style that you like? Share your idea with the tailor.{" "}
              <span className="text-primary underline font-medium">
                Start chat
              </span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="bg-white border rounded-md p-4 flex items-center gap-4 mb-4">
            <div>
              <div className="flex items-center justify-center size-12 bg-primary/20 rounded-full text-xs font-bold text-primary">
                {vendorPersonal?.rating}
              </div>
            </div>
            <div className="text-xs font-semibold grid gap-[2px]">
              <span>Average rating</span>
              <span className="text-black/50 font-normal">{vendorReviews.length} review<span className={`${vendorReviews.length > 1 ? "" : "hidden"}`}>s</span></span>
            </div>
          </div>
          <div className="bg-white border rounded-md overflow-hidden mb-4">
            <div className="flex items-center justify-between bg-white px-4 py-6 border-b">
              <div className="font-bold secondary-font">Reviews</div>
              <div
                className={`text-xs text-primary underline underline-offset-2 cursor-pointer ${!userSessionData ? "hidden" : ""}`}
                onClick={() => setReportModal(true)}
              >
                Write a review
              </div>
            </div>
            <div>
              {
              vendorReviews.length === 0 ?
              <div className="p-4 border-y-[12px] border-white">
                This Tailor hasnt been reviewed yet {vendorReviews.length}
              </div>
              :
              <div className="px-4 max-h-[400px] overflow-y-scroll border-y-[12px] border-white">
                {vendorReviews.map((review) => (
                  <div
                    key={review.id}
                    className="grid gap-1 content-between py-4 border-b last:border-none"
                  >
                    <div className="text-xs grid gap-1">
                      {/* <div className="size-8 rounded-full bg-primary/10"></div> */}
                      <div className="flex justify-between gap-3 w-full">
                        <div className="font-semibold">{review.customer_name} - ({review.rating})</div>
                        <div>12/12/21</div>
                      </div>
                    </div>
                    <div className="text-gray-500 text-xs">{review.review}</div>
                  </div>
                ))}
              </div>
              }
            </div>
          </div>
          <div className="bg-white border rounded-md overflow-hidden mb-4">
            <div className="bg-white px-4 py-6 border-b font-bold secondary-font">
              Report tailor
            </div>
            <div className="bg-white p-4 grid gap-6">
              <div className="grid gap-4">
                <SelectInput label={"Select a reason"} options={reportReasons} />
                <Input
                  label={"Describe issue:"}
                  variant={"textArea"}
                  name={"review"}
                value={sendReviewForm.values.review}
                onChange={sendReviewForm.handleChange}
                onBlur={sendReviewForm.handleBlur}
                onError={
                sendReviewForm.touched.review && sendReviewForm.errors.review ? sendReviewForm.errors.review : null}
                />
              </div>
              <Button
                buttonText={"Report"}
                otherStyles={"bg-red-500 text-white"}
              />
            </div>
          </div>
        </div>
        <Modal
          modalTitle={"Write a review"}
          isVisible={reportModal}
          onClose={() => setReportModal(false)}
        >
          <form onSubmit={sendReviewForm.handleSubmit}>
            <SelectInput
              label={"Overall rating"}
              options={ratings} 
              name={"rating"}
              value={sendReviewForm.values.rating}
              onChange={sendReviewForm.handleChange}
              onBlur={sendReviewForm.handleBlur}
              onError={
              sendReviewForm.touched.rating && sendReviewForm.errors.rating ? sendReviewForm.errors.rating : null}
            />
            <div className="mt-4">
              <Input
                label={"Write your review"}
                variant={"textArea"}
                name={"review"}
              value={sendReviewForm.values.review}
              onChange={sendReviewForm.handleChange}
              onBlur={sendReviewForm.handleBlur}
              onError={
              sendReviewForm.touched.review && sendReviewForm.errors.review ? sendReviewForm.errors.review : null}
              />
            </div>
            <div className="mt-6">
              <Button
                buttonText={"Submit review"}
                otherStyles={"bg-primary text-white"}
                loading={loading}
              />
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default TailorProfile;
