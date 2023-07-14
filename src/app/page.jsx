import Hero from "@/components/home/Hero"
import QuickStart from "@/components/home/QuickStart"
import Scroller from "@/components/home/Scroller"
import Content from "@/components/home/Content"

export default function Home() {
  return (
    <div>
      <Hero />
      <QuickStart />
      <Scroller />
      <Content />
    </div>
  )
}