"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
export default function FaqSmall() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqItems = [
    {
      question: "What is the first step in buying a home?",
      answer:
        "Researching the market and getting pre-approved for a mortgage are typically the first steps.",
    },
    {
      question: "How do I schedule a property tour?",
      answer:
        "You can schedule a tour through our website or call our support line directly.",
    },
    {
      question: "Do you assist with mortgage advice?",
      answer: "Yes, we have mortgage experts to guide you.",
    },
    {
      question: "How do I schedule a property tour?",
      answer:
        "You can schedule a tour through our website or call our support line directly.",
    },
    {
      question: "Do you assist with mortgage advice?",
      answer: "Yes, we have mortgage experts to guide you.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-tabs faq-small">
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
                    transition: "0.3s",
                  }}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
          <motion.div
            className="grid-item"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="title-1">FAQ</h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
