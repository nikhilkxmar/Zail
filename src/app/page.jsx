import Navbar from "@/components/navigation/Navbar"
import Hero from "@/components/home/Hero"
import QuickStart from "@/components/home/QuickStart"
import Scroller from "@/components/home/Scroller"
import Content from "@/components/home/Content"
import Footer from "@/components/home/Footer"

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <QuickStart />
      <Scroller />
      <Content />
      <Footer />
    </div>
  )
}