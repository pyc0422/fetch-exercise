'use client'
import { logOut } from "@/utils/server"
import { useAppContext } from "./AppContext"

export default function LogOut () {
  const {user, setUser} = useAppContext()

  const handleLogOut = () => {
    if (user) {
      return logOut({name: user.name, email: user.email})
      .then((res) => {
        setUser({name:"", email:"", login:false})
      })
    }

  }
  return (
    <div className="mt-4 mb-8 flex justify-evenly">
      <div>Hi, {user.name.toUpperCase()}</div>
     <button className="text-xs rounded border border-1 border-gray-400 px-4 hover:opacity-80" onClick={handleLogOut}>Log Out</button>
    </div>
  )
}