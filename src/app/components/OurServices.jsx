// src/app/components/OurServices.jsx
"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// ✅ এখানে কনটেন্ট ডেটা রাখা হলো
const OurServicesData = [
  {
    icon: "/icons/icon-s2.svg",
    title: "Retail & Commercial",
    description: `<ul>
    <li>
      <div>Gold Center and Jewelry Complex</div>
      <p>Specialized retail development</p>
    </li>
    </ul>`,
  },
  {
    icon: "/icons/icon-s3.svg",
    title: "Consumer Products",
    description: `<ul>
    <li>
      <div>Al Mamlaka Perfumes</div>
      <p>Luxury fragrance line</p>
    </li>
    </ul>`,
  },
  {
    icon: "/icons/icon-s3.svg",
    title: "Hospitality & Tourism",
    description: `<ul>
    <li>
      <div>Al Mamlaka Hospitality</div>
      <p>Hotel and restaurant development and management.</p>
    </li>
    </ul>`,
  },
  {
    icon: "/icons/icon-s1.svg",
    title: "Real Estate Development",
    description: `<ul>
    <li>
      <div>SFK Real Estate Consultancy</div>
      <p>Flagship development company headquartered in UAE</p>
    </li>
    <li>
      <div>Al Mamlaka Real Estate Development</div>
      <p>Strategic development partner with operations in Oman and UAE</p>
    </li>
    </ul>`,
  },
  {
    icon: "/icons/icon-s3.svg",
    title: "Exhibition & Marketing",
    description: `<ul>
    <li>
      <div>Al Mamlaka Organizing Exhibitions</div>
      <p>Event management and exhibition services</p>
    </li>
    <li>
      <div>Al Mamlaka Advertising</div>
      <p>Marketing and promotional services</p>
    </li>
    </ul>`,
  },

  {
    icon: "/icons/icon-s3.svg",
    title: "Logistics & Support Services",
    description: `<ul>
    <li>
      <div>Al Mamlaka Logistics Services</div>
      <p>Comprehensive logistics solutions and supply chain management</p>
    </li>
    </ul>`,
  },
];

export function OurServices() {
  return (
    <section className="our-services">
      <div className="container">
        <motion.h2
          className="title-4 uppercase center"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          our services
        </motion.h2>

        <div className="grid">
          {OurServicesData.map((service, i) => (
            <motion.div
              key={i}
              className="box"
              initial={{ opacity: 0, y: 150, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.5 + i * 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="icon">
                <Image
                  src="/icons/arrow.svg"
                  width={34}
                  height={34}
                  alt="arrow icon"
                />
              </div>
              <div className="s-ion ">
                <Image
                  src={service.icon}
                  width={82}
                  height={82}
                  alt="service icon"
                />
              </div>
              <h2 className="title-5">{service.title}</h2>
              {/* ✅ এখানে ফিক্স */}
              {typeof service.description === "string" ? (
                <div
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              ) : (
                service.description
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
