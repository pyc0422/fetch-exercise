import Image from "next/image"
import { Dog } from "@/utils/pototype"
import Swal from "sweetalert2"
import { useAppContext } from "./AppContext"
export default function Card ({dog}: {dog:Dog}) {
  const {user, setUser} = useAppContext()
  const handleDogClick = () => {
    Swal.fire({
      imageUrl:dog.img,
      imageHeight:500,
      html: `<div className="text-sm">${dog.name} is a ${dog.age} year old ${dog.breed} lives around ${dog.zip_code}</div>`,
      imageAlt:dog.name+' image',
      showCancelButton:true,
      confirmButtonText:'Adopt',
      showDenyButton:true,
      denyButtonText:'Save',
      denyButtonColor:'#F9A826',
    }).then((result)=>{
      if (result.isConfirmed) {
        console.log(user)
        setUser({...user, dogs:user.dogs.concat(dog)})
        return 'adopted'
      } else if (result.isDenied) {
        console.log(user)
        setUser({...user, saved:user.saved.concat(dog)})
        return 'saved'
      }
    })
    .then((res) => {
      if (res) {
        Swal.fire(`${res.toUpperCase()}!`, "", "success")
      }

    })
  }
  return (
    <div
     className="h-72 w-56 m-2 border border-2 hover:ring-2 active:ring-secondary"
     onClick={handleDogClick}
    >
      <div className="flex item-center justify-center w-56 h-40 border-b-2 mb-2">
       <Image alt={dog.name +'image'} src={dog.img} width={50} height={50} style={{width:"100%", height:"auto", objectFit:"contain"}} />
      </div>
      <div className="px-2">
        <div><strong>Age: </strong>{dog.age}</div>
        <div><strong>Name:</strong> {dog.name}</div>
        <div><strong>Breed: </strong>{dog.breed}</div>
        <div><strong>Zip Code:</strong> {dog.zip_code}</div>
      </div>

    </div>
  )
}