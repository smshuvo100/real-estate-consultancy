/**
 * // About Data

const aboutData = {
  heading: "About Us",
  description:
    "SFK Real Estate Consultancy stands as a distinguished leader...",
  readMoreLink: "#",
  stats: [
    { value: "200+", label: "Happy Customers" },
    { value: "10k+", label: "Properties For Clients" },
    { value: "16+", label: "Years of Experience" },
  ],
  tabs: [
    {
      label: "Company Profile",
      content: [
        "SFK Real Estate Consultancy stands as a distinguished leader...",
        "Our comprehensive approach encompasses the entire development lifecycle...",
      ],
      stats: [
        { value: "200+", label: "Happy Customers" },
        { value: "10k+", label: "Properties For Clients" },
        { value: "16+", label: "Years of Experience" },
      ],
    },
    {
      label: "Vision",
      content: ["To be at the forefront of the real estate industry..."],
    },
    {
      label: "Mission",
      content: [
        "To consistently deliver innovative, sustainable, and high-quality real estate solutions...",
      ],
    },
  ],
  images: [
    { src: "/images/about-1.webp", alt: "about", width: 570, height: 944 },
    { src: "/images/about-2.webp", alt: "about", width: 706, height: 1014 },
  ],
};
 */

"use client";
import { useState } from "react";
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

  return (
    <section className="about container-full-width">
      <div className="top-position">
        <div className="container">
          <div className="flex-box">
            <div className="text-box">
              <div className="about-text">
                {heading && <h2 className="title-4">{heading}</h2>}
                {description && <p>{description}</p>}

                {stats?.length > 0 && (
                  <div className="grid">
                    {stats.map((stat, i) => (
                      <div className="box" key={i}>
                        <h2 className="title-5">{stat.value}</h2>
                        <p>{stat.label}</p>
                      </div>
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
                      <div
                        key={activeTab}
                        className={`tab-content-inner ${
                          transitioning
                            ? "exit-" + direction
                            : "enter-" + direction
                        }`}
                      >
                        {tabs[activeTab]?.content && (
                          <div className="tab-text">
                            {tabs[activeTab].content.map((para, idx) => (
                              <p key={idx}>{para}</p>
                            ))}
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
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {images?.length > 0 && <div className="img-box"></div>}
          </div>
        </div>
      </div>

      {images?.length > 0 && (
        <div className="bottom-position">
          <div className="container">
            <div className="flex-box">
              <div className="text-box"></div>
              <div className="img-box sm">
                <div className="img-position">
                  {images.map((img, i) => (
                    <div key={i} className={`img${i + 1}`}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
