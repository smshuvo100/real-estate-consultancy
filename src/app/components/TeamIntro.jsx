import React from "react";
import Image from "next/image";

export function TeamIntro() {
  return (
    <>
      <section className="team-intro">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-image">
              <Image
                src="/images/john-doe.webp"
                alt="John Doe"
                width={1000}
                height={1047}
              />
            </div>

            <div className="intro-content">
              <h2 className="title-3">John Doe</h2>
              <p className="intro-role">Founder</p>
              <p>
                Lorem ipsum dolor sit amet consectetur. Fames morbi id ut a.
                Sodales dignissim eget habitasse massa proin tincidunt a
                placerat. Accumsan neque posuere nulla commodo. Vitae neque sem
                in vel varius vulputate velit amet feugiat. Feugiat quis nunc
                aliquam facilisis. Mi purus vehicula in ultricies pulvinar
                condimentum non. Tortor egestas donec sed in. Quis gravida nulla
                aliquam lacus tristique. Imperdiet nibh facilisi sed amet.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur. Fames morbi id ut a.
                Sodales dignissim eget habitasse massa proin tincidunt a
                placerat. Accumsan neque posuere nulla commodo. Vitae neque sem
                in vel varius vulputate velit amet feugiat. Feugiat quis nunc
                aliquam facilisis. Mi purus vehicula in ultricies pulvinar
                condimentum non. Tortor egestas donec sed in. Quis gravida nulla
                aliquam lacus tristique. Imperdiet nibh facilisi sed amet.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
