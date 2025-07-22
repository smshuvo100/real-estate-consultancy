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

      <div className="container">
        <h2 className="title-2">Building Tomorrow</h2>
        <h2 className="title-1">Today</h2>

        <h2 className="title-4 uppercase">recent projects</h2>
        <h2 className="title-4 uppercase">Our services</h2>
        <h2 className="title-4">About Us</h2>

        <h2 className="title-3">
          Did You Find Your <br />
          Dream Home?
        </h2>

        <h2 className="title-5">Land Acquisition & Development</h2>

        <p className="text-1">
          Thank you for getting in touch! if you find your dream home connect
          with us
        </p>
        <p className="big-text">Deira Island</p>
        <div className="btn">
          <button>Read More</button>
        </div>
        <br />

        <div className="btn">
          <a href="#">Read More</a>
        </div>

        <br />
        <input type="button" value="Read More" />
        <br />

        <p>
          lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          iusto fugit adipisci lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam iusto fugit adipisci lorem ipsum dolor sit
          amet consectetur adipisicing elit. Quisquam iusto fugit adipisci lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam iusto
          fugit adipisci lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam iusto fugit adipisci lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam iusto fugit adipisci lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam iusto
          fugit adipisci lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam iusto fugit adipisci lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam iusto fugit adipisci lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam iusto
          fugit adipisci lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam iusto fugit adipisci lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam iusto fugit adipisci lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam iusto
          fugit adipisci lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam iusto fugit adipisci
        </p>

        <Image src="/vercel.svg" alt="Vercel Logo" width={100} height={24} />
      </div>
    </>
  );
}
