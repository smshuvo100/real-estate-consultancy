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
          centerPadding: "150px", // or adjust for tablet
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
