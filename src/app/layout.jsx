"use client"
import './globals.css'
import Navbar from "@/components/navigation/Navbar"
import Image from 'next/image'
import coverImage from '../assets/splash.jpg'
import notImage from '../assets/not.jpg'
import Footer from '@/components/global/Footer'
import Head from 'next/head'

export const metadata = {
  title: 'ZAIL',
  description: 'ZAIL SPACES',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
      </head>
      <body>
        <div className='lg:block hidden'>
          <Navbar />
          <Image src={coverImage} alt='image' fill className='object-cover absolute z-[-1]'/>
          {children}
          <Footer />
        </div>
        <div className='w-screen h-screen bg-white lg:hidden p-6 flex flex-col justify-center items-center'>
          <div className='relative w-[300px] h-[300px]'>
            <Image src={notImage} alt='image' fill className='object-cover'/>
          </div>
          <h2 className='font-playfair font-semibold text-[18px] text-center'>We are not available for smaller devices yet!! Sorry for the inconvenience</h2>
        </div>
      </body>
    </html>
  )
}