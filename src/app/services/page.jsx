import React from "react";
import { Hero } from "../components/Hero";

import { ApproachTabs } from "../components/ApproachTabs";
import { StrategicPartnerships } from "../components/StrategicPartnerships";
import Image from "next/image";
export default function page() {
  const heroData = {
    heroImage: "/images/hero2.webp",
    overlayColor: "rgba(0, 0, 0, 0.1)",
    bottomOverlay: "rgba(0, 0, 0, 0.5)",
    title: "What we do",
    subtitle: "services",
    features: [
      {
        title: "Excellence",
        text: "We are committed to delivering the highest quality in every project, exceeding expectations and setting new standards in the industry.",
      },
      {
        title: "Innovation",
        text: "We embrace creativity and advanced technologies to stay ahead of market trends, constantly seeking new solutions to complex challenges.",
      },
      {
        title: "Integrity",
        text: "We uphold transparency and ethical practices in all business operations, building trust with clients, partners, and communities.",
      },
      {
        title: "Sustainability",
        text: "We ensure our developments contribute positively to the environment and community, creating lasting value for generations to come.",
      },
    ],
  };
  return (
    <>
      <div className="about-hero">
        <Hero data={heroData} />
      </div>

      <section className="sarvice-page-sec-1">
        <div className="container">
          <h2 class="title-4 uppercase center">Our services</h2>

          <div className="service-grid">
            <div className="box">
              <h3 class="title-5">Land Acquisition & Development</h3>
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
              <h3 class="title-5">Project Planning & Management</h3>
              <p>
                From initial concept and design through to construction and
                handover, our comprehensive project management ensures timely
                delivery and the highest quality standards. Our experienced team
                oversees every aspect of development, coordinating architects,
                engineers, contractors, and stakeholders to bring visionary
                projects to life with precision and excellence.
              </p>
            </div>
            <div className="box">
              <h3 class="title-5">Sustainable Development</h3>
              <p>
                We integrate cutting-edge green technologies and sustainable
                practices to create eco-friendly environments that promote a
                higher quality of life and reduce environmental impact. Our
                commitment to sustainability extends beyond environmental
                considerations to encompass social responsibility and economic
                viability, creating developments that stand the test of time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sarvice-page-sec-2">
        <div className="container">
          <h2 class="title-4 uppercase center">Our services</h2>

          <div className="service-grid">
            <div className="box">
              <Image
                src="/images/nsp1.webp"
                alt="service"
                width={1000}
                height={900}
              />
              <h3 class="title-5">Logistics Services</h3>
              <p>
                Through Al Mamlaka Logistics Services, we provide comprehensive
                logistics solutions including warehousing, distribution,
                temperature controlled storage, and supply chain management. Our
                logistics facilities are strategically located near major ports
                and airports, offering clients efficient access to regional and
                international markets.
              </p>

              <h3 class="title-6">Service Highlights:</h3>

              <ul>
                <li>Dry and temperature-controlled warehousing</li>
                <li>Distribution and transportation services</li>
                <li>Supply chain management solutions</li>
                <li>Import/export logistics support.</li>
                <li>Specialized handling for various</li>
                <li>product categories</li>
              </ul>
            </div>
            <div className="box">
              <Image
                src="/images/nsp2.webp"
                alt="service"
                width={1000}
                height={900}
              />
              <h3 class="title-5">Exhibition Organization</h3>
              <p>
                Al Mamlaka Organizing Exhibitions specializes in planning and
                executing professional exhibitions, trade shows, and corporate
                events. With operations in both Oman and Kuwait (through Expo
                City), this division helps businesses showcase their products
                and services to targeted audiences.
              </p>

              <h3 class="title-6">Service Highlights</h3>

              <il>
                <li>Trade show organization and management</li>
                <li>Corporate event planning</li>
                <li>Exhibition space design and setup</li>
                <li>Marketing and promotional support</li>
                <li>Visitor management and engagement</li>
              </il>
            </div>
            <div className="box">
              <Image
                src="/images/nsp2.webp"
                alt="service"
                width={1000}
                height={900}
              />
              <h3 class="title-5">Luxury Consumer Products</h3>
              <p>
                Expanding beyond real estate and services, we have successfully
                launched Al Mamlaka Perfumes, a premium fragrance line that
                embodies luxury and sophistication. This venture demonstrates
                our ability to extend our brand into high-end consumer markets.
              </p>

              <h3 class="title-6">Service Highlights</h3>

              <ul>
                <li>Premium fragrance formulations</li>
                <li>Luxury packaging and presentation</li>
                <li>Distinctive brand identity</li>
                <li>Exclusive distribution channels</li>
                <li>Growing market presence</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="service-page-sec-3">
        <div className="container">
          <div className="grid-box">
            {" "}
            <div className="box">
              <h2 class="title-4 uppercase">WHY CHOOSE SFK?</h2>
              <p>
                SFK Real Estate Consultancy is distinguished by its visionary
                approach, unwavering dedication to quality, and customer-centric
                philosophy that ensures every project is a testament to
                excellence and sustainability. Our comprehensive understanding
                of regional markets, coupled with global best practices,
                uniquely positions us to deliver developments that not only meet
                expectations but exceed them. Our projects are characterized by
                their thoughtful integration into existing communities,
                attention to detail in design and execution, and creation of
                long-term value for investors, residents, and the wider
                community. When you choose SFK, you partner with a developer
                that doesn't just transform landscapes, but transforms lives.
              </p>
            </div>
            <div className="box">
              <div className="img-box">
                <Image
                  src="/images/nss3.webp"
                  alt="service"
                  width={1000}
                  height={900}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ApproachTabs />
      <StrategicPartnerships />
    </>
  );
}
