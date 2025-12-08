import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ✅ Register the ScrollTrigger plugin globally so GSAP recognizes it
gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
  // Ref to connect GSAP with this specific component
  const containerRef = useRef(null);

  useEffect(() => {
    // ✅ Create a GSAP context — this keeps animations scoped to this component
    const ctx = gsap.context(() => {
      // Create a GSAP timeline linked with ScrollTrigger (scroll-based animation)
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current, // element that will trigger the animation
          start: "100 bottom",           // animation starts when top of element hits bottom of viewport
          end: "center bottom",          // animation ends when center of element hits bottom
          toggleActions: "play none none reverse", 
          // actions = [onEnter, onLeave, onEnterBack, onLeaveBack]
          // "play none none reverse" means:
          // ▶ Play when entering, ❌ do nothing on leave/enterBack, 🔄 reverse on scroll back up
        },
      });

      // Animate each word inside the title
      titleAnimation.to(".animated-word", {
        opacity: 1, // fade in
        transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)", // reset rotation & position
        ease: "power2.inOut", // smooth easing
        stagger: 0.02, // delay between each word animation
      });
    }, containerRef);

    // ✅ Clean up GSAP animations when the component unmounts or re-renders
    return () => ctx.revert();
  }, []); // empty dependency → runs once on mount

  return (
    <div
      ref={containerRef}
      className={`animated-title ${containerClass}`}
    >
      {/* Split the title wherever <br/> appears to create separate lines */}
      {title.split("<br/>").map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {/* Split each line into words */}
          {line.split(" ").map((word, wordIndex) => (
            <span
              key={wordIndex}
              className="animated-word inline-block font-bold opacity-0"
              // dangerouslySetInnerHTML lets us inject HTML like <b> inside words safely
              dangerouslySetInnerHTML={{
                __html:
                  word + (wordIndex !== line.split(" ").length - 1 ? " " : ""), // add space after each word except last
              }}
            ></span>
          ))}
        </span>
      ))}
    </div>
  );
};

export default AnimatedTitle;
