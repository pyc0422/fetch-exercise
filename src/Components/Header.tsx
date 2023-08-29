'use client'
import { logOut } from "@/utils/server"
import { useAppContext } from "./AppContext"
import Button from "./Button"
import Swal from "sweetalert2"
import { Dog } from "@/utils/pototype"
import { useState } from "react"
import MatchDog from "./MatchDog"
export default function Header ({Ids, dogs}:{Ids:string[], dogs:Array<Dog>}) {
  const {user, setUser} = useAppContext()
  const [dispalySaved, toggleSaved] = useState(false)
  const handleDogClick = (dog:Dog) => {
    Swal.fire({
      imageUrl:dog.img,
      imageHeight:500,
      html: `<div className="text-sm">${dog.name} is a ${dog.age} year old ${dog.breed} lives around ${dog.zip_code}</div>`,
      imageAlt:dog.name+' image',
      showCancelButton:true,
      confirmButtonText:'Adopt',
      showDenyButton:true,
      denyButtonText:'Unsave',
    }).then((result)=>{
      if (result.isConfirmed) {
        console.log(user)
        setUser({...user, dogs:user.dogs.concat(dog)})
        return 'adopted'
      } else if (result.isDenied) {
        console.log(user)
        setUser({...user, saved:user.saved.filter(item => item.id !== dog.id)})
        return 'moved'
      }
    })
    .then((res) => {
      if (res) {
        Swal.fire(`${res.toUpperCase()}!`, "", "success")
      }

    })
  }
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

  const toggleSavedList = () => {
    toggleSaved(!dispalySaved)
  }
  return (
    <div className="mt-4 mb-8 flex flex-col">
      <div className="flex justify-evenly">
        <div>Hi, {user.name.toUpperCase()}</div>
        <Button text="Saved" onClick={toggleSavedList} />
        <Button text="your dogs" onClick={toggleDogList}/>

        <Button text="log out" onClick={handleLogOut} />
      </div>
      <div>
      {dispalySaved ?
      <div className="mx-6 w-3/4 text-sm flex justify-center items-center">
        <div className="m-4 p-2 flex flex-col items-center border borede-1 w-max min-h-fit h-100">
          <div className="text-right" onClick={() => toggleSaved(false)}>
            <span className="text-xs cursor-pointer self-right">X</span>
          </div>
          <div className="flex flex-row">
          { !user.saved.length? <h1>{"You haven't save any dog yet."}</h1> : user.saved.map(dog =>
          <li
          className="mx-2 my-1 text-accent underline cursor-pointer hover:no-underline"
          key={dog.id}
          onClick={()=>handleDogClick(dog)}>{dog.name}</li>) }
          </div>
          <MatchDog dogs={user.saved} text="Pick one of my saved dogs"/>
        </div>

      </div>
        : null}
      </div>

    </div>
  )
}