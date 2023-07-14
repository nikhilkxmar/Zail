'use client'
import * as fcl from '@onflow/fcl'
import * as t from "@onflow/types"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {getNfts} from '../../../cadence/scripts/getNfts'
import Nft from '@/components/library/Nft'
import panda from '../../assets/panda.png'
import MintedNft from '@/components/library/MintedNft'



export default function Home() {

  const [address, setAddress] = useState(false)
  const [nfts, setNfts] = useState([])
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

  const getUserNfts = async() => {
    try {
      const result = await fcl.send([
        fcl.script(getNfts),
        fcl.args([
          fcl.arg(address, t.Address),
          fcl.arg(address, t.Address)
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
    if (address) {
      getUserNfts()
    }
  }, [address])


  return (
    <div>
      { address != null && address != false ?
      <div className='flex flex-col justify-between items-center py-6 pt-12 px-12'>
        <div className="flex flex-col items-center w-full">
          <h2 className="w-1/2 text-center font-playfair text-[40px] leading-[50px]">
            So what are you waiting for ?
          </h2>
          <h3 className="text-blue-400 w-1/2 text-center font-playfair text-[40px] leading-[75px]">Let's Explore</h3>
        </div>

        {
        update ? 
          <div>{ 
           nfts.length == 0 ? <div className='flex flex-col items-center mt-[60px] mb-[40vh]'><Image src={panda} alt='image' width={220} height={220}/><h2 className='mt-[10px] text-[20px] font-playfair font-semibold'>No Books owned!!</h2></div> : 
           
           <div>
              <Nft nfts={nfts} userAddress={address} /> 

              <MintedNft nfts={nfts} userAddress={address} /> 

            </div>

           }</div> : <></> 
        }
      </div> : 
      <div className='w-screen h-[80vh] flex flex-col justify-center items-center'>
        <Image src={panda} alt='image' width={220} height={220}/><h2 className='mt-[10px] text-[20px] font-playfair font-semibold'>Connect your Wallet</h2>
      </div> }
    </div>
  )
}