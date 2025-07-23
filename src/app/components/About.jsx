import React from "react";
import Image from "next/image";
export function About() {
  return (
    <>
      <section className="about container-full-width">
        <div className="top-position">
          <div className="container">
            <div className="flex-box">
              <div className="text-box">
                <h2 className="title-4">About Us</h2>
                <p>
                  SFK Real Estate Consultancy stands as a distinguished leader
                  in the UAE&apos;s real estate development landscape,
                  transforming ambitious visions into landmark realities. With a
                  foundation built on excellence, innovation, integrity, and
                  sustainability, we specialize in acquiring strategic land
                  parcels and developing them into vibrant, master-planned
                  communities that redefine urban living.
                </p>
                <div className="grid">
                  <div className="box">
                    <h2 className="title-5">200+</h2>
                    <p>Happy Customers</p>
                  </div>
                  <div className="box">
                    <h2 className="title-5">10k+</h2>
                    <p>Properties For Clients</p>
                  </div>
                  <div className="box">
                    <h2 className="title-5">16+</h2>
                    <p>Years of Experience</p>
                  </div>
                </div>

                <div className="btn">
                  <a href="#">Read More</a>
                </div>
              </div>

              <div className="img-box"></div>
            </div>
          </div>
        </div>
        <div className="bottom-position">
          <div className="container">
            <div className="flex-box">
              <div className="text-box"></div>

              <div className="img-box sm">
                <div className="img-position">
                  <div className="img1">
                    <Image
                      src="/images/about-1.webp"
                      alt="about"
                      width={570}
                      height={944}
                    />
                  </div>
                  <div className="img2">
                    <Image
                      src="/images/about-2.webp"
                      alt="about"
                      width={706}
                      height={1014}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
