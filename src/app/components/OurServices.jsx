import React from "react";
import Image from "next/image";
export function OurServices() {
  return (
    <>
      <section className="our-services">
        <div className="container">
          <h2 className="title-4 uppercase center">our services</h2>

          <div className="grid">
            <div className="box">
              <div className="icon">
                <Image
                  src="/icons/arrow.svg"
                  width={34}
                  height={34}
                  alt="icon"
                />
              </div>
              <div className="s-ion center">
                <Image
                  src="/icons/icon-s1.svg"
                  width={82}
                  height={82}
                  alt="icon"
                />
              </div>
              <h2 className="title-5">Land Acquisition & Development</h2>
              <p>
                We identify and acquire strategic land parcels, transforming
                them into vibrant, master-planned communities that offer
                unparalleled living and working spaces. Our expertise in land
                evaluation, market analysis, and development potential
                assessment ensures maximum value creation for every project we
                undertake.
              </p>
            </div>
            <div className="box">
              <div className="icon">
                <Image
                  src="/icons/arrow.svg"
                  width={34}
                  height={34}
                  alt="icon"
                />
              </div>
              <div className="s-ion center">
                <Image
                  src="/icons/icon-s1.svg"
                  width={82}
                  height={82}
                  alt="icon"
                />
              </div>
              <h2 className="title-5">Land Acquisition & Development</h2>
              <p>
                We identify and acquire strategic land parcels, transforming
                them into vibrant, master-planned communities that offer
                unparalleled living and working spaces. Our expertise in land
                evaluation, market analysis, and development potential
                assessment ensures maximum value creation for every project we
                undertake.
              </p>
            </div>
            <div className="box">
              <div className="icon">
                <Image
                  src="/icons/arrow.svg"
                  width={34}
                  height={34}
                  alt="icon"
                />
              </div>
              <div className="s-ion center">
                <Image
                  src="/icons/icon-s1.svg"
                  width={82}
                  height={82}
                  alt="icon"
                />
              </div>
              <h2 className="title-5">Land Acquisition & Development</h2>
              <p>
                We identify and acquire strategic land parcels, transforming
                them into vibrant, master-planned communities that offer
                unparalleled living and working spaces. Our expertise in land
                evaluation, market analysis, and development potential
                assessment ensures maximum value creation for every project we
                undertake.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
