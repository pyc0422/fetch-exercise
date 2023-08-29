import { useAppContext } from "./AppContext"

export default function Sort () {
  const {filter, setFilter} = useAppContext()
  const handleSorted = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // const sorted = e.target.value
    setFilter({...filter, method:e.target.value})
    // if (sorted === 'ascending') {
    //   setSort({...sort, method:"asc"})
    // } else if (sorted === 'desceding') {
    //   setSort({...sort, method:"desc"})
    // }
  }

  const sortedFeild = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({...filter, feild: e.target.value})
  }
  return (
    <div>
        <span className="text-sm text-gray-500 mr-2">Sorted by:</span>
        <select
          className="m-2 pl-2 text-gray-500 border rounded-md shadow-sm outline-none focus:border-secondary"
          onChange={sortedFeild}
          defaultValue={"breed"}

        >
          {["breed", "age", "name", "zip_code"].map((feild, i) =>
           <option className="capitalize" key={i} value={feild}>{feild.replace("_", " ")}</option>
           )}
        </select>
        <select
         className="m-2 pl-2 text-gray-500 border rounded-md shadow-sm outline-none focus:border-secondary"
         onChange={handleSorted}
         defaultValue={"asc"}

         >
          <option value="asc">Ascending</option>
          <option value="desc">Desceding</option>
        </select>
    </div>
  )
}