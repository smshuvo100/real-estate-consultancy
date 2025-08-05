"use client";

import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";

export default function FaqSmall() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqItems, setFaqItems] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("/api/project-faq");
        const data = await res.json();
        setFaqItems(data || []);
      } catch (err) {
        console.error("❌ Failed to fetch project FAQs:", err);
      }
    };

    fetchFaqs();
  }, []);

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
                key={item._id || index}
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
