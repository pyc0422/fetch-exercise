import Image from "next/image"
import { Dog } from "@/utils/pototype"
export default function Card ({dog}: {dog:Dog}) {
  return (
    <div className="h-72 w-56 m-2 border border-2 hover:ring-2 active:ring-secondary">
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