import React from 'react'
import Image from 'next/image'
import books from '../../assets/books.jpg'

const Content = () => {
  return (
    <div className='mt-[75px] max-w-[1240px] mx-auto mb-[20px]'>
        <div className='flex justify-between items-center'>
            <div className='w-[49%]'>
                <h2 className='text-[40px] font-playfair'>{'Listen to the top books'}</h2>
                <p className='text-[20px] font-playfair mt-[20px] text-gray-700'>{'Immerse yourself in a world of literary excellence with our curated collection of top books available for listening. Indulge in the finest narratives crafted by celebrated authors, where every word comes to life through the power of audio. From gripping thrillers to heartwarming tales, thought-provoking non-fiction to captivating fiction, our selection represents the very best of literature across genres. Sit back, relax, and let the captivating voices of talented narrators transport you to extraordinary realms and ignite your imagination.'}</p>
                <p className='text-[20px] font-playfair mt-[30px] text-gray-700 italic'>{'"Immerse yourself in the symphony of words as you listen to the top books, where stories come alive and ignite the spark of imagination within"'}</p>
            </div>
            <div className='w-[49%] flex justify-end'>
                <Image src={books} alt='image' className='w-[450px] h-[450px] opacity-90 rounded-[7px]'/>
            </div>
        </div>
    </div>
  )
}

export default Content