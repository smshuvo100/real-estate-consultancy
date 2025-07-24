"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqData = [
  {
    question: "What is the first step in buying a home?",
    answer:
      "Researching the market and getting pre-approved for a mortgage are typically the first steps.",
  },
  {
    question: "How much should I save for a down payment?",
    answer: "It depends on the property and mortgage, but 10–20% is common.",
  },
  {
    question: "What is pre-approval?",
    answer:
      "Pre-approval is when a lender reviews your finances and confirms how much you can borrow.",
  },
  {
    question: "What is closing cost?",
    answer:
      "Closing costs include lender fees, title insurance, and taxes — typically 2–5% of the home's price.",
  },
  {
    question: "Can I buy a house with bad credit?",
    answer:
      "Yes, but you may face higher interest rates or need a larger down payment.",
  },
  {
    question: "What does a real estate agent do?",
    answer:
      "They help you find a property, negotiate price, handle paperwork, and guide you through the process.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      {faqData.map((item, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? "open" : ""}`}
        >
          <button
            className="faq-question title-5"
            onClick={() => toggleFAQ(index)}
          >
            {item.question}
            <span className="icon">
              {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
            </span>
          </button>
          <div
            className="faq-answer"
            style={{
              maxHeight: openIndex === index ? "200px" : "0",
              padding: openIndex === index ? "8px 0" : "0",
            }}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
