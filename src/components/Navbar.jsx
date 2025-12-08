import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

// Array of navigation items for the menu
const navItems = [
    'Nexus',
    'Valut',
    'Prologue',
    'About',
    'Contact'
];

const Navbar = () => {
    // State to track if audio is currently playing
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    // State to control the visual indicator animation for audio
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);

    // Ref for the navbar container to apply GSAP animations
    const navContainerRef = useRef(null);
    // Ref for the audio element to control playback
    const audioElementRef = useRef(null);
    // State to store the last scroll Y position for scroll direction detection
    const [lastScrollY, setLastScrollY] = useState(0);
    // State to control navbar visibility based on scroll
    const [isNavVisible, setIsNavVisible] = useState(true);

    // Get the current scroll Y position from useWindowScroll hook
    const { y: currentScrollY } = useWindowScroll();

    // Effect to handle scroll-based navbar visibility
    useEffect(() => {
        if (currentScrollY === 0) {
            // At the top of the page, show navbar and remove floating class
            setIsNavVisible(true);
            navContainerRef.current.classList.remove('floating-nav');
        } else if (currentScrollY > lastScrollY) {
            // Scrolling down, hide navbar and add floating class
            setIsNavVisible(false);
            navContainerRef.current.classList.add('floating-nav');
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up, show navbar and remove floating class
            setIsNavVisible(true);
            navContainerRef.current.classList.remove('floating-nav');
        }
        // Update last scroll position
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    // Effect to animate navbar position with GSAP based on visibility
    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100, // Move up if hidden, down if visible
            duration: 0.3, // Smooth animation duration
        });
    }, [isNavVisible]);

    // Function to toggle audio playback
    const toggleAudio = () => {
        if (audioElementRef.current) {
            if (isAudioPlaying) {
                // Pause audio and deactivate indicator
                audioElementRef.current.pause();
                setIsAudioPlaying(false);
                setIsIndicatorActive(false);
            } else {
                // Play audio and activate indicator
                audioElementRef.current.play();
                setIsAudioPlaying(true);
                setIsIndicatorActive(true);
            }
        }
    };

    return (
        <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
            {/* Header container with transparent background */}
            <header className='w-full h-full bg-transparent'>
                <nav className='flex size-full items-center justify-between p-4'>
                    {/* Left side: Logo and Products button */}
                    <div className='flex items-center gap-7'>
                        <img src='/img/logo.png' alt='logo' className='w-10' />
                        <Button
                            id='product-button'
                            title='Products'
                            rightIcon={<TiLocationArrow />}
                            containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                        />
                    </div>

                    {/* Right side: Navigation links and audio button */}
                    <div className='flex w-full items-center justify-end'>
                        {/* Desktop navigation links */}
                        <div className='hidden md:block'>
                            {navItems.map((item, index) => (
                                <a key={index} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>
                                    {item}
                                </a>
                            ))}
                        </div>

                        {/* Audio toggle button with visual indicators */}
                        <button
                            onClick={toggleAudio}
                            className='ml-10 flex items-center space-x-0.5'
                            aria-label={isAudioPlaying ? 'Pause audio' : 'Play audio'}
                        >
                            {/* Hidden audio element for background music */}
                            <audio src='/audio/loop.mp3' ref={audioElementRef} loop />
                            {/* Visual indicator bars that animate when audio is playing */}
                            {[1, 2, 3, 4].map((bar) => (
                                <div
                                    key={bar}
                                    className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                                />
                            ))}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;
