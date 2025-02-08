import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../api/axiosInstance";
import { retrieveFromLocalStorage } from "../../hooks/constants";

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState("Positive feedback");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Retrieve session data using helper function
    const { userSession } = retrieveFromLocalStorage(["userSession"]);
    const token = userSession?.data?.accessToken;
    const apiKey = userSession?.data?.apiKey;

    console.log("Access Token:", token);
    console.log("API Key:", apiKey);

    // Validate feedbackType and message before sending
    if (!feedbackType || !message) {
      toast.error("Please fill in all fields.", { autoClose: 3000 });
      setLoading(false);
      return;
    }

    try {
      const payload = {
        type: feedbackType,
        message,
      };

      console.log("Payload:", payload);

      const response = await axiosInstance.post(
        "/customer/submit-feedback",
        payload,
        {
          headers: {
            "x-api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);

      if (response.status === 200) {
        toast.success("Thank you for your feedback! 🎉", { autoClose: 3000 });
        setMessage("");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting feedback:", error);

      const errorMessage =
        error.response?.data?.message || "Failed to submit feedback.";
      toast.error(errorMessage, { autoClose: 3000 });
    }
  };

  return (
    <div className="rounded-lg  bg-white">
      <ToastContainer />
      <div className="px-4 py-6 border-b font-bold secondary-font">
        Feedback
      </div>
      <p className="text-[#CB997E] font-medium mb-1">We Value Your Feedback!</p>
      <p className="text-gray-600 mb-6 text-xs">
        Thank you for choosing Tailorlynk. We strive to provide the best
        experience for our customers, and your feedback is essential in helping
        us achieve that goal. Whether you had an exceptional experience or there
        are areas where we can improve, we want to hear from you.
      </p>
      <form onSubmit={handleSubmit} className="px-4 py-6">
        <div className="">
          <label
            htmlFor="feedbackType"
            className="block text-sm font-medium text-gray-700"
          >
            Feedback type:
          </label>
          <select
            id="feedbackType"
            value={feedbackType}
            onChange={(e) => setFeedbackType(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#CB997E] focus:border-[#CB997E] sm:text-sm"
          >
            <option>Positive feedback</option>
            <option>Neutral feedback</option>
            <option>Negative feedback</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Your message:
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Start typing..."
            rows="4"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#CB997E] focus:border-[#CB997E] sm:text-sm resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-[20%] bg-primary text-white py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Sending feedback..." : "Send feedback"}
        </button>
      </form>
    </div>
  );
};

export default Feedback;
