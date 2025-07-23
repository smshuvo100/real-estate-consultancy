import React from "react";
import Image from "next/image";
export function Fullimage() {
  return (
    <>
      <section className="full-image">
        <Image
          src="/images/full-image.webp"
          alt="full image"
          width={1920}
          height={1080}
        />
      </section>
    </>
  );
}
