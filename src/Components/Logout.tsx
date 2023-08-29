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
    <div className="m-2">
     <button className="border border-1 border-primary px-4 py-2 hover:opacity-80" onClick={handleLogOut}>Log Out</button>
    </div>
  )
}