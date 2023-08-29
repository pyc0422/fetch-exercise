"use client"
import LogIn from "@/Components/Login";
import Search from "@/Components/Search";
import { useAppContext } from "@/Components/AppContext";
export default function Home() {
  let { user } = useAppContext()
  switch (user.login) {
    case false:
      return <LogIn />
    case true:
      return <Search />
    default:
      return <LogIn />
  }

}
