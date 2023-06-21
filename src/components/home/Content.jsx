import React from 'react'
import Image from 'next/image'
import books from '../../assets/books.jpg'

const Content = () => {
  return (
    <div className='mt-[75px] max-w-[1240px] mx-auto mb-[20px]'>
        <div className='flex justify-between items-center'>
            <div className='w-[49%]'>
                <h2 className='text-[40px] font-playfair'>Listen to the top books</h2>
                <p className='text-[20px] font-playfair mt-[20px] text-gray-700'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae aperiam sed pariatur. Ex harum laborum, numquam nam, molestiae necessitatibus dolorum sequi possimus eligendi aliquid dolores nemo, animi nisi quod. Voluptatibus ipsum dolor sit amet consectetur adipisicing elit. Vitae aperiam sed pariatur.</p>
                <p className='text-[22px] font-playfair mt-[30px] text-gray-700 italic'>"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae aperiam sed pariatur"</p>
            </div>
            <div className='w-[49%] flex justify-end'>
                <Image src={books} className='w-[450px] h-[450px] opacity-90 rounded-[7px]'/>
            </div>
        </div>
    </div>
  )
}

export default Content