import Image from "next/image"
import { Dog } from "@/utils/pototype"
import Swal from "sweetalert2"
import { useAppContext } from "./AppContext"
import { FaHeart } from "react-icons/fa"
import { useEffect, useState } from "react"
const heart_style="absolute top-0 right-0 p-2 h-10 w-10"
export default function Card ({dog, heart, click}: {dog:Dog, heart?:boolean, click:boolean}) {
  const {user, setUser} = useAppContext()
  const [isLike, toggleLike] = useState(false)
  useEffect(() => {
    if (user.saved.filter(item => item.name === dog.name).length > 0) {
      toggleLike(true)
    } else {
      toggleLike(false)
    }
  }, [dog])
  const handleDogClick = () => {
    Swal.fire({
      imageUrl:dog.img,
      imageHeight:500,
      html: `<div className="text-sm">${dog.name} is a ${dog.age} year old ${dog.breed} lives around ${dog.zip_code}</div>`,
      imageAlt:dog.name+' image',
      showCancelButton: true,
      showConfirmButton:click,
      confirmButtonText:'Adopt',
      showDenyButton: isLike,
      denyButtonText:'Unsaved',
      cancelButtonText:'Back'
    }).then((result)=>{
      console.log(result)
      if (result.isConfirmed) {
        const dogSet = new Set(user.dogs)
        if (dogSet.has(dog)) {
          Swal.fire({
            icon:"warning",
            title:"Awww",
            text:"You already adopted this dog!"
          })
        } else {
          setUser({...user, dogs:user.dogs.concat(dog), saved:user.saved.filter(cur => cur.id !== dog.id)})
          return 'adopted'
        }
      } else if (result.isDenied){
        console.log('denied')
        setUser({...user, saved: user.saved.filter(item => item.id !== dog.id)})
        return 'delete'
      }
    })
    .then((res) => {
      if (res === 'adopted') {
        Swal.fire(`Adopted ${dog.name.toUpperCase()} successfully!`, "", "success")
      } else if (res === 'delete') {
        toggleLike(false)
        Swal.fire(`Removed ${dog.name.toUpperCase()} successfully!`, "", "success")
      }

    })
  }

  const toggleSaved = () =>{
    if (!isLike) {
      setUser({...user, saved:user.saved.concat(dog)})
    } else {
      setUser({...user, saved: user.saved.filter(item => item.id !== dog.id)})
    }
    toggleLike(!isLike)
  }
  return (
    <div
     className="bg-black/10  h-72 w-56 m-2 border hover:ring-2 active:ring-secondary rounded-lg shadow-md"
    >
      <div onClick={handleDogClick} className="flex item-center justify-center w-56 h-40 mb-2 border-b-2">
       <Image alt={dog.name +'image'} src={dog.img} width={50} height={50} style={{width:"100%", height:"auto", objectFit:"contain"}} className="border rounded"/>
      </div>
      <ul className="relative px-2 mt-4">
      {heart === false ? null : <FaHeart
      className={isLike ? 'text-rose-500 '+ heart_style:'text-white '+heart_style}
      onClick={toggleSaved}
      />}
        <li><strong>Name:</strong> {dog.name}</li>
        <li><strong>Age: </strong>{dog.age}</li>
        <li><strong>Breed: </strong>{dog.breed}</li>
        <li><strong>Zip Code:</strong> {dog.zip_code}</li>
      </ul>

    </div>
  )
}