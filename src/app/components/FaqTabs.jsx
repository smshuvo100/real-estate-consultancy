"use client";
import { useState } from "react";
import FaqAccordion from "./FaqAccordion";

const tabs = ["Property faq", "investor faq"];

export function FaqTabs() {
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
    }, 300); // duration must match animation duration
  };

  return (
    <section className="faq-tabs">
      <div className="container">
        <div className="flex-wrap">
          <div className="tab-box">
            <div className="tab-header">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  className={i === activeTab ? "active" : ""}
                  onClick={() => handleTabClick(i)}
                >
                  {tab.toUpperCase()}
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
                {activeTab === 0 && (
                  <>
                    <div className="flex-wrap">
                      <div className="text-box">
                        <h2 className="title-2">Property</h2>
                      </div>
                      <div className="tabsm-box">
                        <FaqAccordion />
                      </div>
                    </div>
                  </>
                )}
                {activeTab === 1 && (
                  <>
                    <div className="flex-wrap">
                      <div className="text-box">
                        <h2 className="title-2">Property</h2>
                      </div>
                      <div className="tabsm-box">
                        <FaqAccordion />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
