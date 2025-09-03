"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// 🔎 ছোট হুক: ডিভাইস hover সাপোর্ট করে কিনা
function useCanHover() {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return canHover;
}

export function OurServices1() {
  const canHover = useCanHover(); // ডেস্কটপে true, মোবাইল/ট্যাবে false

  // --- Entrance (once) ---
  const headerVariants = {
    hidden: { opacity: 0, y: -40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const cardEnter = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // --- Hover / Active (tap) states ---
  const bgVariants = {
    rest: {
      border: "0px solid rgba(255,255,255,0)",
      scale: 1,
      transition: { duration: 0.3 },
    },
    hover: {
      border: "2px solid rgba(255,255,255,0.9)",
      scale: 1.01,
      transition: { duration: 0.3 },
    },
    active: {
      border: "2px solid rgba(255,255,255,0.9)",
      scale: 1.01,
      transition: { duration: 0.3 },
    },
  };
  const titleHover = {
    rest: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { opacity: 0, y: -10, transition: { duration: 0.3 } },
    active: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };
  const textHover = {
    rest: {
      opacity: 0,
      y: 10,
      height: 0,
      marginTop: 0,
      transition: { duration: 0.3 },
    },
    hover: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.3 } },
    active: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.3 } },
  };

  // মোবাইল/ট্যাব টগল স্টেট (ডেস্কটপে এগুলো ব্যবহার হবে না)
  const [a1, setA1] = useState(false);
  const [a2, setA2] = useState(false);
  const [a3, setA3] = useState(false);
  const [a4, setA4] = useState(false);
  const [a5, setA5] = useState(false);
  const [a6, setA6] = useState(false);

  // ডেস্কটপে accidental focus/click এ টগল আটকাতে: canHover হলে হ্যান্ডলার বাদ
  const tapProps = (active, setActive) =>
    canHover
      ? {
          /* desktop: no click/tap toggle */
        }
      : {
          onClick: () => setActive((v) => !v),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActive((v) => !v);
            }
          },
          role: "button",
          tabIndex: 0,
          animate: active ? "active" : "rest",
        };

  return (
    <motion.section
      className="our-services sm-new"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container">
        {/* Header */}
        <motion.div className="header" variants={headerVariants}>
          <h2 className="title-4 uppercase center">recent projects</h2>
          <p>
            SFK Real Estate Consultancy operates as the flagship entity within a
            diversified group of companies that span multiple sectors:
          </p>
        </motion.div>

        {/* ---------- First Flex Box ---------- */}
        <div className="flex-box sm-spece">
          {/* Item 1 */}
          <motion.article
            className="box"
            variants={cardEnter}
            initial="rest"
            whileHover="hover"
            {...tapProps(a1, setA1)}
          >
            <motion.div
              className="bg-image"
              style={{ backgroundImage: 'url("/images/ns1.webp")' }}
              variants={bgVariants}
            >
              <motion.h2 className="title-5" variants={titleHover}>
                Real Estate Development
              </motion.h2>
            </motion.div>
            <motion.div className="text" variants={textHover}>
              <h2 className="title-5">Real Estate Development</h2>
              <ul>
                <li>
                  <div>SFK Real Estate Consultancy</div>
                  <p>Flagship development company headquartered in UAE</p>
                </li>
                <li>
                  <div>Al Mamlaka Real Estate Development</div>
                  <p>
                    Strategic development partner with operations in Oman and
                    UAE
                  </p>
                </li>
              </ul>
            </motion.div>
          </motion.article>

          {/* Item 2 */}
          <motion.article
            className="box sm1"
            variants={cardEnter}
            initial="rest"
            whileHover="hover"
            {...tapProps(a2, setA2)}
          >
            <motion.div
              className="bg-image"
              style={{ backgroundImage: 'url("/images/ns1.webp")' }}
              variants={bgVariants}
            >
              <motion.h2 className="title-5" variants={titleHover}>
                Consumer Products
              </motion.h2>
            </motion.div>
            <motion.div className="text sm1" variants={textHover}>
              <h2 className="title-5">Consumer Products</h2>
              <ul>
                <li>
                  <div>Al Mamlaka Perfumes</div>
                  <p>Luxury fragrance line</p>
                </li>
              </ul>
            </motion.div>
          </motion.article>

          {/* Item 3 */}
          <motion.article
            className="box"
            variants={cardEnter}
            initial="rest"
            whileHover="hover"
            {...tapProps(a3, setA3)}
          >
            <motion.div
              className="bg-image"
              style={{ backgroundImage: 'url("/images/ns1.webp")' }}
              variants={bgVariants}
            >
              <motion.h2 className="title-5" variants={titleHover}>
                Retail & Commercial
              </motion.h2>
            </motion.div>
            <motion.div className="text" variants={textHover}>
              <h2 className="title-5">Retail & Commercial</h2>
              <ul>
                <li>
                  <div>Gold Center and Jewelry Complex</div>
                  <p>Specialized retail development</p>
                </li>
              </ul>
            </motion.div>
          </motion.article>
        </div>

        {/* ---------- Second Flex Box ---------- */}
        <div className="flex-box">
          {/* Item 4 */}
          <motion.article
            className="box"
            variants={cardEnter}
            initial="rest"
            whileHover="hover"
            {...tapProps(a4, setA4)}
          >
            <motion.div
              className="bg-image"
              style={{ backgroundImage: 'url("/images/ns1.webp")' }}
              variants={bgVariants}
            >
              <motion.h2 className="title-5" variants={titleHover}>
                Hospitality & Tourism
              </motion.h2>
            </motion.div>
            <motion.div className="text" variants={textHover}>
              <h2 className="title-5">Hospitality & Tourism</h2>
              <ul>
                <li>
                  <div>Al Mamlaka Hospitality</div>
                  <p>Hotel and restaurant development and management</p>
                </li>
              </ul>
            </motion.div>
          </motion.article>

          {/* Item 5 */}
          <motion.article
            className="box sm1"
            variants={cardEnter}
            initial="rest"
            whileHover="hover"
            {...tapProps(a5, setA5)}
          >
            <motion.div
              className="bg-image"
              style={{ backgroundImage: 'url("/images/ns1.webp")' }}
              variants={bgVariants}
            >
              <motion.h2 className="title-5" variants={titleHover}>
                Exhibition & Marketing
              </motion.h2>
            </motion.div>
            <motion.div className="text" variants={textHover}>
              <h2 className="title-5">Exhibition & Marketing</h2>
              <ul>
                <li>
                  <div>Al Mamlaka Organizing Exhibitions</div>
                  <p>Event management and exhibition services</p>
                </li>
                <li>
                  <div>Al Mamlaka Advertising</div>
                  <p>Marketing and promotional services</p>
                </li>
              </ul>
            </motion.div>
          </motion.article>

          {/* Item 6 */}
          <motion.article
            className="box"
            variants={cardEnter}
            initial="rest"
            whileHover="hover"
            {...tapProps(a6, setA6)}
          >
            <motion.div
              className="bg-image"
              style={{ backgroundImage: 'url("/images/ns1.webp")' }}
              variants={bgVariants}
            >
              <motion.h2 className="title-5" variants={titleHover}>
                Logistics & Support Services
              </motion.h2>
            </motion.div>
            <motion.div className="text" variants={textHover}>
              <h2 className="title-5">Logistics & Support Services</h2>
              <ul>
                <li>
                  <div>Al Mamlaka Logistics Services</div>
                  <p>
                    Comprehensive logistics solutions and supply chain
                    management
                  </p>
                </li>
              </ul>
            </motion.div>
          </motion.article>
        </div>
      </div>
    </motion.section>
  );
}
