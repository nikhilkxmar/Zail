import React from 'react'
import Image from 'next/image'
import cover from '../../assets/time.gif'
import {GoNorthStar} from 'react-icons/go'


const GettingStarted = () => {
  return (
    <div className='mt-4'>
        <div className='w-full'>
            <div className='w-full flex justify-between items-start'>
                <div className='self-stretch w-[70%] bg-purple-100 rounded-[7px] px-12 py-8'>
                    <h2 className='font-playfair text-[70px] leading-[75px]'>Craft your audiobook</h2>
                    <p className='font-playfair text-[20px] text-gray-900 mt-[30px]'>Here, you have the opportunity to share your literary talent with the world, while embracing the exciting world of blockchain technology. By transforming your audiobook into an NFT, you unlock new possibilities for ownership, collection, and value. Zail empowers you to be the author, narrator, and curator of your very own audiobook NFT. Read the instructions provided below and proceed your journey</p>
                </div>

                <div className='self-stretch w-[29.2%] flex justify-center bg-black rounded-[7px] px-12 py-8 shadow-xl'>
                    <Image src={cover} alt='image' width={200} height={200} />
                </div>
            </div>

            <div className='bg-[#bedbed] rounded-[7px] px-12 py-8 mt-[12px]'>
                <h2 className='font-playfair text-[40px] mb-[27px]'>Instructions</h2>
                <div className='flex justify-center items-start'>
                    <div className='mt-[7px]'><GoNorthStar className='w-[20px] h-[20px] pointer-events-none'/></div>
                    <p className='font-playfair text-gray-800 text-[20px] ml-[25px]'>Crafting your audiobook is a seamless process. Begin by entering the captivating title that will captivate potential listeners and collectors. Introduce yourself as the author and let users delve into your background, immersing them in your literary journey.</p>
                </div>
                <div className='flex justify-center items-start mt-[33px]'>
                    <div className='mt-[7px]'><GoNorthStar className='w-[20px] h-[20px] pointer-events-none'/></div>
                    <p className='font-playfair text-gray-800 text-[20px] ml-[25px]'>Weave the essence of your audiobook through a compelling summary. Showcase the themes, genres, and unique elements that make your creation one-of-a-kind. Alongside the summary, provide a captivating cover image that captures the essence of your story.</p>
                </div>
                <div className='flex justify-center items-start mt-[33px]'>
                    <div className='mt-[7px]'><GoNorthStar className='w-[20px] h-[20px] pointer-events-none'/></div>
                    <p className='font-playfair text-gray-800 text-[20px] ml-[25px]'>Your audio file is the heart of your audiobook. Allow users to upload their carefully crafted narrative, bringing their characters and worlds to life with their voices. Supported by our platform's accepted file formats, your audio file will become an integral part of the immersive audiobook experience.</p>
                </div>
                <div className='flex justify-center items-start mt-[33px]'>
                    <div className='mt-[7px]'><GoNorthStar className='w-[20px] h-[20px] pointer-events-none'/></div>
                    <p className='font-playfair text-gray-800 text-[20px] ml-[25px]'>To enhance discoverability, provide metadata such as language, narrators, and relevant tags. Enable potential listeners and collectors to find your audiobook effortlessly within our platform's extensive library.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GettingStarted