import React from 'react'
import {LuPackageSearch} from 'react-icons/lu'
import {GiFizzingFlask} from 'react-icons/gi'
import {BiPurchaseTagAlt} from 'react-icons/bi'


const Instructions = () => {
  return (
      <div className='max-w-[1240px]'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-8 px-4 sm:pt-20 text-black'>
              <div className='bg-white rounded-[5px] shadow-sm border-[1.75px] border-black'>
                  <div className='p-4 pb-8'>
                    <div className='w-full flex justify-center'>
                      <LuPackageSearch className='w-[40px] h-[40px] pointer-events-none'/>
                    </div>
                    <h3 className='font-medium font-playfair text-[22px] my-6 text-center'>Search</h3>
                      <p className='text-gray-600 font-playfair text-[19px] text-center'>Discover audiobooks from your favorite authors on our decentralized platform. Use the search function to find authors by address and explore their collection of captivating audiobooks. Whether you're a fan of mystery, romance, or science fiction, searching by author allows you to easily access their works and embark on exciting audio adventures.</p>
                  </div>
              </div>
              <div className='bg-white rounded-[5px] shadow-sm border-[1.75px] border-black'>
                  <div className='p-4 pb-8'>
                    <div className='w-full flex justify-center'>
                        <GiFizzingFlask className='w-[40px] h-[40px] pointer-events-none'/>
                    </div>
                    <h3 className='font-medium font-playfair text-[22px] my-6 text-center'>Try</h3>
                      <p className='text-gray-600 font-playfair text-[19px] text-center'>Curious about a particular audiobook? Dive into a sample to get a taste of the story before making a commitment. With the "Play Sample" feature, you can listen to a portion of the audio for free. Immerse yourself in the narrator's voice, the captivating plot, and the immersive world of the audiobook. It's a great way to determine if the audiobook is right for you.</p>
                  </div>
              </div>
              <div className='bg-white rounded-[5px] shadow-sm border-[1.75px] border-black'>
                  <div className='p-4 pb-8'>
                    <div className='w-full flex justify-center'>
                        <BiPurchaseTagAlt className='w-[40px] h-[40px] pointer-events-none'/>
                    </div>
                    <h3 className='font-medium font-playfair text-[22px] my-6 text-center'>Purchase</h3>
                      <p className='text-gray-600 font-playfair text-[19px] text-center'> Ready to embark on a full audiobook experience? Purchase your desired audiobook and enjoy hours of immersive storytelling. Our platform offers a convenient and secure way to buy audiobooks. Simply choose the audiobook you want to own, follow the purchase process, and gain access to a world of incredible narratives. It's time to enrich your audio library.</p>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Instructions