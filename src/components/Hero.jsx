import React, { useEffect, useRef, useState } from 'react'
import Button from './Button.jsx'
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;
    const nextVideoRef = useRef(null);

    
    
    useGSAP(
        () => {
          if(hasClicked){
            gsap.set("#next-video", { visibility: 'visible' });
            gsap.to("#next-video", {
              transformOrigin:'center center',
              scale: 1,
              width: '100%',
              height: '100%',
              duration: 1,
              ease: "power1.inOut",
              onStart: () => nextVideoRef.current.play(),
            });
      
          // Animate current video
          gsap.from("#current-video", {
            scale: 0,
            ease: "power1.inOut",
            duration: 1.5,
          });
        }
    },
        {
          dependencies: [currentIndex],
          revertOnUpdate: true,
        }
      );
        
      useGSAP(() => {
        gsap.set("#video-frame", {
            //trapezium shape
          clipPath: "polygon(14% 0, 72% 0, 90% 90%, 0% 100%)",
          border: "2px solid #000" // example if you actually meant to add a border
        })
        ;

        gsap.from('#video-frame',{
            //Rectange 
            clipPath:'polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)',
            borderRadius:'0 0 0 0',
            ease:'power1.inOut',
            duration:1.5,
            scrollTrigger:{
                trigger:'#video-frame',
                start:'center center',
                end:'bottom center',
                scrub:true,
            }
        });
        ScrollTrigger.refresh();
      });
      
    const handleVideoLoad = () => {
        setLoadedVideos(prevCount => prevCount + 1);
    }

    const handleMiniVideoClick = () => {
        setHasClicked(true);
        setCurrentIndex(prevIndex => (prevIndex % totalVideos) + 1);
    }

    useEffect(() => {
        if(loadedVideos===totalVideos-1){
            setIsLoading(false);
        }
      }, [loadedVideos]);
      

    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

    return (
        <div className='relative h-dvh w-screen overflow-x-hidden'>


            {isLoading && (
                <div className='flex-center absolute z-100 h-dvh w-screen overflow-hidden  bg-violet-300'>
                    <div className='three-body'>
                    <div className='three-body__dot'/>
                    <div className='three-body__dot'/>
                    <div className='three-body__dot'/>
                    </div>
                </div>
            )}

            <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75 '>
                <div>
                    <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                        <div onClick={handleMiniVideoClick}
                            className='origin-center scale-50 opacity-0 transition-all duration-500 hover:scale-100 hover:opacity-100'
                        >
                            <video
                                ref={nextVideoRef}
                                src={getVideoSrc((currentIndex % totalVideos) + 1)}
                                loop
                                muted
                                id="current-video"
                                className='size-64 origin-center scale-150 object-cover object-center'
                                onLoadedData={handleVideoLoad}
                            />
                        </div>
                    </div>

                    <video
                        ref={nextVideoRef}
                        src={getVideoSrc(currentIndex)}
                        autoPlay
                        muted
                        id="next-video"
                        className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                        onLoadedData={handleVideoLoad}

                    />

                    <video
                        src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                        autoPlay
                        loop
                        muted
                        className='absolute left-0 top-0 size-full object-cover object-center'
                    />
                </div>
                <h1 className='special-font hero-heading absolute z-50 bottom-5 right-5 text-7xl text-blue-100'>
                    Gaming
                </h1>
                <div className='absolute left-0 top-0 z-40 size-full'>
                <div className='mt-24 px-5 sm:px-10'>
                    <h1 className='special-font hero-heading text-blue-100'>
                    redif<b>n</b>e
                    </h1>

                    <p className='mb-5 max-w-64 font-family-robert-regular text-blue-100'>
                        Enter the MetaGame Layer <br/> 
                        Unleash The Play Economy
                    </p>

                    <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow />} containerClass='bg-yellow-300 flex-center' rightIcon/>
                </div>
                </div>
            </div>
            <h1 className='special-font hero-heading absolute bottom-5 text-blue-500'>
                G <b>a</b>ming
            </h1>

        </div>
    )
}

export default Hero