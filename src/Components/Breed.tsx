import { getBreeds } from "@/utils/server"
import { ChangeEvent, useState, useEffect } from "react"
import { useAppContext } from "./AppContext"

export default function Breed () {
  const [breeds, setBreeds] = useState([])
  const {filter, setFilter} = useAppContext()
  const breedList = async () => {
    const res = await getBreeds()
    setBreeds(res)
  }
  const breedChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter({...filter, breed: filter.breed += ","+e.target.value})
  }

  useEffect(() => {
    breedList()
  }, [])

  return (
    <div className="w-fit my-4 flex flex-col">
    <div className="flex justify-center items-center">
      <label htmlFor="breed" className="block text-sm text-gray-500">Breed:</label>

      <select
      className="m-2 pl-2 text-gray-500 border rounded-md shadow-sm outline-none focus:border-secondary"
      onChange={breedChange}
      >
        <option value="none" disabled>Select a breed</option>
        {breeds.map((breed, i) =>(<option key={i} value={breed}>{breed}</option>))}
      </select>
    </div>
    <div className="flex flex-row mt-2">
      {filter.breed.length>0 && filter.breed.split(",").slice(1).map((bre, i) =>
      <div key={i} className="mx-1 text-xs px-1 border border-1 w-fit">
        <span
          className="text-sm mr-2 px-1 hover:text-secondary hover:font-medium"
          onClick={() => setFilter({...filter, breed:filter.breed.replace(`,${bre}`,"")})}
        >
          X
        </span>
        {bre}
      </div>
      )}
    </div>
  </div>
  )
}