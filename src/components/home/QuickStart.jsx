import React from 'react'
import Image from 'next/image'
import cube from '../../assets/cube.gif'
import hole from '../../assets/hole.gif'
import star from '../../assets/star.gif'

const QuickStart = () => {
  return (
    <div className='mb-20'>
        <div className='max-w-[1240px] mx-auto text-white relative'>
          <div className='px-4'>
              <h2 className='text-[40px] pt-12 font-medium text-black font-playfair text-center' style={{letterSpacing: "1px"}}>Support</h2>
              <h3 className='text-[25px] pt-6 text-center text-gray-700 font-playfair'>"He who wishes to secure the good of others has already secured his own"</h3>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-8 px-4 sm:pt-20 text-black'>
              <div className='bg-white rounded-[5px] shadow-sm border-[1.75px] border-black'>
                  <div className='p-4 pb-8'>
                    <div className='w-full flex justify-center'>
                        <Image src={cube} className='w-[100px] h-[100px]'/>
                    </div>
                    <h3 className='font-medium font-playfair text-[22px] my-6 text-center'>Connect</h3>
                      <p className='text-gray-600 font-playfair text-[19px] text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi provident iure placeat blanditiis ea sint earum hic iste quibusdam exercitationem.</p>
                  </div>
              </div>
              <div className='bg-white rounded-[5px] shadow-sm border-[1.75px] border-black'>
                  <div className='p-4 pb-8'>
                    <div className='w-full flex justify-center'>
                        <Image src={hole} className='w-[100px] h-[100px]'/>
                    </div>
                    <h3 className='font-medium font-playfair text-[22px] my-6 text-center'>Listen</h3>
                      <p className='text-gray-600 font-playfair text-[19px] text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi provident iure placeat blanditiis ea sint earum hic iste quibusdam exercitationem.</p>
                  </div>
              </div>
              <div className='bg-white rounded-[5px] shadow-sm border-[1.75px] border-black'>
                  <div className='p-4 pb-8'>
                    <div className='w-full flex justify-center'>
                        <Image src={star} className='w-[100px] h-[100px]'/>
                    </div>
                    <h3 className='font-medium font-playfair text-[22px] my-6 text-center'>Create</h3>
                      <p className='text-gray-600 font-playfair text-[19px] text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi provident iure placeat blanditiis ea sint earum hic iste quibusdam exercitationem.</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default QuickStart