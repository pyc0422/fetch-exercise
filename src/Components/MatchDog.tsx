import { getMatch } from "@/utils/server"
import Swal from "sweetalert2"
import { Dog } from "@/utils/pototype"
import { useAppContext } from "./AppContext"

export default function MatchDog () {
  const {user, setUser} = useAppContext()
  const handleMatchDog = async () => {
    if (!user.saved.length){
      Swal.fire({
        icon:'warning',
        title: 'Opps...',
        text: 'Choose some dog you like first, then we can match one for you'
      })
      return;
    }
    const Ids = user.dogs.map(dog => dog.id)
    const res = await getMatch(Ids)
    if (typeof res === 'number') {
      Swal.fire({
        icon:'info',
        title: 'Sorry...',
        text: 'We cannot find a dog matches with you',
        confirmButtonText: 'Reset the search condition'
      })
    } else {
      const matched:Dog | undefined = user.dogs.find(dog => dog.id === res.match)
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
    <div className="btn">
      <button
        onClick={handleMatchDog}
        className="btn h-10 w-64 font-medium bg-rose-400 text-white/80 btn_hover "
      >
       match me a dog
      </button>
    </div>

  )
}