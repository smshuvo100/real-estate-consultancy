import React from "react";
import { Hero } from "../components/Hero";
import { FaqTabs } from "../components/FaqTabs";

export default function page() {
  // Hero Data
  const heroData = {
    heroImage: "/images/hero1.webp",
    overlayColor: "rgba(0, 0, 0, 0.1)",
    bottomOverlay: "rgba(0, 0, 0, 0.5)",
    title: "Your Frequent queries",
    subtitle: "FAQ",
    description: {
      title: "Buy Luxury Apartments for Sale in Dubai, UAE",
      text: "Discover our well-crafted apartments for sale in Dubai, opening the door to a world of sophistication that surpasses all expectations. Buy Dubai apartments with us and indulge in a unique blend of elegance and comfort, thoughtfully curated to elevate your lifestyle to extraordinary new heights.",
    },
  };

  // FaqTabs Data
  const FaqTabsData = {
    tabs: [
      {
        label: "Property FAQ",
        title: "Property",
        faqs: [
          {
            question: "What is the first step in buying a home?",
            answer:
              "Researching the market and getting pre-approved for a mortgage are typically the first steps.",
          },
          {
            question: "What is the first step in buying a home?",
            answer:
              "Researching the market and getting pre-approved for a mortgage are typically the first steps.",
          },
          {
            question: "What is the first step in buying a home?",
            answer:
              "Researching the market and getting pre-approved for a mortgage are typically the first steps.",
          },
          {
            question: "What is the first step in buying a home?",
            answer:
              "Researching the market and getting pre-approved for a mortgage are typically the first steps.",
          },
          {
            question: "What is the first step in buying a home?",
            answer:
              "Researching the market and getting pre-approved for a mortgage are typically the first steps.",
          },
          {
            question: "What is the first step in buying a home?",
            answer:
              "Researching the market and getting pre-approved for a mortgage are typically the first steps.",
          },
          {
            question: "What is the first step in buying a home?",
            answer:
              "Researching the market and getting pre-approved for a mortgage are typically the first steps.",
          },
          {
            question: "What is the first step in buying a home?",
            answer:
              "Researching the market and getting pre-approved for a mortgage are typically the first steps.",
          },
          {
            question: "What is the first step in buying a home?",
            answer:
              "Researching the market and getting pre-approved for a mortgage are typically the first steps.",
          },
          {
            question: "What is the first step in buying a home?",
            answer:
              "Researching the market and getting pre-approved for a mortgage are typically the first steps.",
          },
          {
            question: "What is the first step in buying a home?",
            answer:
              "Researching the market and getting pre-approved for a mortgage are typically the first steps.",
          },
          {
            question: "What is the first step in buying a home?",
            answer:
              "Researching the market and getting pre-approved for a mortgage are typically the first steps.",
          },
        ],
      },
      {
        label: "Investor FAQ",
        title: "Investor",
        faqs: [
          {
            question: "How do I start investing?",
            answer:
              "Begin by understanding your goals and speaking with a financial advisor.",
          },
          {
            question: "How do I start investing?",
            answer:
              "Begin by understanding your goals and speaking with a financial advisor.",
          },
          {
            question: "How do I start investing?",
            answer:
              "Begin by understanding your goals and speaking with a financial advisor.",
          },
          {
            question: "How do I start investing?",
            answer:
              "Begin by understanding your goals and speaking with a financial advisor.",
          },
          {
            question: "How do I start investing?",
            answer:
              "Begin by understanding your goals and speaking with a financial advisor.",
          },
          {
            question: "How do I start investing?",
            answer:
              "Begin by understanding your goals and speaking with a financial advisor.",
          },
          {
            question: "How do I start investing?",
            answer:
              "Begin by understanding your goals and speaking with a financial advisor.",
          },
          {
            question: "How do I start investing?",
            answer:
              "Begin by understanding your goals and speaking with a financial advisor.",
          },
          {
            question: "How do I start investing?",
            answer:
              "Begin by understanding your goals and speaking with a financial advisor.",
          },
          {
            question: "How do I start investing?",
            answer:
              "Begin by understanding your goals and speaking with a financial advisor.",
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* hero section */}
      <Hero data={heroData} />
      <FaqTabs data={FaqTabsData} />
    </>
  );
}
