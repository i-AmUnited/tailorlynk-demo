import Back from "../../components/goBack";
import VendorCatalogue from "./General pages components/vendorCatalogue";
import chat from "../../assets/icons/chatIcon.svg";
import Select from "../../components/select";
import SelectInput from "../../components/select";
import Button from "../../components/button";
import { useState } from "react";
import Modal from "../../components/modal";

const TailorProfile = () => {
  const img1 =
    "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428195.jpg?t=st=1733173796~exp=1733177396~hmac=74907e16e2b6a58e2fd117c29a8968dd0219e395f7e92b4631f5ccd7494ba313&w=826";

  const [reportModal, setReportModal] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "John Doe",
      date: "2024-12-01",
      rating: "5.0",
      review:
        "The service was outstanding from start to finish. Every detail was taken care of, and I couldn't be happier with the results.",
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "2024-11-25",
      rating: "4.0",
      review:
        "The quality of the product was impressive, but the delivery took longer than expected, which was a bit frustrating.",
    },
    {
      id: 3,
      name: "Emily Johnson",
      date: "2024-11-20",
      rating: "5.0",
      review:
        "I had an amazing experience. Everything was seamless, and the team went above and beyond to ensure my satisfaction.",
    },
    {
      id: 4,
      name: "Michael Brown",
      date: "2024-11-18",
      rating: "3.0",
      review:
        "The service was okay, but it didn't meet my expectations. There is definitely room for improvement in some areas.",
    },
    {
      id: 5,
      name: "Sarah Davis",
      date: "2024-11-15",
      rating: "4.0",
      review:
        "The value for money was great. I am pleased with my purchase and would recommend it to others, despite minor flaws.",
    },
    {
      id: 6,
      name: "David Wilson",
      date: "2024-11-10",
      rating: "5.0",
      review:
        "This was truly an exceptional experience. Every aspect exceeded my expectations, and I will definitely be back for more.",
    },
    {
      id: 7,
      name: "Laura Martinez",
      date: "2024-11-08",
      rating: "2.0",
      review:
        "I was quite disappointed with the overall quality. The service did not align with the high standards I had anticipated.",
    },
    {
      id: 8,
      name: "James Anderson",
      date: "2024-11-05",
      rating: "4.0",
      review:
        "The experience was good overall, but there are still areas that could be improved to make it truly exceptional.",
    },
    {
      id: 9,
      name: "Olivia Thompson",
      date: "2024-11-01",
      rating: "5.0",
      review:
        "Everything about this was fantastic. From start to finish, I felt valued as a customer, and the results were incredible.",
    },
    {
      id: 10,
      name: "Daniel Moore",
      date: "2024-10-30",
      rating: "3.0",
      review:
        "The product was just okay, but it didn’t live up to the hype. I expected a lot more based on the reviews I had read.",
    },
  ];

  const reportReasons = [
    { value: "fraud", label: "Fraudulent Activity" },
    { value: "harassment", label: "Harassment or Abuse" },
    { value: "poor_quality", label: "Poor Quality of Service" },
    { value: "scam", label: "Scam or False Advertising" },
  ];

  const ratings = [
    { value: "1.0", label: "1 Star" },
    { value: "2.0", label: "2 Stars" },
    { value: "3.0", label: "3 Stars" },
    { value: "4.0", label: "4 Stars" },
    { value: "5.0", label: "5 Stars" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
      <div className="lg:col-span-4">
        <div className="grid gap-4 mb-10">
          <div className="bg-white rounded-md overflow-hidden border">
            <div className="p-4 font-medium flex items-center gap-4">
              <Back />
              <span>Agbada specialist</span>
            </div>
            <img src={img1} alt="" className="h-[250px] w-full object-cover" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-4">
            <div className="grid">
              <div>Category:</div>
              <div className="text-xs text-black/50">Male clothing</div>
            </div>
            <div className="grid">
              <div>Location:</div>
              <div className="text-xs text-black/50">Lagos, Nigeria</div>
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
        <div className="mb-10">
          <div className="font-bold secondary-font mb-4">Catalogue:</div>
          <VendorCatalogue />
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
              4.8
            </div>
          </div>
          <div className="text-xs text-pretty leading-5 font-semibold">
            Average rating{" "}
            <span className="text-black/50 font-normal">(32 reviews)</span>
          </div>
        </div>
        <div className="bg-white border rounded-md overflow-hidden mb-4">
          <div className="flex items-center justify-between bg-white px-4 py-6 border-b">
            <div className="font-bold secondary-font">Reviews</div>
            <div
              className="text-xs text-primary underline underline-offset-2 cursor-pointer"
              onClick={() => setReportModal(true)}
            >
              Write a review

            </div>
          </div>
          <div className="px-4 max-h-[400px] overflow-y-scroll border-y-[12px] border-white">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="grid gap-1 content-between py-4 border-b last:border-none"
              >
                <div className="flex justify-between items-center">
                  <div className="font-semibold">
                    {review.name}{" "}
                    <span className="text-primary">({review.rating})</span>
                  </div>
                  <div>{review.date}</div>
                </div>
                <div className="text-gray-500 text-xs">{review.review}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border rounded-md overflow-hidden mb-4">
          <div className="bg-white px-4 py-6 border-b font-bold secondary-font">
            Report tailor
          </div>
          <div className="bg-white p-4 grid gap-6">
            <SelectInput label={"Select a reason"} options={reportReasons} />
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
        <SelectInput label={"Overall rating"} options={ratings} />
        <div className="grid gap-[2px] mt-4">
          <label>Write a review</label>
          <textarea
            rows={4}
            placeholder="Start typing..."
            className="w-full px-4 py-5 md:py-4 border focus:outline focus:outline-primary rounded "
          />
        </div>
        <div className="mt-6">
          <Button
            buttonText={"Submit review"}
            otherStyles={"bg-primary text-white"}
          />
        </div>
      </Modal>
    </div>
  );
};

export default TailorProfile;
