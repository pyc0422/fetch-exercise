"use client"
import HomePage from "@/app/HomePage";
import Search from "@/app/Search";
import { useAppContext } from "@/Components/AppContext";
export default function Home() {
  const { user } = useAppContext()
  switch (user.login) {
    case false:
      return <HomePage />
    case true:
      return <Search />
    default:
      return <HomePage />
  }

}
