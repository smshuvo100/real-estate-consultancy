"use client";

import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "/images/house1.webp",
  "/images/house2.webp",
  "/images/house3.webp",
  "/images/house1.webp",
  "/images/house2.webp",
  "/images/house3.webp",
];

export function SlickGallery() {
  useEffect(() => {
    // Trigger resize to fix initial slick width issue
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  }, []);

  const settings = {
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
          centerPadding: "100px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          centerPadding: "20px",
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slick-gallery">
      <Slider {...settings}>
        {images.map((src, idx) => (
          <div key={idx} className="slide">
            <img src={src} alt={`Slide ${idx}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
