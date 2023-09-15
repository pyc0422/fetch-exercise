import LogIn from "./Login"
import Image from "next/image"
export default function HomePage () {
  return (
    <div className="w-screen h-screen homepage top-0 flex justify-center">
      <div className="flex flex-row justify-evenly items-center">
        <div className="flex flex-col items-center">
          <Image src="/logo.png" alt="logo" width={300} height={50}/>
          <LogIn />
        </div>
        <div className="md:self-end">
        <Image
         src="/dog.png"
         alt="dog"
         priority
         width={700}
         height={900}

         />
        </div>


      </div>
    </div>
  )
  }