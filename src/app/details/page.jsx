'use client'
import * as fcl from '@onflow/fcl'
import * as t from "@onflow/types"
import { listTx } from '../../../cadence/transactions/list'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import AudioPlayer from '@/components/global/AudioPlayer'
import {getCount} from '../../../cadence/scripts/getCount'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const searchParams = useSearchParams()
  const listed = searchParams.get('list') == 'false'
  console.log(listed)
  const userAddress = searchParams.get('userAddress')
  console.log(userAddress)
  const [player, setPlayer] = useState(false)
  const [loader, setLoader] = useState(false)
  const [price, setPrice] = useState(null)
  const [count, setCount] = useState(null)
  const [update, setUpdate] = useState(null)

  const listNft = async() => {
    console.log(price)
    if (price != null) {
        setLoader(true)
        try { 
            const transactionId = await fcl.send([
            fcl.transaction(listTx),
            fcl.args([
            fcl.arg(searchParams.get('id'), t.UInt64),
            fcl.arg(parseFloat(price), t.UFix64)
            ]),
            fcl.payer(fcl.authz),
            fcl.proposer(fcl.authz),
            fcl.authorizations([fcl.authz]),
            fcl.limit(9999)
         ]).then(fcl.decode)

        console.log(transactionId)
        notification()
        setPrice(null)
        setLoader(false)
        return fcl.tx(transactionId).onceSealed()
        } catch(e) {
            setLoader(false)
            console.log(e)
      }
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

  const getCountNft = async() => {
    const result = await fcl.send([
      fcl.script(getCount),
      fcl.args([
        fcl.arg(searchParams.get('id'), t.UInt64)
      ])
    ]).then(fcl.decode)
    console.log(result)
    setCount(result)
    setUpdate(true)
  }

  useEffect(() => {
    getCountNft()
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

            <div className='flex justify-start items-center'>
              <button className='mt-[40px] ml-[30px]' onClick={() => setPlayer(!player)}>
                <div className="relative inline-block px-4 py-[10px] font-medium group">
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black group-hover:border-white"></span>
                <span className="relative text-black font-playfair group-hover:text-white text-[17px] font-semibold">Play Book</span>
                </div>
              </button>
              
              {!listed ?
              <div className='flex justify-center items-center mt-[40px] ml-[30px]'>
                <input className="w-[85%] bg-gray-100 w-[100px] py-2 px-3 text-gray-900 leading-tight border-[3px] border-gray-500 text-[17px] font-playfair focus:border-[3.33px] placeholder-gray-500" placeholder='28.11' type="number" onChange={(e) => setPrice(e.target.value)} />

                <button className='ml-[20px]' onClick={listNft}>
                    <div className="relative inline-block px-4 py-[10px] font-medium group">
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black group-hover:border-white"></span>
                    <span className="relative text-black font-playfair group-hover:text-white text-[17px] font-semibold">Publish</span>
                    </div>
                </button>
              </div> : <div></div>
              }
            </div>
            
            {update && !listed ?
            <p className='text-white font-playfair text-[18px] leading-[20px] mt-[30px] ml-[30px]'>Copies Sold:  {count.length}</p> : <></> }
          </div>
            { player ? 
              <AudioPlayer source={searchParams.get('completeAudio')} thumbnail={searchParams.get('thumbnail')} currentState={player} /> : <></>
            }
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}