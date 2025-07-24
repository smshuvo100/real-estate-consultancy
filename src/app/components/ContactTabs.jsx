"use client";
import { useState } from "react";
import { FiPhone, FiMail } from "react-icons/fi";
import { Tab1ContentForm } from "./Tab1ContentForm";

const tabs = ["Buy Property", "Seek Job", "Channel Partner"];

export function ContactTabs() {
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
    <section className="contact-tab">
      <div className="container">
        <div className="flex-wrap">
          <div className="title-box">
            <p className="text-1">We'd Love To</p>

            <h2 className="title-2">Hear From You</h2>
          </div>
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

            <div className="tab-content">
              <div
                key={activeTab}
                className={`tab-content-inner ${
                  transitioning ? "exit-" + direction : "enter-" + direction
                }`}
              >
                {activeTab === 0 && (
                  <>
                    {/* Tab1ContentForm */}
                    {/* Tab2ContentInfo1 */}
                    {/* Tab3ContentInfo2 */}
                    <Tab1ContentForm />
                  </>
                )}
                {activeTab === 1 && (
                  <>
                    <p>I am looking for job opportunity</p>
                    <p>
                      <FiPhone /> 3213213213213
                    </p>
                    <p>
                      <FiMail /> hr@sfk.ae
                    </p>
                  </>
                )}
                {activeTab === 2 && (
                  <>
                    <p>I am a new channel partner</p>
                    <p>
                      <FiPhone /> 3213213213213
                    </p>
                    <p>
                      <FiMail /> info@sfk.ae
                    </p>
                    <br />
                    <p>I am an existing channel partner</p>
                    <strong>Visit our channel partner page.</strong>
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
