import React, { useRef } from 'react';
import AnimatedTitle from './AnimatedTitle';
import { gsap } from 'gsap';

const Story = () => {
  const frameRef = useRef(null);

  const handleMouseLeave = () => {
    const element = frameRef.current;
    
    gsap.to(element, {
      duration: 0.5,
      rotateX: 0,
      rotateY: 0,
      ease: 'power1.out',
    });
  };

  const handleMouseMove = (e) => {
    const element = frameRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: 'power1.out',
    });
  };

  return (
    <section id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        
        {/* 1. Small Header */}
        <p className="font-general text-sm uppercase md:text-[10px]">
          the multtiversal ip world
        </p>

        {/* 2. Main Title - Moved OUT of the relative image wrapper */}
        <div className="relative size-full">
            <AnimatedTitle
              title={'The st<b>o</b>ry of <br/> hidden realm'}
              sectionId="#story"
              // Added relative, z-10, and padding/margin to position it correctly above
              containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
            />

            {/* 3. The 3D Image Container */}
            <div className="story-img-container">
              <div className="story-img-mask">
                <div className="story-img-content">
                  <img
                    ref={frameRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseLeave}
                    onMouseUp={handleMouseLeave}
                    src="/img/entrance.webp"
                    alt="Hidden Realm Story"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Story;