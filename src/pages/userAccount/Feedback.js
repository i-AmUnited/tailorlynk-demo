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
    <div className="bg-white p-5 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Feedback</h2>
      <p className="text-[#CB997E] font-medium mb-4">We Value Your Feedback!</p>
      <p className="text-gray-600 mb-6">
        Thank you for choosing Tailorlynk. We strive to provide the best
        experience for our customers, and your feedback is essential in helping
        us achieve that goal. Whether you had an exceptional experience or there
        are areas where we can improve, we want to hear from you.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
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
  );
};

export default Feedback;
