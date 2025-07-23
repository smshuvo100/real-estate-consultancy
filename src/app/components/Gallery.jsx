import React from "react";
import Image from "next/image";

export function Gallery() {
  return (
    <>
      <section className="gallery">
        <div className="gallery-item item-1">
          <Image
            src="/images/gallery-1.webp"
            alt="gallery1"
            width={1468}
            height={532}
          />
        </div>
        <div className="gallery-item item-2">
          <Image
            src="/images/gallery-2.webp"
            alt="gallery2"
            width={724}
            height={569}
          />
        </div>
        <div className="gallery-item item-3">
          <Image
            src="/images/gallery-3.webp"
            alt="gallery3"
            width={735}
            height={569}
          />
        </div>
        <div className="gallery-item item-4">
          <Image
            src="/images/gallery-4.webp"
            alt="gallery4"
            width={739}
            height={1110}
          />
        </div>
        <div className="gallery-item item-5">
          <Image
            src="/images/gallery-5.webp"
            alt="gallery5"
            width={775}
            height={708}
          />
        </div>
        <div className="gallery-item item-6">
          <Image
            src="/images/gallery-6.webp"
            alt="gallery6"
            width={775}
            height={394}
          />
        </div>
      </section>
    </>
  );
}
