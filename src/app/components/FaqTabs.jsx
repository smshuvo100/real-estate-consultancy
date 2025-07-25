"use client";
import { useState } from "react";
import FaqAccordion from "./FaqAccordion";

export function FaqTabs({ data }) {
  const [activeTab, setActiveTab] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState("right");

  if (!data || !data.tabs || data.tabs.length === 0) return null;

  const handleTabClick = (index) => {
    if (index === activeTab) return;
    setDirection(index > activeTab ? "right" : "left");
    setTransitioning(true);
    setTimeout(() => {
      setActiveTab(index);
      setTransitioning(false);
    }, 300);
  };

  const currentTab = data.tabs[activeTab];

  return (
    <section className="faq-tabs">
      <div className="container">
        <div className="flex-wrap">
          <div className="tab-box">
            <div className="tab-header">
              {data.tabs.map((tab, i) => (
                <button
                  key={i}
                  className={i === activeTab ? "active" : ""}
                  onClick={() => handleTabClick(i)}
                >
                  {tab.label.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="tab-content1">
              <div
                key={activeTab}
                className={`tab-content-inner ${
                  transitioning ? "exit-" + direction : "enter-" + direction
                }`}
              >
                <div className="flex-wrap">
                  <div className="text-box">
                    <h2 className="title-2">{currentTab.title}</h2>
                  </div>
                  <div className="tabsm-box">
                    <FaqAccordion items={currentTab.faqs} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
