"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        breakpoint: 768,
        settings: { centerPadding: "40px" },
      },
      {
        breakpoint: 480,
        settings: { centerPadding: "20px" },
      },
    ],
  };

  return (
    <>
      <section
        className="hero single-hero"
        style={{
          backgroundImage: `url("${
            blog.featuredImage || "/images/hero.webp"
          }")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="overlay"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        ></div>
        <div className="container">
          <div className="center">
            <h2 className="title-1">{blog.category || "Category"}</h2>
          </div>
        </div>
      </section>

      <section className="blog-details-sec">
        <div className="container">
          <h2 className="title-4">{blog.title}</h2>
          {/* <ul className="blog-meta" style={{ marginBottom: "20px" }}>
            <li>{blog.views || 0} Views</li>
            <li>{blog.category}</li>
            <li>{blog.adminName}</li>
          </ul> */}
          <div
            className="project-description"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </section>

      <div className="slick-gallery">
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
      </div>
    </>
  );
}
