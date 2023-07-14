'use client'
import * as fcl from '@onflow/fcl'
import * as t from "@onflow/types"
import { React, useEffect, useState } from 'react'
import logo from '../../assets/zail.png'
import Image from 'next/image'
import Link from 'next/link'
import { getSetup } from '../../../cadence/scripts/getSetup'
import { setupTx } from '../../../cadence/transactions/setup'


fcl.config()
  .put("accessNode.api", "https://access-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

const Navbar = () => {

  const [user, setUser] = useState()
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    fcl.currentUser().subscribe(setUser)
  }, [])

  const handleAuthentication = () => {
    if(user && user.addr) {
      fcl.unauthenticate()
      window.location.replace("/")
    } else {
      setLoader(true)
      fcl.authenticate().then(res => getUserSetup(res.addr))
    } 
  }

  const getUserSetup = async(addr) => {
    console.log(addr)
    localStorage.setItem('user', true)
    try {
      const result = await fcl.send([
        fcl.script(getSetup),
        fcl.args([
          fcl.arg(addr, t.Address),
        ])
      ]).then(fcl.decode)
      console.log(result)
      setLoader(false)
    } catch {
      console.log("need setup")
      setupUser()
    }
  }

  const setupUser = async() => {
    try { 
      const transactionId = await fcl.send([
        fcl.transaction(setupTx),
        fcl.args([]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999)
      ]).then(fcl.decode)

      console.log(transactionId)
      setLoader(false)
      return fcl.tx(transactionId).onceSealed()
      } catch(e) {
      console.log(e)
      setLoader(false)
    }
  }

  return (
    <>
    <div className='z-50 fixed backdrop-blur-sm w-screen h-screen' style={{display: loader ? "block" : "none"}}></div>
    <div className='flex justify-between items-center py-6 pt-8 px-12'>
        <div><Link href="/"><Image src={logo} alt='image' className='md:cursor-pointer h-9 w-36'/></Link></div>

        { user && user.addr ?
          <div className='flex justify-between items-center'>
            <div className='text-[18px] font-semibold font-playfair mx-8'><Link href="/library">Library</Link></div>
            <div className='text-[18px] font-semibold font-playfair mx-8'><Link href="/discover">Discover</Link></div>
            <div className='text-[18px] font-semibold font-playfair mx-8'><Link href="/publish">Publish</Link></div>
          </div> : <div></div>}
        
        <button className='pr-[5px]' onClick={() => handleAuthentication()}>
          <div className="relative inline-block px-4 py-[10px] font-medium group">
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
          <span className="relative text-black font-playfair group-hover:text-white text-[17px] font-semibold">{ user && user.addr ? user.addr : "Connect Wallet"}</span>
          </div>
      </button>
    </div>
    </>
  )
}

export default Navbar