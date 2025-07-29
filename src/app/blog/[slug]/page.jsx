"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (slug) {
      fetch(`/api/blog?slug=${slug}`)
        .then((res) => res.json())
        .then((data) => {
          setBlog(data.blog || null);
        })
        .catch((err) => console.error("❌ Blog fetch error:", err));
    }
  }, [slug]);

  if (!blog) {
    return (
      <div className="container center" style={{ padding: "80px 0" }}>
        <p>Loading blog...</p>
      </div>
    );
  }

  const sliderImages = blog.gallery?.length
    ? blog.gallery
    : [blog.featuredImage || "/images/default-blog.jpg"];

  // Slider settings
  const sliderSettings = {
    centerMode: true,
    centerPadding: "400px",
    slidesToShow: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerMode: true,
          slidesToShow: 1, // ✅ REQUIRED!
          centerPadding: "50px", // or adjust for tablet
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          slidesToShow: 1, // ✅ REQUIRED!
          centerPadding: "50px", // adjust for mobile
        },
      },
    ],
  };

  return (
    <>
      {/* Hero Section with animation */}
      <motion.section
        className="hero single-hero"
        style={{
          backgroundImage: `url("${
            blog.featuredImage || "/images/hero.webp"
          }")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          className="overlay"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        ></div>
        <div className="container">
          <motion.div
            className="center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="title-1">{blog.category || "Category"}</h2>
          </motion.div>
        </div>
      </motion.section>

      {/* Blog content with animation */}
      <motion.section
        className="blog-details-sec"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.h2
            className="title-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {blog.title}
          </motion.h2>
          <div
            className="project-description"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </motion.section>

      {/* Gallery with animation */}
      <motion.div
        className="slick-gallery"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Slider {...sliderSettings}>
          {sliderImages.map((src, idx) => (
            <div key={idx} className="slide">
              <Image
                src={src}
                alt={`Gallery Image ${idx + 1}`}
                width={1000}
                height={600}
                layout="responsive"
              />
            </div>
          ))}
        </Slider>
      </motion.div>
    </>
  );
}
