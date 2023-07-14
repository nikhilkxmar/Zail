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
              <h2 className='text-[40px] pt-12 font-medium text-black font-playfair text-center' style={{letterSpacing: "1px"}}>Traverse</h2>
              <h3 className='text-[25px] pt-6 text-center text-gray-700 font-playfair'>"Open a book, open your mind, and open yourself to endless possibilities"</h3>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-8 px-4 sm:pt-20 text-black'>
              <div className='bg-white rounded-[5px] shadow-sm border-[1.75px] border-black'>
                  <div className='p-4 pb-8'>
                    <div className='w-full flex justify-center'>
                        <Image src={cube} alt='image' className='w-[100px] h-[100px]'/>
                    </div>
                    <h3 className='font-medium font-playfair text-[22px] my-6 text-center'>Connect</h3>
                      <p className='text-gray-600 font-playfair text-[19px] text-center'>Zail is your gateway to a decentralized audiobook experience. Seamlessly connect to our platform using your Flow Wallet, ensuring secure and user-friendly access to a world of captivating narratives. Immerse yourself in a community where users, authors, and listeners unite, fostering a shared passion for the spoken word. By connecting using your Flow Wallet, you can enjoy hassle-free access to our platform.</p>
                  </div>
              </div>
              <div className='bg-white rounded-[5px] shadow-sm border-[1.75px] border-black'>
                  <div className='p-4 pb-8'>
                    <div className='w-full flex justify-center'>
                        <Image src={hole} alt='image' className='w-[100px] h-[100px]'/>
                    </div>
                    <h3 className='font-medium font-playfair text-[22px] my-6 text-center'>Collect</h3>
                      <p className='text-gray-600 font-playfair text-[19px] text-center'> you can indulge in your favorite books and transform them into unique digital treasures. Listen to a vast selection of audiobooks from various genres and eras, and relish the power of ownership. Each audiobook you encounter can be collected as an NFT, granting you a digital artifact that represents your personal connection to the story. Build your library, showcase your literary preferences, and embark on a journey of curated audio collection.</p>
                  </div>
              </div>
              <div className='bg-white rounded-[5px] shadow-sm border-[1.75px] border-black'>
                  <div className='p-4 pb-8'>
                    <div className='w-full flex justify-center'>
                        <Image src={star} alt='image' className='w-[100px] h-[100px]'/>
                    </div>
                    <h3 className='font-medium font-playfair text-[22px] my-6 text-center'>Create</h3>
                      <p className='text-gray-600 font-playfair text-[19px] text-center'>We empower you to become an author in the realm of audiobooks. Unleash your creativity and share your own captivating stories with a global audience. Publish your audio books directly on our platform, allowing listeners worldwide to access and enjoy your literary creations. Forge connections with fellow authors and narrators, collaborate, and make your mark on the decentralized audiobook landscape.</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default QuickStart