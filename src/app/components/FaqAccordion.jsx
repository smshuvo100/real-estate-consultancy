"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function FaqAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items || !items.length) return null;

  return (
    <section className="faq-section">
      {items.map((item, index) => (
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
    </section>
  );
}
