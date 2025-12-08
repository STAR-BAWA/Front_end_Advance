import React, { useState, useRef } from "react";
import { TiLocationArrowOutline } from "react-icons/ti";

// ===============================
// 🔷 Reusable BentoTilt Component
// ===============================

const BentoTilt = ({ children, className = '' }) => {
  const [transformStyle, settransformStyle] = useState('');
  const itemRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    
    // Fix: Use height for Y calculation, not width
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeX - 0.5) * 5; // Reduced range for smoother effect
    const tiltY = (relativeY - 0.5) * -5; // Inverted Y for natural feel

    const newTransformStyle = `perspective(700px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(0.98, 0.98, 0.98)`;
    
    // Fix: Actually set the state
    settransformStyle(newTransformStyle);
  };

  const handleMouseLeave = () => {
    settransformStyle('');
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle, transition: 'transform 0.1s ease' }}
    >
      {children}
    </div>
  );
};

// ===============================
// 🔷 Reusable BentoCard Component
// ===============================

const BentoCard = ({ src, title, description }) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-800 shadow-lg">
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 size-full object-cover"
      />
      <div className="relative z-10 flex h-full flex-col justify-end p-5 text-blue-50">
        <h1 className="bento-title special-font text-3xl font-bold">{title}</h1>
        <p className="mt-3 max-w-xs text-sm opacity-80">{description}</p>
      </div>
    </div>
  );
};

// ===============================
// 🔶 Features Section
// ===============================
const Features = () => {
  return (
    <section className="pb-52 bg-black text-white">
      
      {/* Intro text */}
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50 leading-relaxed">
            Immerse yourself in a rich and ever-expanding universe where a vibrant
            collection of products merges into an interconnected overlay experience.
          </p>
        </div>
      </div>

      {/* Main big card */}
      <BentoTilt className="relative mb-7 mt-10 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          title={<>radi<b>n</b>t</>}
          description="A cross-platform metagame app turning your digital activity into rewards."
        />
      </BentoTilt>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        
        {/* ZIGMA — row span 2 */}
        <BentoTilt className="row-span-1 md:row-span-2 h-[50vh] md:h-full">
          <BentoCard
            src="videos/feature-2.mp4"
            title={<>Zig<b>m</b>a</>}
            description="Anime-gaming inspired NFT collection ready for expansion."
          />
        </BentoTilt>

        {/* Card 2 - Nexus */}
        <BentoTilt className="h-[35vh]">
          <BentoCard
            src="videos/feature-3.mp4"
            title="Nexus"
            description="A gamified social hub adding a new dimension to digital interaction."
          />
        </BentoTilt>

        {/* Card 3 - Etherpulse */}
        <BentoTilt className="h-[35vh]">
          <BentoCard
            src="videos/feature-4.mp4"
            title="Etherpulse"
            description="A real-time immersive data visualizer for metaverse explorers."
          />
        </BentoTilt>

        {/* Purple Box */}
        <BentoTilt className="relative rounded-md h-[35vh]">
          <div className="flex size-full flex-col justify-between bg-violet-500 p-5 rounded-md">
            <h1 className="bento-title special-font max-w-64 text-black text-3xl font-bold">
              More coming Soon !
            </h1>
            <TiLocationArrowOutline
              className="absolute bottom-5 right-5 text-4xl text-black/50 animate-bounce"
            />
          </div>
        </BentoTilt>

        {/* Card 5 - Flux */}
        <BentoTilt className="h-[35vh]">
          <BentoCard
            src="videos/feature-5.mp4"
            title="Flux"
            description="Synchronizing cross-platform digital identities seamlessly."
          />
        </BentoTilt>

      </div>
    </section>
  );
};

export default Features;