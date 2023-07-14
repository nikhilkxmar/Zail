'use client'
import * as fcl from '@onflow/fcl'
import * as t from "@onflow/types"
import { buyTx } from '../../../cadence/transactions/buy'
import {getPurchased} from '../../../cadence/scripts/getPurchased'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import AudioPlayer from '@/components/global/AudioPlayer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const searchParams = useSearchParams()
  console.log(searchParams.get('id'))
  console.log(searchParams.get('userAddress'))
  const [player, setPlayer] = useState(false)
  const [loader, setLoader] = useState(false)
  const [update, setUpdate] = useState(false)
  const [purchased, setPurchased] = useState(false)

  const buyNft = async() => {
    try { 
      setLoader(true)
      const transactionId = await fcl.send([
        fcl.transaction(buyTx),
        fcl.args([
          fcl.arg(searchParams.get('searchAddress'), t.Address),
          fcl.arg(searchParams.get('id'), t.UInt64),
        ]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999)
      ]).then(fcl.decode)

      console.log(transactionId)
      notification()
      setLoader(false)
      setTimeout(() => {
        window.location.replace("/library")
      }, 3000)
      return fcl.tx(transactionId).onceSealed()
      } catch(e) {
        setLoader(false)
        console.log(e)
    }
  }

  const getPurchasedTx = async() => {
    const result = await fcl.send([
      fcl.script(getPurchased),
      fcl.args([
        fcl.arg(searchParams.get('userAddress'), t.Address),
        fcl.arg(searchParams.get('id'), t.UInt64),
      ])
    ]).then(fcl.decode)
    setPurchased(result)
    console.log(result)
    if (purchased) {
      setUpdate(true)
    } else {
      setUpdate(false)
    }
  }

  const notification = () => {
    toast.success('Transaction Successful', {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  useEffect(() => {
    getPurchasedTx()
  }, [])

  return ( 
    <div>
      <div className='z-50 fixed top-[0px] backdrop-blur-sm w-screen h-screen' style={{display: loader ? "block" : "none"}}></div>
      <div className='flex flex-col justify-between items-center mx-12 relative'>
        <div className='w-full h-full'>
          <Image src={searchParams.get('thumbnail')} alt='image' fill className='object-cover absolute z-[-1] rounded-[7px]'/>

          <div className='w-[60%] h-full bg-black py-[50px] px-[30px] opacity-90 rounded-[7px]'>
            <div className='flex justify-start'>
              <p className='text-white font-playfair text-[16px] leading-[20px] ml-[30px] px-[10px] py-[4px] bg-gray-800 rounded-full'>{searchParams.get('category')}</p>
            </div>

            <h2 className='w-[80%] text-white font-playfair text-[40px] leading-[45px] mt-[20px] ml-[30px]'>{searchParams.get('title')}</h2>

            <p className='text-white font-playfair mt-[70px] text-[18px] leading-[20px]        ml-[30px]'>{searchParams.get('summary')}</p>

            <p className='text-white font-playfair text-[18px] leading-[20px] mt-[40px] ml-[30px]'>Author: {searchParams.get('author')}</p>

            <p className='text-white font-playfair text-[18px] leading-[20px] mt-[20px] ml-[30px]'>Narrator: {searchParams.get('narrator')}</p>

            <p className='text-white font-playfair text-[18px] leading-[20px] mt-[20px] ml-[30px]'>Price: {searchParams.get('price')}</p>

            <div className='flex justify-start items-center'>
              {purchased == false ?
              <button className='mt-[40px] ml-[30px]' onClick={() => buyNft()}>
                <div className="relative inline-block px-4 py-[10px] font-medium group">
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black group-hover:border-white"></span>
                <span className="relative text-black font-playfair group-hover:text-white text-[17px] font-semibold">Purchase</span>
                </div>
              </button> :
              
              <button className='mt-[40px] ml-[30px]'>
                <Link  href={"/library"}>
                <div className="relative inline-block px-4 py-[10px] font-medium group">
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black group-hover:border-white"></span>
                <span className="relative text-black font-playfair group-hover:text-white text-[17px] font-semibold">Go to Library</span>
                </div>
                </Link>
              </button>
              }

              {purchased == false ?
              <button className='mt-[40px] ml-[30px]' onClick={() => setPlayer(!player)}>
                <div className="relative inline-block px-4 py-[10px] font-medium group">
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black group-hover:border-white"></span>
                <span className="relative text-black font-playfair group-hover:text-white text-[17px] font-semibold">Play sample</span>
                </div>
              </button> : <></>
              }
            </div>
          </div>
            { player ? 
              <AudioPlayer source={searchParams.get('restrictedAudio')} thumbnail={searchParams.get('thumbnail')} currentState={player} /> : <></>
            }
        </div>
      </div> : <></>
      <ToastContainer />
    </div>
  )
}