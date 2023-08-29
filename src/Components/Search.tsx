import LogOut from "@/Components/Logout"
import { getBreeds, getDogs, getDogsId } from "@/utils/server"
import React, { ChangeEvent, ReactEventHandler, ReactHTMLElement, useEffect, useState} from "react";
import Card from "./Utilities/Card";
import { Dog } from "@/utils/pototype";
import ReactPaginate from "react-paginate";
import Breed from "./Breed";
import AgeRange from "./AgeRange";
import Sort from "./Sort";
const page_style="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all hover:bg-neutral-100"

export default function Search() {

  const [selectedBreed, setSelectedBreed] = useState<string>("none")
  const [age, setAge] = useState<Record<string, number>>({min:0, max:0})
  const [dogs, setDogs] = useState<Array<Dog>>([]);
  const [fetchData, setFetchData] = useState({next:"", resultIds:[],"total":1})
  const [currentpage, setPage] = useState(0)
  const [sort, setSort] = useState<Record<string, string>>({feild:"Breed", method:"asc"})

  const dogsList = async (params: Record<string, string>) => {
    const res = await getDogsId(params);
    if (res) {
      setPage(currentpage + 1)
      setFetchData(res)
      const details = await getDogs(res.resultIds)
      console.log('dd', details)
      setDogs(details)
    }
  }

  const pageClickHanlder = async (e: {selected:number}) => {
    const selectedPage = ((e.selected + 1) * 25).toString();
    console.log('page[, ',e.selected, typeof e.selected)
    dogsList({'size':'25', 'from':selectedPage, 'sort':sort.feild.toLowerCase()+':'+sort.method})
  }

  // const handleSorted = (e: ChangeEvent<HTMLSelectElement>) => {
  //   const sorted = e.target.value
  //   if (sorted === 'ascending') {
  //     setSort({...sort, method:"asc"})
  //   } else if (sorted === 'desceding') {
  //     setSort({...sort, method:"desc"})
  //   }
  // }



  useEffect(() => {
      console.log('sort in effect:', sort, age)

      const minAge = age.min === 0 ? "" : age.min.toString();
      const maxAge = (age.max === 0 || age.max < age.min) ? "" : age.max.toString();

      let params = {"sort":sort.feild.toLowerCase()+':'+sort.method, "ageMin":minAge, "ageMax":maxAge}
      console.log('age', minAge, maxAge)
      if (selectedBreed !== "none") {
        dogsList({...params, 'breeds':selectedBreed, })
      } else {
        dogsList(params)
      }

  }, [sort, selectedBreed, age])

  return (

    <div className="mb-4">
      <LogOut />
      <Breed selectedBreed={selectedBreed} setSelectedBreed={setSelectedBreed}/>
      <div className="flex flex-row justify-evenly items-center">
        <AgeRange age={age} setAge={setAge} />
        <Sort sort={sort} setSort={setSort} />
      </div>

      <div className="mt-6 flex flex-wrap justify-center">
        {dogs.map((dog, i) => <Card key={i} dog={dog} />
        )}
      </div>

      <ReactPaginate
        className="flex flex-row text-sm font-medium justify-evenly mt-4 mb-8"
        previousClassName={page_style}
        nextClassName={page_style}
        pageLinkClassName={page_style}
        previousLabel={'Previous < '}
        nextLabel={'> Next'}
        breakLabel={'...'}
        activeClassName={'bg-neutral-100'}
        initialPage={currentpage}
        pageCount={Math.ceil(fetchData.total / 25)|1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        selectedPageRel={"clicked"}
        onPageChange={pageClickHanlder}
      />


    </div>

  )
}