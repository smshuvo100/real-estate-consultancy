// ✅ src/app/components/FaqSmall.jsx
"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function FaqSmall() {
  const [openIndex, setOpenIndex] = useState(null);

  // ✅ FAQ data directly in this file
  const faqItems = [
    {
      question: "What is the first step in buying a home?",
      answer: "We offer a 30-day money back guarantee for all our services.",
    },
    {
      question: "What is the first step in buying a home?",
      answer: "You can email us at support@example.com or call +1234567890.",
    },
    {
      question: "What is the first step in buying a home?",
      answer:
        "Yes, we offer custom plans tailored to your needs. Please contact us.",
    },
    {
      question: "What is the first step in buying a home?",
      answer: "You can email us at support@example.com or call +1234567890.",
    },
    {
      question: "What is the first step in buying a home?",
      answer:
        "Yes, we offer custom plans tailored to your needs. Please contact us.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-small">
      <div className="container">
        <div className="grid">
          <div className="grid-item">
            {faqItems.map((item, index) => (
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
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid-item">
            <h2 className="title-1">FAQ</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
