import React, { useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaDiscord, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

// --- Data: Social Links ---
const socialLinks = [
  { href: "#", icon: <FaDiscord />, label: "Discord" },
  { href: "#", icon: <FaTwitter />, label: "Twitter" },
  { href: "#", icon: <FaInstagram />, label: "Instagram" },
  { href: "#", icon: <FaGithub />, label: "Github" },
];

// --- COMPONENT: Image Clip Box ---
const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} alt="decoration" className="h-full w-full object-cover" />
  </div>
);

// --- COMPONENT: Footer (New) ---
const Footer = () => {
  return (
    <footer className="w-full bg-black py-6 text-blue-50">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 md:flex-row">
        
        {/* Left: Copyright */}
        <p className="text-center text-sm font-light md:text-left">
          &copy; Nova 2025. All rights reserved
        </p>

        {/* Right: Links */}
        <div className="flex justify-center gap-6 md:justify-start">
          <a href="#" className="text-sm font-light transition-colors hover:text-violet-400 hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="text-sm font-light transition-colors hover:text-violet-400 hover:underline">
            Terms of Service
          </a>
          <a href="#" className="text-sm font-light transition-colors hover:text-violet-400 hover:underline">
            Legal
          </a>
        </div>
      </div>
    </footer>
  );
};

// --- COMPONENT: Button ---
const Button = ({ title, containerClass }) => {
  return (
    <button className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}>
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>
    </button>
  );
};

// --- MAIN COMPONENT: Contact ---
const Contact = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.contact-clip-path-1', {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
      }
    });

    gsap.from('.contact-clip-path-2', {
      x: 100,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
      }
    });
  }, { scope: containerRef });

  return (
    <>
    <div id="contact" ref={containerRef} className='my-20 min-h-96 w-screen px-10'>
      {/* Contact Card */}
      <div className='relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden'>

        {/* Left Image */}
        <div className='absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96'>
          <ImageClipBox
            clipClass="contact-clip-path-1" 
            src="img/contact-1.webp"
            />
        </div>

        {/* Right Image */}
        <div className='absolute -right-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:right-20 lg:w-96'>
          <ImageClipBox
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
            src="img/contact-2.webp"
            />
        </div>

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
            
          <p className="mb-10 font-general text-[10px] uppercase text-white">
            Join the Adventure
          </p>

          <h2 className="special-font mt-10 w-full font-zentry text-5xl leading-[0.9] md:text-[6rem] mix-blend-difference">
            Let's b<b>u</b>ild the <br /> new e<b>r</b>a of <br /> g<b>a</b>ming t<b>o</b>gether.
          </h2>

          <Button 
            title="Contact Us" 
            containerClass="mt-10 cursor-pointer" 
            />

          {/* Social Icons */}
          <div className="mt-12 flex items-center gap-6">
            {socialLinks.map((link, index) => (
              <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-2xl text-violet-400 transition-all duration-300 hover:bg-violet-500 hover:text-white hover:border-violet-500"
              >
                {link.icon}
                <span className="absolute -top-8 scale-0 rounded bg-white px-2 py-1 text-xs font-bold text-black transition-all duration-300 group-hover:scale-100">
                    {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section - Placed immediately after the card */}
      </div>
      <div className="mt-10 w-full border-t border-white/10 pt-6 ">
        <Footer />
      </div>
    </>
  )
}

export default Contact