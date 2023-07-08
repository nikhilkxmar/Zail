import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'

const SearchBar = () => {
  return (
    <div className='w-full flex justify-center items-center py-6 pt-8 px-12'>

        <form action="#" className='w-1/2'>
            <div className='relative flex items-center border-none text-gray-400 focus-within:text-gray-800'>
                <AiOutlineSearch className='w-5 h-5 absolute ml-3 pointer-events-none'/>

                <input type="text" name='searchBar' placeholder='Search Author' autoComplete='off' className='pr-3 pl-14 py-2 font-semibold font-playfair placeholder-gray-500 text-gray-800 border-none ring-2 ring-gray-500 focus:ring-gray-800 w-full' />
            </div>
        </form>

    </div>
  )
}

export default SearchBar