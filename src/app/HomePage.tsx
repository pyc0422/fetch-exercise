import LogIn from "../Components/Login"
import Image from "next/image"
export default function HomePage () {
  return (
    <div className="pt-10 sm:pt-0 w-screen h-screen homepage sm:top-0 sm:flex sm:justify-center">
      <div className="flex flex-col sm:flex-row justify-center sm:justify-evenly items-center">
        <div className="sm:pl-10 flex flex-col items-center justify-center">
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