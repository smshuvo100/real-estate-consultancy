import React from "react";
import Image from "next/image";
export function BusinessDiversificationLeft({ title, text, image }) {
  return (
    <>
      <section className="business-diversification left">
        <div className="container">
          <div className="diversification-grid">
            <div className="diversification-text">
              <h2 className="title-4">{title}</h2>
              <div dangerouslySetInnerHTML={{ __html: text }} />
            </div>
            <div className="diversification-image">
              <Image
                src={`/images/${image}`}
                width={800}
                height={800}
                alt="diversification"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
