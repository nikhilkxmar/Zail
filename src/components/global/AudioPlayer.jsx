'use client'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import {BsPlayCircle} from 'react-icons/bs'
import {BsPauseCircle} from 'react-icons/bs'
import {BsSkipStartCircle} from 'react-icons/bs'
import {BsSkipEndCircle} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'



const AudioPlayer = (props) => {

  const [playing, SetPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [show, setShow] = useState(props.currentState)

  const audioPlayer = useRef()
  const bar = useRef()
  const animation = useRef()

  const handlePlaying = () => {
    const previousValue = playing
    SetPlaying(!previousValue)
    if (!previousValue) {
        audioPlayer.current.play()
        animation.current = requestAnimationFrame(onPlaying)
    } else {
        audioPlayer.current.pause()
        cancelAnimationFrame(animation.current)
    }
  }

  const changeBar = () => {
    audioPlayer.current.currentTime = bar.current.value 
    setCurrentTime(bar.current.value)
  }

  const onPlaying = () => {
    if (audioPlayer?.current?.currentTime != null) {
    bar.current.value = audioPlayer.current.currentTime
    setCurrentTime(bar.current.value)
    animation.current = requestAnimationFrame(onPlaying)
    }
  }

  const timer = (sec) => {
    const min = Math.floor(sec/60)
    const rmin = min < 10 ? `0${min}`: `${min}`
    const secs = Math.floor(sec%60)
    const rsecs = secs < 10 ? `0${secs}`: `${secs}`
    return `${rmin}:${rsecs}`
  }

  const backward = () => {
    bar.current.value = Number(bar.current.value - 30)
    changeBar()
  }

  const forward = () => {
    bar.current.value = Number(bar.current.value + 30)
    changeBar()
  }

  const handleShow = () => {
    if (playing) {
        audioPlayer.current.pause()
    }
    setShow(!show)
  }

  useEffect(() => {
    setDuration(Math.floor(audioPlayer.current.duration))
    bar.current.max = duration
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  return (
    <div className='px-4 py-4 w-[500px] bg-[#181818] fixed z-10 bottom-[20px] right-[47px] rounded-[7px] player' style={{display: show ? "block" : "none"}}>
        <div className='relative w-[465px] h-[300px] mb-4'>
            <AiOutlineClose className='w-[25px] h-[25px] absolute top-[10px] z-50 right-[8px] rounded-full bg-[#181818] cursor-pointer text-gray-600' onClick={handleShow}/>
            <Image src={props.thumbnail} alt='image' fill className='object-cover rounded-[7px]'/>
        </div>

        <audio ref={audioPlayer} src={props.source} preload='metadata'></audio>

        <div className='flex justify-center items-center mb-6'>
            <div className='text-gray-600'>{timer(currentTime)}</div>

            <input type="range" ref={bar} defaultValue={0} class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer mx-2" onChange={changeBar} />

            <div className='text-gray-600'>{(duration && !isNaN(duration)) && timer(duration)}</div>
        </div>

        <div className='flex justify-center items-center'>
            <button onClick={backward}><BsSkipStartCircle className='w-[30px] h-[30px] text-gray-600'/></button>

            <button className='mx-[15px]' onClick={() => handlePlaying()}>
                {playing ? <BsPauseCircle className='w-[40px] h-[40px] text-gray-600'/>  : <BsPlayCircle className='w-[40px] h-[40px] text-gray-600'/>}
            </button>

            <button onClick={forward}><BsSkipEndCircle className='w-[30px] h-[30px] text-gray-600'/></button>
        </div>

    </div>
  )
}

export default AudioPlayer