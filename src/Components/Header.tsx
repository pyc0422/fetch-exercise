'use client'
import { logOut } from "@/utils/server"
import { useAppContext } from "./AppContext"
import Button from "./Elements/Button"
import Swal from "sweetalert2"
import { Dog } from "@/utils/pototype"
import { useState } from "react"
import MatchDog from "./MatchDog"
export default function Header ({Ids, dogs}:{Ids:string[], dogs:Array<Dog>}) {
  const {user, setUser, activeTab, setTab} = useAppContext()
  // const [displaySaved, toggleSaved] = useState(false)

  const handleLogOut = () => {
    if (user) {
      return logOut({name: user.name, email: user.email})
      .then((res) => {
        setUser({name:"", email:"", login:false, dogs:[], saved:[]})
      })
    }
  }
  const toggleDogList = () => {
    const htmlStr = user.dogs.map((dog,i) => {
      return (
        `<li>${dog.name} Age: ${dog.age}</li>`
      )
    })
    Swal.fire({
      title:'You adopted dog list',
      html:`<ul>${htmlStr}</ul>`
    })
  }

  return (
    <div className="fixed top-0 p-2 border-1 bg-[#fdccce] w-screen h-24 flex flex-col justify-center items-evenly">
      <div
        className="flex flex-row font-medium text-slate-700 justify-evenly items-center"
      >
        <div className="capitalize">
          Hi, <strong>{user.name}</strong>
        </div>
        {["filter", 'saved', 'adopt'].map((btn,i) =>
          <Button
            key={i}
            text={btn}
            id={btn}
            control={`tab-${btn}`}
            active={activeTab === `tab-${btn}`}
            onClick={() => setTab(`tab-${btn}`)}
            />
          )}
        <MatchDog />
        <Button text="log out" onClick={handleLogOut} class="bg-rose-400 text-white/80"/>
      </div>
    </div>
  )
}