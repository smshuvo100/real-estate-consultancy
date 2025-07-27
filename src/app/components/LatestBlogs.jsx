"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";

export function LatestBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);
  const blogsRef = useRef(null);

  const blogsPerPage = 6;
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const offset = currentPage * blogsPerPage;
  const currentBlogs = blogs.slice(offset, offset + blogsPerPage);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load blogs:", err);
        setLoading(false);
      });
  }, []);

  const handlePageClick = ({ selected }) => {
    setLoadingPage(true);
    setCurrentPage(selected);

    setTimeout(() => {
      blogsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setLoadingPage(false);
    }, 400);
  };

  if (loading) {
    return (
      <div className="container center" style={{ padding: "80px 0" }}>
        <p>Loading blogs...</p>
      </div>
    );
  }

  return (
    <motion.section
      className="latest-blogs"
      ref={blogsRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <motion.h2
          className="title-4 center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Latest Blogs
        </motion.h2>

        <div className="blog-grid">
          {currentBlogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              className="blog-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${blog.slug}`}>
                <div className="blog-image">
                  <Image
                    src={blog.featuredImage || "/images/default-blog.jpg"}
                    alt={blog.title}
                    width={400}
                    height={249}
                    style={{ objectFit: "cover" }}
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
                  <li>{blog.category}</li>
                  <li>{blog.adminName}</li>
                </ul>
                <h3 className="title-5">{blog.title}</h3>
                <p className="blog-desc">{blog.shortDesc?.slice(0, 150)}...</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div
          className="pagination"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "40px",
          }}
        >
          {loadingPage && (
            <div className="page-loader" style={{ marginBottom: "10px" }}>
              <div className="loader"></div>
            </div>
          )}
          <ReactPaginate
            pageCount={totalPages}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            activeClassName="active"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            breakClassName="page-item"
            breakLinkClassName="page-link"
            disabledClassName="disabled"
          />
        </div>
      </div>
    </motion.section>
  );
}
