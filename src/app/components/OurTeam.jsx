"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function OurTeam() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/team");
        const data = await res.json();
        setTeamMembers(data);
      } catch (error) {
        console.error("❌ Failed to fetch team:", error);
      }
    };

    fetchTeam();
  }, []);

  return (
    <section className="our-team">
      <div className="container">
        <h2 className="title-4 center">Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member._id}
              className="team-card"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <div className="team-img">
                <Image
                  src={member.image || "/images/placeholder.webp"}
                  alt={member.name}
                  width={500}
                  height={689}
                />
              </div>
              <h3 className="title-5">{member.name}</h3>
              <p className="team-role">{member.title}</p>
              <p className="team-desc">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
