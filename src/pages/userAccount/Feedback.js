import React, { useState } from "react";

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState("Positive feedback");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", { feedbackType, message });
    setMessage(""); // Clear message field after submission
  };

  return (
    <div className="">
      <div className="px-4 py-6 border-b font-bold secondary-font">
      Feedback
      </div>
      <div className="px-4 py-6">
        <p className="text-[#CB997E] font-medium mb-1">We Value Your Feedback!</p>
        <p className="text-gray-600 mb-6 text-xs">
          Thank you for choosing Tailorlynk. We strive to provide the best
          experience for our customers, and your feedback is essential in helping
          us achieve that goal. Whether you had an exceptional experience or there
          are areas where we can improve, we want to hear from you.
        </p>
        <form onSubmit={handleSubmit} className="grid gap-4">
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
            className="bg-[#CB997E] text-white font-medium px-6 py-2 rounded-md hover:bg-[#B5838D] transition duration-300"
          >
            Send feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
