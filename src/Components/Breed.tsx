import { getBreeds } from "@/utils/server"
import { ChangeEvent, useState, useEffect } from "react"

export default function Breed ({selectedBreed, setSelectedBreed}: {selectedBreed:string, setSelectedBreed:(breed:string) =>void}) {
  const [breeds, setBreeds] = useState([])

  const breedList = async () => {
    const res = await getBreeds()
    setBreeds(res)
  }
  const breedChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBreed(e.target.value)
  }

  useEffect(() => {
    breedList()
  }, [])
  return (
    <div className="my-4 flex flex-col">
    <div className="flex justify-center items-center">
      <label htmlFor="breed" className="block text-sm text-gray-500">Breed:</label>

      <select
      className="m-2 pl-2 text-gray-500 border rounded-md shadow-sm outline-none focus:border-secondary"
      onChange={breedChange}

      >
        <option value="none" selected disabled>Select a breed</option>
        {breeds.map((breed, i) =>(<option key={i} value={breed}>{breed}</option>))}
      </select>
    </div>
{/*
    <div className="flex flex-row">
    {selectedBreed.map((selected, i) =>
     <div className="border border-gray-400 text-xs mx-1 px-1" key={i}>
       <span className="text-slate-500 font-medium hover:text-secondary pr-2" onClick={() => setSelectedBreed(selectedBreed.slice(0,i).concat(selectedBreed.slice(i + 1)))}>X</span>
       {selected}
     </div>)}
    </div> */}
  </div>
  )
}