import React from 'react'
import { useGSAP } from '@gsap/react'        // React hook for GSAP animations
import gsap from 'gsap'                      // Main GSAP library
import { ScrollTrigger } from 'gsap/ScrollTrigger' // ScrollTrigger plugin
import AnimatedTitle from './AnimatedTitle'
// Register the plugin (mandatory)
gsap.registerPlugin(ScrollTrigger);

const About = () => {

  // useGSAP hook runs when the component mounts
  useGSAP(() => {
    // Create a timeline that connects to scroll behavior
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '#clip',            // Element that starts the animation
        start: 'center center',      // When the trigger hits center of viewport
        end: '+=800 center',         // Continue the animation for 800px of scroll
        scrub: 0.5,                 // Sync animation progress with scroll
        pin: true,                  // Set true if you want it to stay fixed
        pinSpacing: true,            // Leave spacing after pin (optional)
      },
    });

    // Animate the shape of the mask container as you scroll
    clipAnimation.to('.mask-clip-path', {
      width: '100vw',     // expand to full viewport width
      height: '100vh',    // expand to full viewport height
      borderRadius: 0,    // remove rounded corners (becomes rectangle)
      ease: 'power1.inOut'
    });
  });

  return (
    <div id='about' className='min-h-screen w-screen bg-white text-black'>
      
      {/* ────────────── HEADER SECTION ────────────── */}
      <div className='relative mb-8 mt-36 flex flex-col items-center gap-5 text-center'>
        <h2 className='font-general text-sm uppercase md:text-[10px]'>
          Welcome to Zentry
        </h2>

       <AnimatedTitle title="Disc<b>o</b>ver the world's <br/> l<b>a<b/>rgest shared Adventure" containerClass='mt-5 !text-black text-center' />

        <div className='about-subtext text-gray-600 text-sm md:text-base'>
          <p>The Game of Games begins — your life,</p>
          <p>Zentry unites every player from countless games and platforms.</p>
        </div>
      </div>

      {/* ────────────── IMAGE CLIP SECTION ────────────── */}
      <div className='h-dvh w-screen flex items-center justify-center' id='clip'>
        {/* This is the masked container that will expand on scroll */}
        <div className='mask-clip-path about-image'>
          <img 
            src='img/about.webp' 
            alt='background'
            className='absolute left-0 top-0 size-full object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default About
