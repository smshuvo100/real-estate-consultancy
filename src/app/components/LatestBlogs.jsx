// src/app/components/LatestBlogs.jsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

export function LatestBlogs() {
  return (
    <>
      <section className="latest-blogs">
        <div className="container">
          <h2 className="title-4 center">Latest Blogs</h2>
          <div className="blog-grid">
            <div className="blog-card">
              <Link href="/">
                <div className="blog-image">
                  <Image
                    src="/images/blog1.webp"
                    alt="Blog Image"
                    width={400}
                    height={249}
                  />
                  <span className="icon">
                    <Image
                      src="/icons/arrow.svg"
                      alt="Arrow Icon"
                      width={24}
                      height={24}
                    />
                  </span>
                </div>
                <ul className="blog-meta">
                  <li>5k Views</li>
                  <li>Real Estate</li>
                  <li>John Doe</li>
                </ul>
                <h3 className="title-5">Blog Title Here</h3>
                <p className="blog-desc">
                  We identify and acquire strategic land parcels, transforming
                  them into vibrant, master-planned communities that offer
                  unparalleled
                </p>
              </Link>
            </div>
            <div className="blog-card">
              <Link href="/">
                <div className="blog-image">
                  <Image
                    src="/images/blog1.webp"
                    alt="Blog Image"
                    width={400}
                    height={249}
                  />
                  <span className="icon">
                    <Image
                      src="/icons/arrow.svg"
                      alt="Arrow Icon"
                      width={24}
                      height={24}
                    />
                  </span>
                </div>
                <ul className="blog-meta">
                  <li>5k Views</li>
                  <li>Real Estate</li>
                  <li>John Doe</li>
                </ul>
                <h3 className="title-5">Blog Title Here</h3>
                <p className="blog-desc">
                  We identify and acquire strategic land parcels, transforming
                  them into vibrant, master-planned communities that offer
                  unparalleled
                </p>
              </Link>
            </div>
            <div className="blog-card">
              <Link href="/">
                <div className="blog-image">
                  <Image
                    src="/images/blog1.webp"
                    alt="Blog Image"
                    width={400}
                    height={249}
                  />
                  <span className="icon">
                    <Image
                      src="/icons/arrow.svg"
                      alt="Arrow Icon"
                      width={24}
                      height={24}
                    />
                  </span>
                </div>
                <ul className="blog-meta">
                  <li>5k Views</li>
                  <li>Real Estate</li>
                  <li>John Doe</li>
                </ul>
                <h3 className="title-5">Blog Title Here</h3>
                <p className="blog-desc">
                  We identify and acquire strategic land parcels, transforming
                  them into vibrant, master-planned communities that offer
                  unparalleled
                </p>
              </Link>
            </div>
            <div className="blog-card">
              <Link href="/">
                <div className="blog-image">
                  <Image
                    src="/images/blog1.webp"
                    alt="Blog Image"
                    width={400}
                    height={249}
                  />
                  <span className="icon">
                    <Image
                      src="/icons/arrow.svg"
                      alt="Arrow Icon"
                      width={24}
                      height={24}
                    />
                  </span>
                </div>
                <ul className="blog-meta">
                  <li>5k Views</li>
                  <li>Real Estate</li>
                  <li>John Doe</li>
                </ul>
                <h3 className="title-5">Blog Title Here</h3>
                <p className="blog-desc">
                  We identify and acquire strategic land parcels, transforming
                  them into vibrant, master-planned communities that offer
                  unparalleled
                </p>
              </Link>
            </div>
            <div className="blog-card">
              <Link href="/">
                <div className="blog-image">
                  <Image
                    src="/images/blog1.webp"
                    alt="Blog Image"
                    width={400}
                    height={249}
                  />
                  <span className="icon">
                    <Image
                      src="/icons/arrow.svg"
                      alt="Arrow Icon"
                      width={24}
                      height={24}
                    />
                  </span>
                </div>
                <ul className="blog-meta">
                  <li>5k Views</li>
                  <li>Real Estate</li>
                  <li>John Doe</li>
                </ul>
                <h3 className="title-5">Blog Title Here</h3>
                <p className="blog-desc">
                  We identify and acquire strategic land parcels, transforming
                  them into vibrant, master-planned communities that offer
                  unparalleled
                </p>
              </Link>
            </div>
            <div className="blog-card">
              <Link href="/">
                <div className="blog-image">
                  <Image
                    src="/images/blog1.webp"
                    alt="Blog Image"
                    width={400}
                    height={249}
                  />
                  <span className="icon">
                    <Image
                      src="/icons/arrow.svg"
                      alt="Arrow Icon"
                      width={24}
                      height={24}
                    />
                  </span>
                </div>
                <ul className="blog-meta">
                  <li>5k Views</li>
                  <li>Real Estate</li>
                  <li>John Doe</li>
                </ul>
                <h3 className="title-5">Blog Title Here</h3>
                <p className="blog-desc">
                  We identify and acquire strategic land parcels, transforming
                  them into vibrant, master-planned communities that offer
                  unparalleled
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
