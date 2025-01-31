import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState("Positive feedback");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const FEEDBACK_API_URL = process.env.REACT_APP_FEEDBACK_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        FEEDBACK_API_URL, // Now using the specific feedback API URL
        {
          type: feedbackType.replace(/\s+/g, ""),
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
            "x-api-key": "16112024",
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);
      if (response.status === 200) {
        toast.success("Thank you for your feedback! 🎉", { autoClose: 3000 });
        setMessage(""); // Clear input field
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response?.data?.message || "Failed to submit feedback.",
        { autoClose: 3000 }
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 border rounded-lg shadow-sm bg-white">
      <ToastContainer /> {/* Toast notification container */}
      <h2 className="text-xl font-semibold mb-4">Feedback</h2>
      <p className="text-sm text-gray-600 mb-6">
        <span className="text-primary font-bold">We Value Your Feedback!</span>{" "}
        Thank you for choosing TailorLynk. We strive to provide the best
        experience for our customers, and your feedback is essential in helping
        us achieve that goal. Whether you had an exceptional experience or there
        are areas where we can improve, we want to hear from you.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="feedbackType"
            className="block text-sm font-medium mb-1"
          >
            Feedback type:
          </label>
          <select
            id="feedbackType"
            className="w-full p-2 border rounded"
            value={feedbackType}
            onChange={(e) => setFeedbackType(e.target.value)}
          >
            <option>Positive feedback</option>
            <option>Negative feedback</option>
            <option>Neutral feedback</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Your message:
          </label>
          <textarea
            id="message"
            rows="3"
            className="w-full p-2 border rounded"
            placeholder="Start typing..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Sending feedback..." : "Send feedback"}
        </button>
      </form>
    </div>
  );
};

export default Feedback;
