import Navbar from "@/components/navigation/Navbar"
import SearchBar from "@/components/discover/SearchBar"

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className='flex flex-col justify-between items-center py-6 pt-8 px-12'>
        <div className="flex flex-col items-center w-full">
          <h2 className="w-1/2 text-center font-playfair text-[40px] leading-[50px]">
            So what are you waiting for ?
          </h2>
          <h3 className="text-blue-400 w-1/2 text-center font-playfair text-[40px] leading-[75px]">Let's Explore</h3>
        </div>
        <SearchBar />
      </div>

    </div>
  )
}