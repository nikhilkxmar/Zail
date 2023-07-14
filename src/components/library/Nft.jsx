import { React } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import control from '../../assets/control.jpg'

const Nft = (props) => {
  return (
    <div className='w-full max-w-[1240px] my-[100px]'>
        <div className='w-full p-4 py-[20px] rounded-t-[7px] border-[2px] border-gray-900 bg-[#b3d4fd] flex justify-between items-center'>
          <h2 className='font-playfair font-semibold text-[25px] leading-[0px] pl-[20px] '>Owned Books</h2>
          <div className='relative w-[100px] h-[40px]'>
            <Image src={control} alt='image' fill className='object-cover'/>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-8 px-4 pt-6 pb-[120px] text-black bg-white rounded-b-[7px] mt-[0px] border-[2px] border-gray-900 w-full'>
            {
            props.nfts.map(nft => (
                    nft.list ? <></> : 
                    <div key={nft.id} className='relative bg-gray-200 text-center shadow-md cursor-pointer mb-[100px] mt-[40px]'>
                    <Link href={{pathname: '/details',
                                query: {
                                id : nft.id,
                                category: nft.category, 
                                title: nft.title, 
                                summary: nft.summary, 
                                thumbnail: nft.thumbnail, 
                                author: nft.author,
                                authorAddress: nft.authorAddress,
                                narrator: nft.narrator,
                                restrictedAudio: nft. restrictedAudio,                                   completeAudio: nft.completeAudio,
                                list: nft.list,
                                userAddress: props.userAddress 
                            }
                    }}>
                    <div className='h-[200px] border-t-[7px]'>
                        <Image src={nft.thumbnail} alt='image' fill className='object-cover border-[3px] border-gray-900 rounded-[7px]'/>
                    </div>

                    <div className='relative top-[100px]'>
                        <h1 className='mt-4 text-gray-800 font-playfair font-semibold text-[17px] truncate'>{nft.title}</h1>
                        <h1 className='mb-4 mt-2 text-gray-800 font-playfair font-semibold text-[17px]'>{nft.author}</h1>
                    </div>
                    </Link>
                    </div>
              ))

            }
        </div>
    </div>
  )
}

export default Nft