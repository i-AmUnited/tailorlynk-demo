import React from "react";

const savedStyles = [
  {
    id: 1,
    title: "Handmade signature wrap top",
    description: "100% linen, casual & comfortable.",
    image:
      "https://plus.unsplash.com/premium_photo-1718275465076-6947afe3c57a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with your image path
  },
  {
    id: 2,
    title: "Tailored signature pant set",
    description: "Elegant and perfect for events.",
    image:
      "https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with your image path
  },
  {
    id: 3,
    title: "Custom-fit linen blazer",
    description: "Premium tailoring for all seasons.",
    image:
      "https://images.unsplash.com/photo-1687952622898-4e9514a710d5?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with your image path
  },
  {
    id: 4,
    title: "Minimalist casual tee",
    description: "Simple and versatile daily wear.",
    image:
      "https://images.unsplash.com/photo-1712793283297-a7406cd608b4?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with your image path
  },
];

function SavedItems() {
  return (
    <div className="bg-white p-6 rounded-md shadow-md h-full">
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
