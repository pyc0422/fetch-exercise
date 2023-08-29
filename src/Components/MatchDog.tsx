import { getMatch } from "@/utils/server"
import Swal from "sweetalert2"
import { Dog } from "@/utils/pototype"
import { useAppContext } from "./AppContext"
export default function MatchDog ({Ids, dogs, text}:{Ids?:string[], dogs:Array<Dog>, text:string}) {
  const {user, setUser} = useAppContext()
  const handleMatchDog = async () => {
    if (!Ids) {
      Ids = dogs.map(dog => dog.id)
    }
    const res = await getMatch(Ids)
    if (typeof res === 'number') {
      Swal.fire({
        icon:'info',
        title: 'Sorry...',
        text: 'We cannot find a dog matches with you',
        confirmButtonText: 'Reset the search condition'
      })
    } else {
      const matched:Dog | undefined = dogs.find(dog => dog.id === res.match)
      if (matched) {
        const detailHtml =
        `<div className="px-2">
          <div><strong>Age: </strong>${matched.age}</div>
          <div><strong>Name:</strong> ${matched.name}</div>
          <div><strong>Breed: </strong>${matched.breed}</div>
          <div><strong>Zip Code:</strong> ${matched.zip_code}</div>
        </div>`
        Swal.fire({
          imageUrl:matched.img,
          imageHeight:500,
          html: detailHtml,
          imageAlt:matched.name+' image',
          showCancelButton:true,
          confirmButtonText:'Adopt!'
        }).then((result)=>{
          if (result.isConfirmed) {
            setUser({...user, dogs: user.dogs.concat([matched]), saved:user.saved.filter(dog => dog.id !== matched.id)})
            Swal.fire('Adopted!', "", "success")
          }
        })
      }

    }
  }
  return (
    <div className="text-center mt-4 ">
      <button
      className="text-m font-bold border border-gray-400 rounded-lg shadow-sm px-4 py-1 text-secondary hover:ring-1 hover:ring-accent hover:bg-neutral-100 active:ring-secondary active:bg-white"
      onClick={handleMatchDog}
      >
        {text}</button>
    </div>

  )
}