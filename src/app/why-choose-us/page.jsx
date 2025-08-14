import React from "react";
import { Hero } from "../components/Hero";
import Image from "next/image";
import { Fullimage } from "../components/Fullimage";
export default function page() {
  const heroData = {
    heroImage: "/images/hero2.webp",
    overlayColor: "rgba(0, 0, 0, 0.1)",
    bottomOverlay: "rgba(0, 0, 0, 0.5)",
    title: "Why Choose Us",
    subtitle: "Advantage",
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
      <section className="our-approach why">
        <div className="container">
          <h2 className="title-3">Why Choose SFK?</h2>

          <p>
            SFK Real Estate Consultancy is distinguished by its visionary
            approach, unwavering dedication to quality, and customer-centric
            philosophy that ensures every project is a testament to excellence
            and sustainability.
          </p>
          <p>
            Our comprehensive understanding of regional markets, coupled with
            global best practices, uniquely positions us to deliver developments
            that not only meet expectations but exceed them.
          </p>
          <p>
            Our projects are characterized by their thoughtful integration into
            existing communities, attention to detail in design and execution,
            and creation of long-term value for investors, residents, and the
            wider community.
          </p>
          <p>
            When you choose SFK, you partner with a developer that doesn’t just
            transform landscapes, but transforms lives.
          </p>
        </div>
      </section>

      <section className="business-diversification left future">
        <div className="container">
          <div className="diversification-grid">
            <div className="diversification-text">
              <h2 className="title-4">Future Outlook</h2>
              <p>
                As we look to the future, SFK Real Estate Consultancy remains
                committed to:
              </p>
              <br />

              <div>
                <ul>
                  <li>
                    PExpanding our portfolio of sustainable developments across
                    the region
                  </li>
                  <li>
                    Continuing to diversify our business interests in
                    complementary sectors
                  </li>
                  <li>
                    Embracing technological innovations to enhance efficiency
                    and user experience
                  </li>
                  <li>
                    Strengthening our market position as a leader in premium
                    real estate development
                  </li>
                  <li>
                    Contributing to the economic and social development of the
                    communities we serve
                  </li>
                </ul>
                <p>
                  Our forward-thinking approach and adaptability ensure that we
                  remain at the forefront of the industry, ready to capitalize
                  on emerging opportunities while maintaining our core values
                  and commitment to excellence.
                </p>
              </div>
            </div>
            <div className="diversification-image">
              <Image
                src={`/images/full-image.webp`}
                width={800}
                height={800}
                alt="diversification"
              />
            </div>
          </div>
        </div>
      </section>
      <Fullimage />
    </>
  );
}
