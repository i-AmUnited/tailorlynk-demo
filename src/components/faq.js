import { useState } from "react";
import arrow from "../assets/icons/arrow.svg";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionItems = [
    { 
      title: "Can I request a custom design for my clothing?",
      content: "Yes, our platform allows you to request custom designs. You can provide us with your ideas or choose from our design templates. Our expert tailors will work with you to bring your vision to life."
    },
    { 
      title: "How can I ensure that my measurements are accurate?",
      content: "We provide a detailed guide on how to measure yourself correctly. If you're unsure, you can also opt for a virtual consultation with one of our experts who will guide you through the process."
    },
    { 
      title: "Can I get my clothing altered after it’s been tailored?",
      content: "Yes, alterations can be made after your clothing has been tailored. Please contact us within a reasonable time frame after receiving your garment, and our team will assist with the necessary adjustments."
    },
    { 
      title: "Do you offer express tailoring services?",
      content: "Yes, we offer express tailoring services for an additional fee. If you need your garment by a specific date, please select the express option during checkout, and we will prioritize your order."
    },
    { 
      title: "Can I track the status of my tailoring order?",
      content: "Yes, you can track the status of your order through your account dashboard. You'll receive updates on each stage of the tailoring process, from design to delivery."
    },
    { 
      title: "Do you offer tailoring services for men and women?",
      content: "Yes, we offer tailoring services for both men and women. Whether you need a tailored suit, dress, or casual wear, our experienced tailors are skilled in creating garments for all genders."
    },
    { 
      title: "How do I cancel or modify my tailoring order?",
      content: "If you need to cancel or modify your order, please contact our customer support team as soon as possible. Cancellations or modifications can only be made before the tailoring process begins."
    }
  ];
  

  return (
    <div>
      {accordionItems.map((item, index) => (
        <div key={index} className="border-t first:border-t-0 last:border-b-0 transition-all text-sm">
          <div className="flex justify-between py-4 px-2 cursor-pointer items-center gap-3 hover:bg-brandGreen/5 hover:pr-4 transition-all" onClick={() => toggleAccordion(index)}>
            <p className="">{item.title}</p>
            <img src={arrow} alt="" className={`transform ${ openIndex === index ? "rotate-180" : "rotate-0" } transition-transform h-5`}/>
          </div>
          {openIndex === index && (
            <div className="pb-4 leading-6 text-brandGreen/80 px-3"> <p className="">{item.content}</p> </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
