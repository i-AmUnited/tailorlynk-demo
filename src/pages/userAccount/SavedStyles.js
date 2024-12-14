import React from "react";

const savedStyles = [
  {
    id: 1,
    title: "Handmade signature wrap top",
    description: "100% linen, casual & comfortable.",
    image: "https://via.placeholder.com/150", // Replace with your image path
  },
  {
    id: 2,
    title: "Tailored signature pant set",
    description: "Elegant and perfect for events.",
    image: "https://via.placeholder.com/150", // Replace with your image path
  },
  {
    id: 3,
    title: "Custom-fit linen blazer",
    description: "Premium tailoring for all seasons.",
    image: "https://via.placeholder.com/150", // Replace with your image path
  },
  {
    id: 4,
    title: "Minimalist casual tee",
    description: "Simple and versatile daily wear.",
    image: "https://via.placeholder.com/150", // Replace with your image path
  },
];

function SavedItems() {
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Saved styles</h2>
        <button className="bg-[#CB997E] text-white px-4 py-2 rounded-md hover:bg-[#B77C63]">
          View All
        </button>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {savedStyles.map((style) => (
          <div
            key={style.id}
            className="bg-gray-100 rounded-md shadow-md overflow-hidden"
          >
            <img
              src={style.image}
              alt={style.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{style.title}</h3>
              <p className="text-sm text-gray-600">{style.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedItems;
