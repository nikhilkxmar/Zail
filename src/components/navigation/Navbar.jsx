import React from 'react'
import Connect from './Connect'
import logo from '../../assets/zail.png'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-6 pt-8 px-12'>
        <div><Image src={logo} className='md:cursor-pointer h-9 w-36'/></div>
        <Connect />
    </div>
  )
}

export default Navbar