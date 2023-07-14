'use client'
import * as t from "@onflow/types"
import * as fcl from '@onflow/fcl'
import Image from 'next/image'
import { React, useState, useRef, useEffect } from 'react'
import { uploadFileToIPFS } from '../../app/api/pinata'
import {mint} from '../../../cadence/transactions/mint'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import panda from '../../assets/panda.png'



fcl.config()
  .put("accessNode.api", "https://access-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")


const Form = () => {

  const [formParams, updateFormParams] = useState({ 
    category: '', 
    title: '', 
    description: '', 
    author: '',
    narrator: ''
  })

  const [message, updateMessage] = useState('')
  const [restrictedAudioURL, setrestrictedAudioURL] = useState(null)
  const [audioURL, setAudioURL] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [image, setImage] = useState() 
  const [update, setUpdate] = useState(false)
  const [loader, setLoader] = useState(false)
  const [address, setAddress] = useState(false)
  const [thumbnailPreview, setThumbnailPreview] = useState() 
  const thumbnailRef = useRef()


    async function disableButton() {
        const listButton = document.getElementById("list-button")
        listButton.disabled = true
        listButton.style.backgroundColor = "grey";
        listButton.style.opacity = 0.3
    }

    async function enableButton() {
        const listButton = document.getElementById("list-button")
        listButton.disabled = false
        listButton.style.backgroundColor = "#A500FF";
        listButton.style.opacity = 1
    }


    async function listNFT(e) {
        e.preventDefault();
        const {category, title, description, author, narrator} = formParams;
        if( !category || !title || !description || !thumbnail || !restrictedAudioURL || !audioURL || !author || !narrator)
        {
            updateMessage("Please fill all the fields!")
            return -1;
        }

        const nftJSON = {
            category, title, description, author, narrator, thumbnail: thumbnail, restrictedAudio: restrictedAudioURL, completeAudio: audioURL
        }

        console.log("inside list")

        try {    
            disableButton();
            updateMessage("Minting...")
            console.log("Minting...")
            console.log(nftJSON)

            await mintNFT(nftJSON)
            handleSuccess()

            } catch(e) {
              alert( "Mint error" + e )           
        }
    }

    const handleSuccess = async function () {
        setUpdate(false)
        enableButton()
        updateMessage("")
        updateFormParams({category: '', 
                          title: '', 
                          description: '', 
                          author: '',
                          narrator: ''})
        setThumbnail(null)
        setrestrictedAudioURL(null)
        setAudioURL(null)
        notification()
        setLoader(false)
    }

    async function uploadThumbnail(e) {
        var file = e.target.files[0]
        if (file) {
            setImage(file)
            try {
                disableButton()
                updateMessage("Uploading Thumbnail")
                const response = await uploadFileToIPFS(file);
                if(response.success === true) {
                    enableButton();
                    localStorage.removeItem("config")
                    updateMessage("")
                    console.log("Uploaded IMAGE to Pinata: ", response.pinataURL)
                    setThumbnail(response.pinataURL);
                }
            }
            catch(e) {
                console.log("Error during file upload", e);
            } 
        } else {
            setImage(null)
        }
    }

    async function uploadRestrictedAudio(e) {
        var file = e.target.files[0];
        try {
            disableButton()
            updateMessage("Uploading Sample Audio")
            const response = await uploadFileToIPFS(file);
            if(response.success === true) {
                enableButton();
                localStorage.removeItem("config")
                updateMessage("")
                console.log("Uploaded Restricted audio to Pinata: ", response.pinataURL)
                setrestrictedAudioURL(response.pinataURL);
            }
        }
        catch(e) {
            console.log("Error during file upload", e);
        }
    }

    async function uploadCompleteAudio(e) {
        var file = e.target.files[0];
        try {
            disableButton()
            updateMessage("Uploading Complete Audio")
            const response = await uploadFileToIPFS(file);
            if(response.success === true) {
                enableButton();
                localStorage.removeItem("config")
                updateMessage("")
                console.log("Uploaded audio to Pinata: ", response.pinataURL)
                setAudioURL(response.pinataURL);
            }
        }
        catch(e) {
            console.log("Error during file upload", e);
        }
    }

    const mintNFT = async (nft) => {
    setLoader(true)
    try { 
      const transactionId = await fcl.send([
        fcl.transaction(mint),
        fcl.args([
          fcl.arg(nft.category, t.String),
          fcl.arg(nft.title, t.String),
          fcl.arg(nft.description, t.String),
          fcl.arg(nft.thumbnail, t.String),
          fcl.arg(nft.author, t.String),
          fcl.arg(nft.narrator, t.String),
          fcl.arg(nft.restrictedAudio, t.String),
          fcl.arg(nft.completeAudio, t.String),
        ]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999)
      ]).then(fcl.decode)

      console.log(transactionId)
      return fcl.tx(transactionId).onceSealed()
    } catch(e) {
      setLoader(false)
      console.log(e)
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

    const userAddress = async() => {
    try {
        const currentUser = await fcl.currentUser.snapshot().then(res => res.addr)
        console.log("The Current User", currentUser)
        setAddress(currentUser)
        setUpdate(true)
        }  catch(e) {
        console.log(currentUser)
        setAddress(null)
        }
    }

    useEffect(() => {
        if(image) {
            const reader = new FileReader()
            reader.onloadend = () => {
            setThumbnailPreview(reader.result)
            }
            reader.readAsDataURL(image)
        } else {
            setThumbnailPreview(null)
        }
        userAddress()
    }, [image])


  return (
    <>
    <div className='z-50 fixed top-[0px] backdrop-blur-sm w-screen h-screen' style={{display: loader ? "block" : "none"}}></div>
    { address != null && address != false ?
    <div className='bg-gray-100 border-4 my-4 mt-12 shadow-xl border-gray-700 rounded-[7px] w-full'>
        <form className="bg-gray-50 px-8 pt-6 pb-12 w-full h-full">
            <div className="flex justify-between items-center w-full">
                <div className="w-[48%]">
                    <div className="mb-8">
                        <label className="my-4 block text-[18px] font-playfair font-semibold" htmlFor="title">Title</label>
                        <input className="w-[85%] bg-gray-100 w-full py-2 px-3 text-gray-900 leading-tight border-[3px] border-gray-500 text-[17px] font-playfair focus:border-[3.33px]" id="title" type="text" onChange={e => updateFormParams({...formParams, title: e.target.value})} value={formParams.title}></input>
                    </div>

                    <div className="mb-8">
                        <label className="my-4 block text-[18px] font-playfair font-semibold" htmlFor="author">Author</label>
                        <input className="w-[85%] bg-gray-100 w-full py-2 px-3 text-gray-900 leading-tight border-[3px] border-gray-500 text-[17px] font-playfair focus:border-[3.33px]" id="author" type="text" onChange={e => updateFormParams({...formParams, author: e.target.value})} value={formParams.author}></input>
                    </div>

                    <div className="mb-8">
                        <label className="my-4 block text-[18px] font-playfair font-semibold" htmlFor="narrator">Narrator</label>
                        <input className="w-[85%] bg-gray-100 w-full py-2 px-3 text-gray-900 leading-tight border-[3px] border-gray-500 text-[17px] font-playfair focus:border-[3.33px]" id="narrator" type="text" onChange={e => updateFormParams({...formParams, narrator: e.target.value})} value={formParams.narrator}></input>
                    </div>
                </div>

                <div className="my-4 w-[47%] bg-gray-500 h-[333px] relative">
                    {thumbnailPreview ? <Image src={thumbnailPreview} alt='image' fill className='object-cover border-[3px] border-gray-900' onClick={() => setImage(null)}/> :
                    <button className="relative w-full h-full px-6 py-3 font-playfair font-semibold text-black group" 
                    onClick={(e) => {
                        e.preventDefault()
                        thumbnailRef.current.click()}}>
                    <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-gray-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                    <span className="absolute inset-0 w-full h-full border-[3.33px] border-black"></span>
                    <span className="relative text-[17px]">Add Cover Image</span>
                    </button>}

                    <input type={"file"} accept="image/*" onChange={uploadThumbnail} ref={thumbnailRef} className='hidden' />
                </div>
            </div>

            <div className="mt-[60px] flex flex-col items-center">
                <h2 className="text-center block text-[22px] font-playfair font-semibold">Choose a category</h2>
                <div className='w-[70%] flex justify-center items-center my-6 mt-8 flex-wrap'>
                    <div>
                    <input type="radio" id='radio_1' className='hidden' name='radio' value="Fiction" onChange={e => updateFormParams({...formParams, category: e.target.value})}/>
                    <label htmlFor="radio_1" className='flex flex-col h-12 w-28 border-[2px] border-gray-500 cursor-pointer justify-center items-center text-sm mx-4 my-4 font-playfair font-semibold text-[17px]'>Fiction</label>
                    </div>
                    <div>
                    <input type="radio" id='radio_2' className='hidden' name='radio' value="Non-fiction" onChange={e => updateFormParams({...formParams, category: e.target.value})}/>
                    <label htmlFor="radio_2" className='flex flex-col h-12 w-28 border-[2px] border-gray-500 cursor-pointer justify-center items-center text-sm mx-4 my-4 font-playfair font-semibold text-[17px]'>Non-fiction</label>
                    </div>
                    <div>
                    <input type="radio" id='radio_3' className='hidden' name='radio' value="Self-help" onChange={e => updateFormParams({...formParams, category: e.target.value})}/>
                    <label htmlFor="radio_3" className='flex flex-col h-12 w-28 border-[2px] border-gray-500 cursor-pointer justify-center items-center text-sm mx-4 my-4 font-playfair font-semibold text-[17px]'>Self-help</label>
                    </div>
                    <div>
                    <input type="radio" id='radio_4' className='hidden' name='radio' value="Educational" onChange={e => updateFormParams({...formParams, category: e.target.value})}/>
                    <label htmlFor="radio_4" className='flex flex-col h-12 w-28 border-[2px] border-gray-500 cursor-pointer justify-center items-center text-sm mx-4 my-4 font-playfair font-semibold text-[17px]'>Educational</label>
                    </div>
                    <div>
                    <input type="radio" id='radio_5' className='hidden' name='radio' value="Mystery" onChange={e => updateFormParams({...formParams, category: e.target.value})}/>
                    <label htmlFor="radio_5" className='flex flex-col h-12 w-28 border-[2px] border-gray-500 cursor-pointer justify-center items-center text-sm mx-4 my-4 font-playfair font-semibold text-[17px]'>Mystery</label>
                    </div>
                    <div>
                    <input type="radio" id='radio_6' className='hidden' name='radio' value="Romance" onChange={e => updateFormParams({...formParams, category: e.target.value})}/>
                    <label htmlFor="radio_6" className='flex flex-col h-12 w-28 border-[2px] border-gray-500 cursor-pointer justify-center items-center text-sm mx-4 my-4 font-playfair font-semibold text-[17px]'>Romance</label>
                    </div>
                    <div>
                    <input type="radio" id='radio_7' className='hidden' name='radio' value="Poetry" onChange={e => updateFormParams({...formParams, category: e.target.value})}/>
                    <label htmlFor="radio_7" className='flex flex-col h-12 w-28 border-[2px] border-gray-500 cursor-pointer justify-center items-center text-sm mx-4 my-4 font-playfair font-semibold text-[17px]'>Poetry</label>
                    </div>
                    <div>
                    <input type="radio" id='radio_8' className='hidden' name='radio' value="Fantasy" onChange={e => updateFormParams({...formParams, category: e.target.value})}/>
                    <label htmlFor="radio_8" className='flex flex-col h-12 w-28 border-[2px] border-gray-500 cursor-pointer justify-center items-center text-sm mx-4 my-4 font-playfair font-semibold text-[17px]'>Fantasy</label>
                    </div>
                    <div>
                    <input type="radio" id='radio_9' className='hidden' name='radio' value="Other" onChange={e => updateFormParams({...formParams, category: e.target.value})}/>
                    <label htmlFor="radio_9" className='flex flex-col h-12 w-28 border-[2px] border-gray-500 cursor-pointer justify-center items-center text-sm mx-4 my-4 font-playfair font-semibold text-[17px]'>Other</label>
                    </div>
                </div>
            </div>

            <div className="mt-[60px] flex flex-col items-center">
                <h2 className="text-center block text-[22px] font-playfair font-semibold">Give us a summary</h2>
                <textarea className="mt-8 bg-gray-100 text-gray-900 leading-tight border-[3px] border-gray-500 text-[19px] font-playfair focus:border-[3.33px] py-2 px-3 focus:border-gray-700 w-[85%]" cols="40" rows="10" id="description" type="text" placeholder="" value={formParams.description} onChange={e => updateFormParams({...formParams, description: e.target.value})}></textarea>
            </div>

            <div className="my-[50px] flex justify-center">
                <div className='mt-4 flex justify-center items-center mx-12'>
                    <label className="m-4 block text-[18px] font-playfair font-semibold" >Sample Audio</label>
                    <input type={"file"} accept=".mp3" onChange={uploadRestrictedAudio} className=' file:bg-black file:px-4 file:py-2 file:m-2 file:border-none file:text-gray-100 file:cursor-pointer bg-gray-100 text-gray-600 cursor-pointer bg-gray-200 border-[2.2px] border-gray-900' />
                </div>

                <div className='mt-4 flex justify-center items-center mx-12'>
                    <label className="m-4 block text-[18px] font-playfair font-semibold" >Complete Audio</label>
                    <input type={"file"} accept=".mp3" onChange={uploadCompleteAudio} className=' file:bg-black file:px-4 file:py-2 file:m-2 file:border-none file:text-gray-100 file:cursor-pointer bg-gray-100 text-gray-600 cursor-pointer bg-gray-200 border-[2.2px] border-gray-900' />
                </div>
            </div>

            <div className="flex justify-center">
                <div className="w-[85%] mt-[70px] text-violet-500 text-center bg-gray-200 rounded-md text-[19px] font-playfair font-semibold">
                    {message}
                </div>
            </div>

            <div className='flex justify-center mt-[70px]'>
                <button id="list-button" onClick={listNFT} >
                    <div className="relative inline-block px-[30px] py-[15px] font-medium group">
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                    <span className="relative text-black font-playfair group-hover:text-white text-[17px] font-semibold">
                        {
                        update ? 
                            (<div>MINT NFT</div>) : (<div>UPLOAD</div>)
                        }  
                    </span>
                    </div>
                </button>
            </div>
        </form>
        <ToastContainer />
    </div> : <div className='w-screen h-[80vh] flex flex-col justify-center items-center'>
        <Image src={panda} alt='image' width={220} height={220}/><h2 className='mt-[10px] text-[20px] font-playfair font-semibold'>Connect your Wallet</h2>
      </div>}
    </>
  )
}

export default Form