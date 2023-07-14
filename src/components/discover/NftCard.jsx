import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const NftCard = (props) => {
  return (
    <div className='max-w-[1240px] mb-[100px]'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-8 px-4 sm:pt-20 text-black'>
            {
            props.nfts.map(nft => (
                <div key={nft.id} className='relative bg-gray-200 text-center my-4 shadow-md cursor-pointer'>
                    <Link href={{pathname: '/saleCollection',
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

export default NftCard