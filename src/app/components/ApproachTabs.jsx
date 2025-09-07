// ApproachTabs.jsx (JS, not TS)
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  {
    key: "market",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 13h16M4 9h16M4 17h10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Market Research & Site Selection",
    blurb: [
      "Comprehensive analysis of market trends, demographic patterns, and location potential to identify prime development opportunities.",
    ],
  },
  {
    key: "concept",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3v6l5 2-5 2v6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Concept Development & Design",
    blurb: [
      "Collaboration with world-class architects and designers to create distinctive, functional, and aesthetically pleasing spaces that reflect our commitment to excellence.",
    ],
  },
  {
    key: "planning",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 7h12M6 12h12M6 17h8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Project Planning & Execution",
    blurb: [
      "Detailed planning and precise execution with rigorous quality control measures to ensure timely delivery and superior results.",
    ],
  },
  {
    key: "sustain",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2v6m0 8v6M4 12h6m8 0h6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="12"
          cy="12"
          r="5.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    title: "Sustainable Implementation",
    blurb: [
      "Integration of environmentally responsible practices and technologies throughout the development process.",
    ],
  },
  {
    key: "ongoing",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 12a9 9 0 1 0 3.3-6.9M3 4v4h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Ongoing Management & Enhancement",
    blurb: [
      "Continued oversight and proactive management to maintain property value and enhance user experience over time.",
    ],
  },
];

export function ApproachTabs() {
  const [active, setActive] = useState(TABS[0].key);
  const current = TABS.find((t) => t.key === active) || TABS[0]; // JS-safe fallback

  return (
    <section className="approach-tabs">
      <div className="container">
        <h2 className="title-4">OUR APPROACH</h2>

        <div className="approach-grid">
          {/* LEFT: Tab list */}
          <div className="tab-list" role="tablist" aria-orientation="vertical">
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={active === t.key}
                aria-controls={`panel-${t.key}`}
                id={`tab-${t.key}`}
                className={`tab-btn ${active === t.key ? "is-active" : ""}`}
                onClick={() => setActive(t.key)}
              >
                <span className="tab-icon">{t.icon}</span>
                <span className="tab-label">{t.title}</span>

                {active === t.key && (
                  <motion.span
                    layoutId="tab-underline"
                    className="tab-outline"
                    transition={{ type: "spring", stiffness: 400, damping: 40 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* RIGHT: Panel */}
          <motion.div
            className="tab-panel"
            role="tabpanel"
            id={`panel-${current.key}`}
            aria-labelledby={`tab-${current.key}`}
            layout
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <h3 className="panel-title">{current.title}</h3>
                <div className="panel-body">
                  {current.blurb.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
