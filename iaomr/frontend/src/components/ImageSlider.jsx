import React, { useState, useEffect } from "react";
import img1 from "../images/slider1.jpg";
import img2 from "../images/slider2.jpeg";
import img3 from "../images/slider3.jpg";

import v7 from "../images/vizag/v7.jpg"
import v8 from "../images/vizag/v8.jpg"
import v9 from "../images/vizag/v9.jpg"
import v10 from "../images/vizag/v10.jpg"
import v12 from "../images/vizag/v12.jpg"
import v13 from "../images/vizag/v13.jpg"
import v15 from "../images/vizag/v15.jpg"
import v16 from "../images/vizag/v16.jpg"
import v17 from "../images/vizag/v17.jpg"
import v18 from "../images/vizag/v18.jpg"
import v19 from "../images/vizag/v19.jpg"


const images = [
  img1,
  img2,
  img3,
  // v7,v8,v9,v10,v12,v13,v15,v16,v17,v18,v19
];


export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic slide change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goRight = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", height: "100%" }}>
      {/* Slides */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`slide ${index}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            transition: "opacity 0.5s ease-in-out",
            opacity: index === currentIndex ? 1 : 0,
          }}
        />
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goLeft}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          fontSize: "2rem",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
      >
        ‹
      </button>
      <button
        onClick={goRight}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          fontSize: "2rem",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
      >
        ›
      </button>
    </div>
  );
}