// ✅ src/app/components/FaqSmall.jsx
"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqSmall() {
  const [openIndex, setOpenIndex] = useState(null);

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
              <motion.div
                key={index}
                className={`faq-item ${openIndex === index ? "open" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
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

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      className="faq-answer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
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
