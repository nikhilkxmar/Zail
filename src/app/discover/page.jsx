'use client'
import * as fcl from '@onflow/fcl'
import * as t from "@onflow/types"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {getSaleNfts} from '../../../cadence/scripts/getSale'
import {AiOutlineSearch} from 'react-icons/ai'
import Link from 'next/link'
import Instructions from "@/components/discover/Instructions"
import panda from '../../assets/panda.png'
import panda2 from '../../assets/panda2.png'
import control from '../../assets/control.jpg' 


export default function Home() {

  const [search, setSearch] = useState(null)
  const [nfts, setNfts] = useState([])
  const [address, setAddress] = useState(false)
  const [update, setUpdate] = useState(false)

  const userAddress = async() => {
    try {
      const currentUser = await fcl.currentUser.snapshot().then(res => res.addr)
      console.log("The Current User", currentUser)
      setAddress(currentUser)
      setUpdate(true)
    } catch(e) {
      console.log(currentUser)
      setAddress(null)
    }
  }

  const getSaleNftsTx = async() => {
    try {
      const result = await fcl.send([
        fcl.script(getSaleNfts),
        fcl.args([
          fcl.arg(search, t.Address),
        ])
      ]).then(fcl.decode)

      console.log(result)
      setNfts(result)
    } catch(e) {
      setNfts(null)
    }
  }

  useEffect(() => {
    userAddress()
    if (update) {
      getSaleNftsTx()
    }
  }, [search, address])


  return (
    <div>
      { address != null && address != false ?
      <div className='flex flex-col justify-between items-center py-6 pt-12 px-12'>
        <div className='w-full'>
        <div className="flex flex-col items-center w-full">
          <h2 className="w-1/2 text-center font-playfair text-[40px] leading-[50px]">
            So what are you waiting for ?
          </h2>
          <h3 className="text-blue-400 w-1/2 text-center font-playfair text-[40px] leading-[75px]">Let's Explore</h3>

        <div className='mt-[30px] w-1/2'>
            <div className='relative flex items-center border-none text-gray-400 focus-within:text-gray-800'>
                <AiOutlineSearch className='w-5 h-5 absolute ml-3 pointer-events-none'/>

                <input type="text" name='searchBar' placeholder='Search Author' autoComplete='off' className='pr-3 pl-14 py-2 font-semibold font-playfair placeholder-gray-500 text-gray-800 border-none ring-2 ring-gray-500 focus:ring-gray-800 w-full' onChange={(e) => setSearch(e.target.value)} />
            </div>
        </div>
        </div></div>

        {
        search ? 
          <div className='w-full max-w-[1240px] mt-[50px]'>
            { nfts == null ? <div className='flex flex-col items-center mt-[60px] mb-[40vh]'><Image src={panda2} alt='image' width={220} height={220}/><h2 className='mt-[10px] text-[20px] font-playfair font-semibold'>Account not Found!!</h2></div> : address==search ? <div className='flex flex-col items-center mt-[60px] mb-[30px]'><Image src={panda} alt='image' width={220} height={220}/><h2 className='mt-[10px] text-[20px] font-playfair font-semibold'>Head over to Library!!</h2></div> : nfts.length == 0 ? <div className='flex flex-col items-center mt-[60px] mb-[30px]'><Image src={panda} alt='image' width={220} height={220}/><h2 className='mt-[10px] text-[20px] font-playfair font-semibold'>No Post yet!!</h2></div> :

            <div className='mb-[50px]'>
            <div className='w-full p-4 py-[20px] rounded-t-[7px] border-[2px] border-gray-900 bg-[#b3d4fd] flex justify-between items-center'>
            <h2 className='font-playfair font-semibold text-[25px] leading-[0px] pl-[20px] '>Published Books</h2>
            <div className='relative w-[100px] h-[40px]'>
            <Image src={control} alt='image' fill className='object-cover'/>
            </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-8 px-4 pb-[100px] text-black bg-white rounded-b-[7px] border-[3px] border-gray-600'>
              {
                Object.keys(nfts).map(nftId => (
                  <div key={nftId} className='relative w-full bg-gray-200 text-center my-4 shadow-md cursor-pointer mb-[100px] mt-[40px]'>
                    <Link href={{pathname: '/saleCollection',
                                query: {
                                id : nfts[nftId].ref.id,
                                category: nfts[nftId].ref.category, 
                                title: nfts[nftId].ref.title, 
                                summary: nfts[nftId].ref.summary, 
                                thumbnail: nfts[nftId].ref.thumbnail, 
                                author: nfts[nftId].ref.author,
                                authorAddress: nfts[nftId].ref.authorAddress,
                                narrator: nfts[nftId].ref.narrator,
                                restrictedAudio: nfts[nftId].ref. restrictedAudio,                                   completeAudio: nfts[nftId].ref.completeAudio,
                                list: nfts[nftId].ref.list,
                                userAddress: address,
                                searchAddress: search,
                                price: nfts[nftId].price
                            }
                    }}>
                    <div className = 'justify-self-stretch h-[200px] border-t-[7px]'>
                        <Image src={nfts[nftId].ref.thumbnail} alt='image' fill className='object-cover border-[3px] border-gray-900 rounded-[7px]'/>
                    </div>

                    <div className='relative top-[100px]'>
                        <h1 className='mt-4 text-gray-800 font-playfair font-semibold text-[17px] truncate'>{nfts[nftId].ref.title}</h1>
                        <h1 className='mb-4 mt-2 text-gray-800 font-playfair font-semibold text-[17px]'>{nfts[nftId].ref.author}</h1>
                    </div>
                  </Link>
                  </div>
              ))}
            </div> 
            </div>

            }
          </div>

          : <Instructions />
          }
      </div> :       
      <div className='w-screen h-[80vh] flex flex-col justify-center items-center'>
        <Image src={panda} alt='image' width={220} height={220}/><h2 className='mt-[10px] text-[20px] font-playfair font-semibold'>Connect your Wallet</h2>
      </div>}
    </div>
  )
}