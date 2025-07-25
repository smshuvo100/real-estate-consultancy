import React from "react";

export function Hero({ data }) {
  if (!data) return null;

  const {
    heroImage,
    overlayColor,
    bottomOverlay,
    title,
    subtitle,
    features,
    description,
  } = data;

  return (
    <section
      className="hero"
      style={heroImage ? { backgroundImage: `url("${heroImage}")` } : {}}
    >
      {overlayColor && (
        <div
          className="overlay"
          style={{ backgroundColor: overlayColor }}
        ></div>
      )}

      <div className="container">
        {(title || subtitle) && (
          <div className="center">
            {title && <h2 className="title-2">{title}</h2>}
            {subtitle && <h2 className="title-1">{subtitle}</h2>}
          </div>
        )}
      </div>

      {(features?.length > 0 || description?.title || description?.text) && (
        <div
          className="hero-bottom"
          style={bottomOverlay ? { backgroundColor: bottomOverlay } : {}}
        >
          <div className="container">
            {features?.length > 0 && (
              <div className="grid">
                {features.map((item, index) => (
                  <div className="box" key={index}>
                    {item.title && <h2 className="title-5">{item.title}</h2>}
                    {item.text && <p>{item.text}</p>}
                  </div>
                ))}
              </div>
            )}

            {(description?.title || description?.text) && (
              <div className="grid2">
                {description?.title && (
                  <div className="box">
                    <h2 className="title-3">{description.title}</h2>
                  </div>
                )}
                {description?.text && (
                  <div className="box">
                    <p>{description.text}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
