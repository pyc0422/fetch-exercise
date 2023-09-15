import Breed from "./Breed"
import AgeRange from "./AgeRange"
import Sort from "./Sort"
import Card from "./Card"
import { useAppContext } from "./AppContext"
import { Dog } from "@/utils/pototype"
export default function Filter ({dogs}:{dogs:Dog[]}) {
  const {filter, setFilter} = useAppContext()
  return (
    <>
      <div className="mt-4 flex flex-row flex-wrap justify-evenly items-center">
        <Breed />
        <button
         className="btn h-8 border-2 border-rose-400 text-rose-400 font-medium flex items-center btn_hover shadow-md"
         onClick={()=>setFilter({breeds:"", min:"0", max:"0", size:"",feild:"Breed", method:"asc"})}
        >{"> clear filter <"}</button>
      </div>
      <div className="flex flex-wrap flex-row justify-evenly items-center">
        <AgeRange />
        <Sort />
      </div>
      <div id="tab-filter" className="mt-6 flex flex-wrap justify-center">
        {dogs.map((dog, i) => <Card key={i} dog={dog} click={true}/>
        )}
      </div>
    </>
  )
}