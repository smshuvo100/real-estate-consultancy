import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* hero section */}
      <section className="hero">
        <div className="overlay"></div>
        <div className="container-fluid">
          <div className="center">
            <h2 className="title-2">Building Tomorrow</h2>
            <h2 className="title-1">Today</h2>
          </div>

          <div className="grid">
            <div className="box">
              <h2 className="title-5">Excellence</h2>
              <p>
                We are committed to delivering the highest quality in every
                project, exceeding expectations and setting new standards in the
                industry.
              </p>
            </div>
            <div className="box">
              <h2 className="title-5">Excellence</h2>
              <p>
                We are committed to delivering the highest quality in every
                project, exceeding expectations and setting new standards in the
                industry.
              </p>
            </div>
            <div className="box">
              <h2 className="title-5">Excellence</h2>
              <p>
                We are committed to delivering the highest quality in every
                project, exceeding expectations and setting new standards in the
                industry.
              </p>
            </div>
            <div className="box">
              <h2 className="title-5">Excellence</h2>
              <p>
                We are committed to delivering the highest quality in every
                project, exceeding expectations and setting new standards in the
                industry.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* recent projects */}
      {/* 
      <section className="recent-projects">
        <div className="container">
          <h2 className="title-4 uppercase">recent projects</h2>
        </div>
      </section> 
      */}

      {/* our services */}
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

      {/* gallery section */}
      <section className="gallery">
        <div className="gallery-item item-1">
          <Image
            src="/images/gallery-1.webp"
            alt="gallery1"
            width={1468}
            height={532}
          />
        </div>
        <div className="gallery-item item-2">
          <Image
            src="/images/gallery-2.webp"
            alt="gallery2"
            width={724}
            height={569}
          />
        </div>
        <div className="gallery-item item-3">
          <Image
            src="/images/gallery-3.webp"
            alt="gallery3"
            width={735}
            height={569}
          />
        </div>
        <div className="gallery-item item-4">
          <Image
            src="/images/gallery-4.webp"
            alt="gallery4"
            width={739}
            height={1110}
          />
        </div>
        <div className="gallery-item item-5">
          <Image
            src="/images/gallery-5.webp"
            alt="gallery5"
            width={775}
            height={708}
          />
        </div>
        <div className="gallery-item item-6">
          <Image
            src="/images/gallery-6.webp"
            alt="gallery6"
            width={775}
            height={394}
          />
        </div>
      </section>

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

      <section className="contact">
        <div className="container">
          <div className="flex-box">
            <div className="text-box">
              <h2 className="title-3">Did You Find Your Dream Home?</h2>
              <p className="text-1">
                Thank you for getting in touch! if you find your dream home
                connect with us
              </p>
            </div>
            <div className="form-box">
              <form className="form">
                <div className="form-group">
                  <input type="text" name="name" required />
                  <label>Your Name</label>
                </div>

                <div className="form-group">
                  <input type="email" name="email" required />
                  <label>Your Email</label>
                </div>

                <div className="form-group">
                  <input type="tel" name="phone" required />
                  <label>Phone Number</label>
                </div>

                <div className="form-group">
                  <select required defaultValue="">
                    <option value="" disabled></option>
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                  </select>
                  <label>Interested In</label>
                </div>

                <div className="form-group full-width">
                  <textarea name="message" required></textarea>
                  <label>Message</label>
                </div>
                <div className="btn">
                  <button>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

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
