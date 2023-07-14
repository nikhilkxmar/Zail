'use client'
import * as fcl from '@onflow/fcl'
import * as t from "@onflow/types"
import { useEffect, useState } from 'react'
import {getNfts} from '../../../cadence/scripts/getNfts'

const GetNfts = (props) => {

  const [nfts, setNfts] = useState([])

  useEffect(() => {
    getUserNfts()
  }, [])

  const getUserNfts = async() => {
    try {
      const result = await fcl.send([
        fcl.script(getNfts),
        fcl.args([
          fcl.arg(props.search, t.Address),
          fcl.arg(props.address, t.Address)
        ])
      ]).then(fcl.decode)

      console.log(result)
      setNfts(result)
    } catch(e) {
      setNfts(null)
    }
  }

  return (
    <div>
      { nfts == null ? <div>This account does not exist</div> : nfts == [] ? <div>No posts yet!</div> :

      nfts.map(nft => (
        <div key={nft.id} className='bg-blue-100 p-4 text-center rounded-[7px] my-4'>
          <h1>{nft.id}</h1>
          <h1>{nft.category}</h1>
          <h1>{nft.title}</h1>
          <h1>{nft.summary}</h1>
          <h1>{nft.thumbnail}</h1>
          <h1>{nft.author}</h1>
          <h1>{nft.restrictedAudio}</h1>
          <h1>{nft.completeAudio}</h1>
        </div>
      ))
    }
    </div>
  )
}

export default GetNfts