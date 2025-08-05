"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function About({ data }) {
  if (!data) return null;

  const { heading, description, stats, readMoreLink, tabs, images } = data;

  const [activeTab, setActiveTab] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState("right");

  const handleTabClick = (index) => {
    if (index === activeTab) return;
    setDirection(index > activeTab ? "right" : "left");
    setTransitioning(true);
    setTimeout(() => {
      setActiveTab(index);
      setTransitioning(false);
    }, 300);
  };

  const variants = {
    enter: (direction) => ({
      x: direction === "right" ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      x: direction === "right" ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <section className="about container-full-width">
      <div className="top-position">
        <div className="container">
          <div className="flex-box">
            <motion.div
              className="text-box"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="about-text">
                {heading && <h2 className="title-4">{heading}</h2>}
                {description && <p>{description}</p>}

                {stats?.length > 0 && (
                  <div className="grid">
                    {stats.map((stat, i) => (
                      <motion.div
                        className="box"
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <h2 className="title-5">{stat.value}</h2>
                        <p>{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {readMoreLink && (
                  <div className="btn">
                    <a href={readMoreLink}>Read More</a>
                  </div>
                )}
              </div>

              {tabs?.length > 0 && (
                <div className="about-tab-wrapper">
                  <div className="tab-box">
                    <div className="tab-header">
                      {tabs.map((tab, i) => (
                        <button
                          key={i}
                          className={i === activeTab ? "active" : ""}
                          onClick={() => handleTabClick(i)}
                        >
                          {tab.label.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    <div className="tab-content sm1">
                      <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                          key={activeTab}
                          className="tab-content-inner"
                          variants={variants}
                          custom={direction}
                          initial="enter"
                          animate="center"
                          exit="exit"
                        >
                          {/* ✅ Render HTML safely */}
                          {tabs[activeTab]?.content && (
                            <div
                              className="tab-text"
                              dangerouslySetInnerHTML={{
                                __html: tabs[activeTab].content,
                              }}
                            />
                          )}

                          {/* ✅ Stats under tab content */}
                          {tabs[activeTab].stats?.length > 0 && (
                            <div className="grid">
                              {tabs[activeTab].stats.map((stat, i) => (
                                <div className="box" key={i}>
                                  <h2 className="title-5">{stat.value}</h2>
                                  <p>{stat.label}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Image box (empty placeholder if not needed) */}
            {images?.length > 0 && (
              <motion.div
                className="img-box"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              />
            )}
          </div>
        </div>
      </div>

      {images?.length > 0 && (
        <div className="bottom-position">
          <div className="container">
            <div className="flex-box">
              <div className="text-box"></div>
              <motion.div
                className="img-box sm"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="img-position">
                  {images.map((img, i) => (
                    <motion.div
                      key={i}
                      className={`img${i + 1}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
