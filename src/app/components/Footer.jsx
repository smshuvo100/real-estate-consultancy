import React from "react";
import Image from "next/image";
export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container foo">
          <div className="flex-box">
            <div className="box1">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={205}
                height={36}
              />
              <p>
                Dream Home is a gated community with a great location. Located
                downtown, you&apos;re within walking distance of Parks, and
                the...
                <a href="#">View More</a>
              </p>
            </div>
            <div className="box2">
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
                <a href="www.sfk.ae" className="text-icon">
                  <Image
                    src="/icons/web.svg"
                    alt="web"
                    width={24}
                    height={24}
                  />
                  <span>www.sfk.ae</span>
                </a>
              </div>
            </div>
            <div className="box3">
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
            </div>
          </div>
        </div>

        <div className="copyright">
          <div className="container">
            <p>© 2025 SFK Real Estate Consultancy. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
