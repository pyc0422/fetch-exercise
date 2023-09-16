'use client'
import { logOut } from "@/utils/server"
import { useAppContext } from "./AppContext"
import Image from "next/image"
import { Dog } from "@/utils/pototype"
import {GiHamburgerMenu} from "react-icons/gi"
import { useState } from "react"

export default function Header ({Ids, dogs}:{Ids:string[], dogs:Array<Dog>}) {
  const {user, setUser, activeTab, setTab} = useAppContext()
  const [menu, toggleMenu] = useState(false)
  // const [displaySaved, toggleSaved] = useState(false)

  const handleLogOut = () => {
    if (user) {
      return logOut({name: user.name, email: user.email})
      .then((res) => {
        setUser({name:"", email:"", login:false, dogs:[], saved:[]})
      })
    }
  }

  return (
    <div className="border-1 top-0 bg-[#fdccce] fixed m-[-16px -20px 0px -20px] w-screen h-24 flex flex-col justify-center items-evenly shadow-md">
      <div
        className="flex flex-row justify-between font-medium text-slate-700 px-4 sm:px-16 items-center"
      >
        <div className=" flex flex-row justify-center items-center">
          <div className="flex flex-col items-baseline">
            <Image src="/logo-1.png" alt="small logo" className="mr-2 " width={50} height={50} />
            <Image src="/slogan.png" alt="slogan" width={120} height={5}/>
          </div>
          <div className="capitalize"> Hi, <strong>{user.name}</strong></div>
        </div>
        <div className="sm:hidden overflow-hidden">
          <button onClick={() => toggleMenu(!menu)} className="">
            <GiHamburgerMenu />
          </button>
        </div>
        <div className={!menu ? "hidden" : "sm:hidden absolute top-14 right-0 block min-w-[110px] bg-slate-50/75 shadow-md"}>
            {["filter", 'saved', 'adopt'].map((btn,i) =>
            <div key={i} className={activeTab === `tab-${btn}` ? "menu_active menu_btn" : "menu_btn"}>
              <a
                onClick={() => {setTab(`tab-${btn}`); toggleMenu(false);}}
                className="p-4"
              >{btn}</a>
            </div>
            )}
            <div className="menu_btn">
            <a onClick={handleLogOut} className="p-4">Log Out</a>
            </div>
          </div>
        <div className="max-[640px]:hidden w-1/2 flex flex-row justify-between n">
        {["filter", 'saved', 'adopt'].map((btn,i) =>
            <a
              key={i}
              className={activeTab === `tab-${btn}`? 'border-b-4 active_tab':'active_tab nav_hover'}
             >
             <button className="btn" onClick={() => setTab(`tab-${btn}`)}>
               {btn}
             </button>
           </a>
          )}

        </div>
        <a className={ 'active_tab'}>
          <button
           className="btn max-[640px]:hidden bg-rose-400 text-white/80 hover:bg-rose-300 hover:text-white"
           onClick={handleLogOut}
          >
            log out
          </button>
        </a>
      </div>
    </div>
  )
}