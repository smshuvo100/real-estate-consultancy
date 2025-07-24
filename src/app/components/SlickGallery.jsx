"use client";

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
  const settings = {
    centerMode: true,
    centerPadding: "400px", // space on left/right
    slidesToShow: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: "20px",
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
