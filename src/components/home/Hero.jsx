"use client"
import React from 'react'
import Image from 'next/image'
import gradient from '../../assets/gradient.jpg'
import mobile from '../../assets/1.png'
import window from '../../assets/window1.jpg'
import { Typewriter  } from 'react-simple-typewriter'



const Hero = () => {
  return (
    <div className='mb-12 px-12'>
        <div className='w-full bg-blue-100 rounded-[7px]'>
            <div className='w-1/2 pl-12 py-4'>
                <h2 className='font-playfair text-[70px] leading-[75px]'>Lorem ipsum, dolor sit amet consectetur.</h2>
                <p className='font-playfair text-[20px] text-gray-600 mt-[30px]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum ex aliquid deserunt quia vero. Error facere sunt, ea voluptate facilis natus? Veniam, laudantium eaque autem assumenda voluptatibus quam explicabo temporibus?</p>
                <div className='flex justify-start mt-[30px]'>
                    <a href="#_" className="relative px-6 py-3 font-playfair font-semibold text-black group">
                        <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-blue-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full border-[3.33px] border-black"></span>
                        <span className="relative">Learn More</span>
                    </a>
                </div>
            </div>
        </div>

        <div className='w-full mt-4 flex justify-between'>
            <div className='w-[40.3%] relative shadow-2xl'>
                <Image src={window} className='w-full h-[300px] rounded-[7px]'/>
                <div className='absolute top-[140px] left-[15px]'>
                    <h3></h3>
                    <span className='text-[18px] font-playfair'>
                        <Typewriter
                            words={['Hey we should catch up sometime..', 'Let us donate for this cause', 'Im planning on conducting an event!', 'A community driven space']}
                            loop={50}
                            cursor
                            cursorStyle='|'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </span> 
                </div>
            </div>

            <div className='w-[58.3%]'>
                <Image src={mobile} className='w-[800px] h-[600px] rounded-[7px] absolute right-[-60px] top-[175px] z-20 overflow-hidden'/>
                <div className='absolute z-10 w-[240px] h-[530px] right-[220px] top-[260px] bg-gradient-to-r from-black to-gray-900 blur-[0.5px] rotate-[31deg] rounded-[30px] drop-shadow-2xl opacity-80' />
                <Image src={gradient} className='w-full h-[300px] rounded-[7px]'/>
            </div>
        </div>
    </div>
  )
}

export default Hero