"use client";

import Image from "next/image";

import { CustomButton } from "@components";

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero">
      <div className="flex-1 pt-24 padding-x">
        <h1 className="hero__title">
          Find, and test ride a bike-quick and super easy!
        </h1>

        <p className="hero__subtitle">
          Streamline your bike search experience with our effortless booking
          process.
        </p>

        <CustomButton
          title="Explore Bikes"
          containerStyles="bg-primary-blue text-white rounded-full mt-10"
          handleClick={handleScroll}
        />
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image src="/hero-bike-s1000rr.png" alt="hero" fill className="object-contain scale-125" />
        </div>

        <div className="hero__image-overlay" />
      </div>
    </div>
  );
};

export default Hero;
