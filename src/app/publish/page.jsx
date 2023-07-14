import Form from "@/components/publish/Form"
import GettingStarted from "@/components/publish/GettingStarted"

export default function Home() {
  return (
    <div>
      <div className='flex flex-col justify-between items-center px-12'>
        <GettingStarted/>
        <Form />
      </div>
    </div>
  )
}