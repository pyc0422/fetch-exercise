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
        const dogSet = new Set(user.dogs)
        if (dogSet.has(dog)) {
          Swal.fire({
            icon:"warning",
            title:"Awww",
            text:"You already adopted this dog!"
          })
        } else {
          setUser({...user, dogs:user.dogs.concat(dog)})
          return 'adopted'
        }


      } else if (result.isDenied) {
        const savedSet = new Set(user.saved)
        if (savedSet.has(dog)) {
          Swal.fire({
            icon:'warning',
            title:'So sweet',
            text:'You already saved this dog'
          })
        } else {
         setUser({...user, saved:user.saved.concat(dog)})
         return 'saved'
        }
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

     className="bg-[#E0F1FB] h-72 w-56 m-2 border border-2 hover:ring-2 active:ring-secondary rounded-lg"
     onClick={handleDogClick}
    >
      <div className="flex item-center justify-center w-56 h-40 mb-2 border-b-2">
       <Image alt={dog.name +'image'} src={dog.img} width={50} height={50} style={{width:"100%", height:"auto", objectFit:"contain"}} />
      </div>
      <div className="px-2 mt-4">
        <div><strong>Name:</strong> {dog.name}</div>
        <div><strong>Age: </strong>{dog.age}</div>
        <div><strong>Breed: </strong>{dog.breed}</div>
        <div><strong>Zip Code:</strong> {dog.zip_code}</div>
      </div>

    </div>
  )
}