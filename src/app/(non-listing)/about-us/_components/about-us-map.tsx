"use client";

import Image from "next/image";
import React, { useState } from "react";

const AboutUsMap = () => {
  const map = "/images/map.png";
  const hoverMap = "/images/aboutus/hover_map.png";
  const [mapSrc, setMapSrc] = useState(map);

  return (
    <div className="relative w-4/5 ">
      <Image
        src={mapSrc}
        alt="map"
        onMouseEnter={() => setMapSrc(hoverMap)}
        onMouseLeave={() => setMapSrc(map)}
        height={450} 
        width={450}
        className="w-full rounded-lg object-cover"
        loading="lazy"
      />
      <div
        style={{
          position: "absolute",
          top: "-30px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          padding: "8px 16px",
          borderRadius: "5px",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        4550 E Bell Rd Building 3 Suite 226, Phoenix, AZ, 85032
      </div>
    </div>
  );
};

export default AboutUsMap;
