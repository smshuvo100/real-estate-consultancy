"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function TeamIntro() {
  return (
    <section className="team-intro">
      <div className="container">
        <div className="intro-grid">
          <motion.div
            className="intro-image"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/john-doe.webp"
              alt="John Doe"
              width={1000}
              height={1047}
            />
          </motion.div>

          <motion.div
            className="intro-content"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="title-3">John Doe</h2>
            <p className="intro-role">Founder</p>
            <p>
              Lorem ipsum dolor sit amet consectetur. Fames morbi id ut a.
              Sodales dignissim eget habitasse massa proin tincidunt a placerat.
              Accumsan neque posuere nulla commodo. Vitae neque sem in vel
              varius vulputate velit amet feugiat. Feugiat quis nunc aliquam
              facilisis. Mi purus vehicula in ultricies pulvinar condimentum
              non. Tortor egestas donec sed in. Quis gravida nulla aliquam lacus
              tristique. Imperdiet nibh facilisi sed amet.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur. Fames morbi id ut a.
              Sodales dignissim eget habitasse massa proin tincidunt a placerat.
              Accumsan neque posuere nulla commodo. Vitae neque sem in vel
              varius vulputate velit amet feugiat. Feugiat quis nunc aliquam
              facilisis. Mi purus vehicula in ultricies pulvinar condimentum
              non. Tortor egestas donec sed in. Quis gravida nulla aliquam lacus
              tristique. Imperdiet nibh facilisi sed amet.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
