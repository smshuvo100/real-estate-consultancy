"use client";

import React, { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import { FaqTabs } from "../components/FaqTabs";

export default function FaqPage() {
  const [propertyFaqs, setPropertyFaqs] = useState([]);
  const [investorFaqs, setInvestorFaqs] = useState([]);

  // ⛳️ Fetch Property FAQs from MongoDB
  useEffect(() => {
    const fetchPropertyFaqs = async () => {
      try {
        const res = await fetch("/api/property-faq");
        const data = await res.json();
        setPropertyFaqs(data?.faqs || data || []);
      } catch (err) {
        console.error("❌ Failed to fetch property FAQ:", err);
      }
    };

    fetchPropertyFaqs();
  }, []);

  // ⛳️ Fetch Investor FAQs from MongoDB
  useEffect(() => {
    const fetchInvestorFaqs = async () => {
      try {
        const res = await fetch("/api/investor-faq");
        const data = await res.json();
        setInvestorFaqs(data?.faqs || data || []);
      } catch (err) {
        console.error("❌ Failed to fetch investor FAQ:", err);
      }
    };

    fetchInvestorFaqs();
  }, []);

  // ✅ Hero data
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

  // ✅ FaqTabs Data from DB
  const FaqTabsData = {
    tabs: [
      {
        label: "Property FAQ",
        title: "Property",
        faqs: propertyFaqs,
      },
      {
        label: "Investor FAQ",
        title: "Investor",
        faqs: investorFaqs,
      },
    ],
  };

  return (
    <>
      <Hero data={heroData} />
      <FaqTabs data={FaqTabsData} />
    </>
  );
}
