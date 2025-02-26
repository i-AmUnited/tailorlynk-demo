import Back from "../../components/goBack";
import VendorCatalogue from "./General pages components/vendorCatalogue";
import chat from "../../assets/icons/chatIcon.svg";
import SelectInput from "../../components/select";
import Button from "../../components/button";
import { useState } from "react";
import Modal from "../../components/modal";
import { useParams } from "react-router-dom";
import { useVendorDetail, useVendorReviews } from "../reuseableEffects";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinners/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup"
import { vendorReport, writeReview } from "../../hooks/local/reducer";
import Input from "../../components/input";
import thumbsUpIcon from "../../assets/icons/thumbsUp.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import placeholderImage from "../../assets/images/placeholder-tailorlynk.png";

const TailorProfile = () => {
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();

  const { vendorID } = useParams();
  const decodedVendorID = atob(vendorID)
  const vendorDetail = useVendorDetail(decodedVendorID)
  const vendorReviews = useVendorReviews(decodedVendorID);

  const totalRating = vendorReviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = totalRating / vendorReviews.length;
  const roundedAverage = averageRating.toFixed(1);

  const vendorPersonal = vendorDetail?.vendorData;
  const vendorCatalogue = vendorDetail?.catalogueData;
  const vendorMaterialList = vendorDetail?.materialData;

  const userSessionData = useSelector((state) => state.user.userSession);
  const username = userSessionData?.data?.customerData?.fullName;
  const email = userSessionData?.data?.customerData?.emailAddress;

  const [reportDiv, setReportDiv] = useState(true);
  const [reportSuccessDiv, setReportSuccessDiv] = useState(false);

  const [reportModal, setReportModal] = useState(false);

  const reportReasons = [
    { value: "fraud", label: "Fraudulent Activity" },
    { value: "Bad Service", label: "Harassment or Abuse" },
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
          vendor_id: decodedVendorID,
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

      const reportVendorForm = useFormik({
        initialValues: {
          email_address: email,
          vendor_id: decodedVendorID,
          reason: "",
          description: "",
        },
        validationSchema: Yup.object({
          reason: Yup.string().required("Please select a reason"),
          description: Yup.string().required("Please write a discription of your issue"),
        }),
        onSubmit: async (values) => {
          const { email_address, vendor_id, reason, description } = values;
          let reportVendorData = { email_address, vendor_id, reason, description };
          const { payload } = await dispatch(vendorReport(reportVendorData));
          if (payload.statusCode === 200) {
            setReportDiv(false);
            setReportSuccessDiv(true);
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
              <LazyLoadImage
                    effect="blur"
                    src={vendorPersonal?.brandLogo}
                    alt=""
                    placeholderSrc={placeholderImage}
                    wrapperClassName="w-full aspect-video md:aspect-square object-cover object-center rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 items-start gap-6 md:gap-4">
              <div className="grid">
                <div>Category:</div>
                <div className=" text-black/50">Male clothing</div>
              </div>
              <div className="grid md:col-span-2">
                <div>Location:</div>
                <div className="text-black/50">
                  {vendorPersonal?.businessAddress}
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
              <VendorCatalogue
                vendorName={vendorPersonal?.businessName}
                products={vendorCatalogue}
              />
            </div>
            <div className="">
              <div className="font-bold secondary-font mb-4">Materials:</div>
              <VendorCatalogue products={vendorMaterialList} />
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
        <div className="lg:col-span-3 lg:relative">
          <div className="lg:sticky lg:top-5">
            <div
              className={`bg-white border rounded-md p-4 flex items-center gap-4 mb-4 ${
                vendorReviews.length === 0 ? "hidden" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-center size-12 bg-primary/20 rounded-full text-xs font-bold text-primary">
                  {roundedAverage}
                </div>
              </div>
              <div className="text-xs font-semibold grid gap-[2px]">
                <span>Average rating</span>
                <span className="text-black/50 font-normal">
                  {vendorReviews.length} review
                  <span
                    className={`${vendorReviews.length > 1 ? "" : "hidden"}`}
                  >
                    s
                  </span>
                </span>
              </div>
            </div>
            <div className="bg-white border rounded-md overflow-hidden mb-4">
              <div className="flex items-center justify-between bg-white px-4 py-6 border-b">
                <div className="font-bold secondary-font">Reviews</div>
                <div
                  className={`text-xs text-primary underline underline-offset-2 cursor-pointer ${
                    !userSessionData ? "hidden" : ""
                  }`}
                  onClick={() => setReportModal(true)}
                >
                  Write a review
                </div>
              </div>
              <div>
                {vendorReviews.length === 0 ? (
                  <div className="p-4 border-y-[12px] border-white">
                    This Tailor hasn't been reviewed yet
                  </div>
                ) : (
                  <div className="px-4 max-h-[400px] overflow-y-scroll border-y-[12px] border-white">
                    {vendorReviews.map((review) => (
                      <div
                        key={review.id}
                        className="grid gap-1 content-between py-4 border-b last:border-none"
                      >
                        <div className="text-xs grid gap-1">
                          {/* <div className="size-8 rounded-full bg-primary/10"></div> */}
                          <div className="flex justify-between gap-3 w-full">
                            <div className="font-semibold">
                              {review.customer_name} - ({review.rating})
                            </div>
                            <div>12/12/21</div>
                          </div>
                        </div>
                        <div className="text-gray-500 text-xs">
                          {review.review}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div
              className={`bg-white border rounded-md overflow-hidden mb-4 ${
                !userSessionData ? "hidden" : ""
              }`}
            >
              <div className="bg-white px-4 py-6 border-b font-bold secondary-font">
                Report tailor
              </div>
              {reportDiv && (
                <form
                  onSubmit={reportVendorForm.handleSubmit}
                  className="bg-white p-4 grid gap-6"
                >
                  <div className="grid gap-4">
                    <SelectInput
                      label={"Select a reason"}
                      options={reportReasons}
                      name={"reason"}
                      value={reportVendorForm.values.reason}
                      onChange={reportVendorForm.handleChange}
                      onBlur={reportVendorForm.handleBlur}
                      onError={
                        reportVendorForm.touched.reason &&
                        reportVendorForm.errors.reason
                          ? reportVendorForm.errors.reason
                          : null
                      }
                    />
                    <Input
                      label={"Describe issue:"}
                      variant={"textArea"}
                      name={"description"}
                      value={reportVendorForm.values.description}
                      onChange={reportVendorForm.handleChange}
                      onBlur={reportVendorForm.handleBlur}
                      onError={
                        reportVendorForm.touched.description &&
                        reportVendorForm.errors.description
                          ? reportVendorForm.errors.description
                          : null
                      }
                    />
                  </div>
                  <Button
                    buttonText={"Report"}
                    otherStyles={"bg-red-500 text-white"}
                    loading={loading}
                  />
                </form>
              )}
              {reportSuccessDiv && (
                <div className="bg-white px-4 py-10 grid gap-6">
                  <div className="flex justify-center">
                    <img alt="" src={thumbsUpIcon} className="size-12" />
                  </div>
                  <div className="text-center grid gap-2">
                    <span className="font-semibold text-primary">
                      Thank you for your feedback!
                    </span>{" "}
                    <span>
                      Our team will investigate the issue and take appropriate
                      action.
                    </span>
                  </div>
                </div>
              )}
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
                sendReviewForm.touched.rating && sendReviewForm.errors.rating
                  ? sendReviewForm.errors.rating
                  : null
              }
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
                  sendReviewForm.touched.review && sendReviewForm.errors.review
                    ? sendReviewForm.errors.review
                    : null
                }
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
