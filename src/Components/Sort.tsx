import { useAppContext } from "./AppContext"
import Select from "./Elements/Select"

export default function Sort () {
  const {filter, setFilter} = useAppContext()
  const handleSorted = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({...filter, method:e.target.value})
  }

  const sortedFeild = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({...filter, feild: e.target.value})
  }

  return (
    <div className="flex flex-row flex-wrap items-center">
        <span className="text-sm text-gray-500 mr-2">Sorted by:</span>
        <Select options={["breed", "age", "name", "zip code"]} onChange={sortedFeild}/>
        <Select options={["asc", "desc"]} onChange={handleSorted}/>
    </div>
  )
}