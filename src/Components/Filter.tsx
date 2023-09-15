import Breed from "./Breed"
import Button from "./Elements/Button"
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
        <Button text="clear filter" class="h-6" onClick={()=>setFilter({breeds:"", min:"0", max:"0", size:"",feild:"Breed", method:"asc"})}/>
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