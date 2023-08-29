export default function Sort ({sort, setSort}: {sort:Record<string, string>, setSort:(sort:Record<string, string>) => void}) {
  const handleSorted = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sorted = e.target.value
    if (sorted === 'ascending') {
      setSort({...sort, method:"asc"})
    } else if (sorted === 'desceding') {
      setSort({...sort, method:"desc"})
    }
  }

  const sortedFeild = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort({...sort, feild: e.target.value.toLowerCase()})
  }
  return (
    <div>
        <span className="text-sm text-gray-500 mr-2">Sorted by:</span>
        <select
          className="m-2 pl-2 text-gray-500 border rounded-md shadow-sm outline-none focus:border-secondary"
          onChange={sortedFeild}
          defaultValue={"Breed"}
          value={sort.feild}
        >
          {["Breed", "Age", "Name", "Zip_Code"].map((feild, i) =>
           <option key={i} value={feild}>{feild.replace("_", " ")}</option>
           )}
        </select>
        <select
         className="m-2 pl-2 text-gray-500 border rounded-md shadow-sm outline-none focus:border-secondary"
         onChange={handleSorted}
         defaultValue={"ascending"}
         value={sort.method === 'asc' ? "asceding" : "desceding"}
         >
          <option value="ascending">Ascending</option>
          <option value="desceding">Desceding</option>
        </select>
    </div>
  )
}