import React from 'react';
import AnimatedTitle from './AnimatedTitle';

const Story = () => {
  return (
    <>
      <section id='story' className='min-h-dvh w-screen bg-black text-blue-50'>
        <div className='flex size-full flex-col items-center justify-center p-8 md:flex-row'>
          <div className='flex-1 p-4'>
            <AnimatedTitle 
              title="Our St<b>o</b>ry" 
              containerClass='text-center md:text-left' 
            />
            <p className='mt-5 font-robert-regular text-base text-gray-400 md:text-lg'>
              In a world shrouded in mystery, where ancient prophecies speak of a
              chosen hero, a new legend is about to be born. A land of magic
              and monsters awaits, where every choice you make shapes your
              destiny. Will you be the one to bring light to the darkness?
            </p>
          </div>
          <div className='flex-1 p-4'>
            <img 
              src='img/swordman.webp' 
              alt='A warrior looking over a vast landscape' 
              className='rounded-lg object-cover shadow-lg'
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Story;