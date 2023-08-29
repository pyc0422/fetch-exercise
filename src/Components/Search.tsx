import LogOut from "@/Components/Logout"
import { getBreeds, getDogs, getDogsId } from "@/utils/server"
import { ChangeEvent, ReactEventHandler, ReactHTMLElement, useEffect, useState} from "react";
import Card from "./Utilities/Card";
import { Dog } from "@/utils/pototype";
export default function Search() {
  const [breeds, setBreeds] = useState([])
  const [selectedBreed, setSelectedBreed] = useState("")
  const [dogs, setDogs] = useState<Array<Dog>>([]);
  const breedChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBreed(e.target.value)
  }
  const breedList = async () => {
    const res = await getBreeds()
    setBreeds(res)
  }
  const dogsList = async () => {
    const res = await getDogsId('/dogs/search');
    if (res) {
      console.log('res.resultIds', res)
      const details = await getDogs(res.resultIds)
      setDogs(details)
      console.log('details', details)
    }
  }
  useEffect(() => {
    breedList();
    dogsList()
  },[])
  return (

    <div className="mb-4">

      <div className="my-4">
        <label>What kind of dog you want to choose?</label>
        <select
         className="m-2 pl-2 text-gray-500 border rounded-md shadow-sm outline-none appearance-none focus:border-secondary"
         value={selectedBreed}
         onChange={breedChange}
        >
          {breeds.map((breed, i) =>(<option key={i} value={breed}>{breed}</option>))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap justify-center">
        {dogs.map((dog, i) => <Card key={i} dog={dog} />
        )}
      </div>
      <div>{}</div>
      <LogOut />

    </div>

  )
}