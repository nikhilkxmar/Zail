import React from 'react'
import {AiFillGithub} from 'react-icons/ai'
import {AiOutlineInstagram} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='w-full px-12 py-[20px] mt-[50px] bg-gray-100'>
        <div className='flex justify-between items-center rounded-lg mb-4'>
            <div>©Copyright 2023. All Rights Reserved</div>
            <div className='flex'>
                <div className='cursor-pointer'><a href='https://github.com/nikhilkxmar' target='blank'><AiFillGithub className='text-4xl w-[35px] h-[35px] p-[4px] rounded-full border border-[#fff] text-neutral-700 group -hover:text-white bg-neutral-100 border-gray-200' /></a></div>
                <div className='ml-4 cursor-pointer'><a href='https://github.com/nikhilkxmar' target='blank'><AiOutlineInstagram className='text-4xl w-[35px] h-[35px] p-[4px] rounded-full border border-[#fff] text-neutral-700 group -hover:text-white bg-neutral-100 border-gray-200' /></a></div>
            </div>
        </div>
    </div>
  )
}

export default Footer