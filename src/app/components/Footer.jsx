"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <motion.div
          className="container foo"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="flex-box">
            <motion.div
              className="box1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/logo.png"
                alt="logo"
                width={205}
                height={36}
              />
              <p>
                Dream Home is a gated community with a great location. Located
                downtown, you&apos;re within walking distance of Parks, and
                the... <a href="#">View More</a>
              </p>
            </motion.div>

            <motion.div
              className="box2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="title-5">Contact Us</h2>
              <p>Media City - Sharjah - UAE</p>

              <div className="foo-contact">
                <a href="tel:3213213213213" className="text-icon">
                  <Image
                    src="/icons/call.svg"
                    alt="call"
                    width={24}
                    height={24}
                  />
                  <span>3213213213213</span>
                </a>
                <a href="mailto:info@sfk.ae" className="text-icon">
                  <Image
                    src="/icons/email.svg"
                    alt="email"
                    width={24}
                    height={24}
                  />
                  <span>info@sfk.ae</span>
                </a>
                <a href="https://www.sfk.ae" className="text-icon">
                  <Image
                    src="/icons/web.svg"
                    alt="web"
                    width={24}
                    height={24}
                  />
                  <span>www.sfk.ae</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              className="box3"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h2 className="title-5">Follow Us</h2>
              <div className="social">
                <a href="#">
                  <Image
                    src="/icons/instragram.svg"
                    alt="instragram"
                    width={24}
                    height={24}
                  />
                </a>
                <a href="#">
                  <Image
                    src="/icons/youtube.svg"
                    alt="youtube"
                    width={24}
                    height={24}
                  />
                </a>
                <a href="#">
                  <Image
                    src="/icons/twitter.svg"
                    alt="twitter"
                    width={24}
                    height={24}
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="copyright"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="container">
            <p>© 2025 SFK Real Estate Consultancy. All Rights Reserved.</p>
          </div>
        </motion.div>
      </footer>
    </>
  );
}
