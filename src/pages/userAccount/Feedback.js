import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button";
import Input from "../../components/input";
import SelectInput from "../../components/select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { submitFeedback } from "../../hooks/local/reducer";

const Feedback = () => {
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();

    const submitFeedbackForm = useFormik({
    initialValues: {
        type: "",
        message: "",
      },
    enableReinitialize: true,
    validationSchema: Yup.object({
      type: Yup.string().required("Please select a feedback type"),
      message: Yup.string().required("Please type your message"),
    }),
    onSubmit: async (values, {resetForm}) => {
      const { type, message } = values;
      let feedbackData = { type, message };
      const { payload } = await dispatch(submitFeedback(feedbackData));
      // console.log(changePasswordData)
      if (payload.statusCode === 200) {
        // showSuccessMessage(payload.message);
        resetForm();
      }
    },
  });
  return (
    <div className="rounded-lg bg-white">
      <div className="px-4 py-6 border-b text-md font-bold">Feedback</div>
      <div className="px-6 pt-6 grid gap-1 text-xs">
        <span className="text-primary font-bold">We Value Your Feedback!</span>
        <span className="text-black/50">
          Thank you for choosing Tailorlynk. We strive to provide the best
          experience for our customers, and your feedback is essential in
          helping us achieve that goal. Whether you had an exceptional
          experience or there are areas where we can improve, we want to hear
          from you.
        </span>
      </div>
      <form onSubmit={submitFeedbackForm.handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <SelectInput
              label="Feedback type"
              name="type"
              value={submitFeedbackForm.values.type}
              onChange={submitFeedbackForm.handleChange}
              onBlur={submitFeedbackForm.handleBlur}
              onError={
                submitFeedbackForm.touched.type && submitFeedbackForm.errors.type
                  ? submitFeedbackForm.errors.type
                  : null
              }
              options={[
                { value: "", label: "Select feedback type" },
                { value: "product_quality", label: "Product Quality" },
                { value: "sizing_issues", label: "Sizing Issues" },
                { value: "order_delivery", label: "Order & Delivery" },
                { value: "return_refund", label: "Return & Refund" },
                { value: "website_experience", label: "Website Experience" },
                { value: "customer_service", label: "Customer Service" },
                { value: "style_suggestions", label: "Style Suggestions" },
                { value: "pricing_discounts", label: "Pricing & Discounts" },
                { value: "account_login", label: "Account & Login" },
                { value: "other", label: "Other" },
              ]}
            />
          </div>
          <div className="md:col-span-3">
            <Input
              label="Your message"
              name="message"
              value={submitFeedbackForm.values.message}
              onChange={submitFeedbackForm.handleChange}
              onBlur={submitFeedbackForm.handleBlur}
              onError={
                submitFeedbackForm.touched.message &&
                submitFeedbackForm.errors.message
                  ? submitFeedbackForm.errors.message
                  : null
              }
            />
          </div>
        </div>
        <Button
          buttonRole="submit"
          buttonText="Submit feedback"
          otherStyles="mt-4 bg-primary text-white"
          loading={loading}
        />
      </form>
    </div>
  );
}

export default Feedback;
