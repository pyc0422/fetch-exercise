import Header from "@/Components/Header"
import {  getDogs, getDogsId, getMatch } from "@/utils/server"
import React, { useEffect, useState} from "react";
import Card from "./Card";
import { Dog, getIdParams } from "@/utils/pototype";
import ReactPaginate from "react-paginate";
import Breed from "./Breed";
import AgeRange from "./AgeRange";
import Sort from "./Sort";
import Swal from "sweetalert2";
import { useAppContext } from "./AppContext";
import Button from "./Button";
import MatchDog from "./MatchDog";

const page_style="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all hover:bg-neutral-100"
const initalFilter = {breed:"none", min:"0", max:"0", size:"",feild:"Breed", method:"asc"}

export default function Search() {
  const {user, setUser, filter, setFilter} = useAppContext()

  const [dogs, setDogs] = useState<Array<Dog>>([]);
  const [fetchData, setFetchData] = useState({next:"", resultIds:[],"total":1})
  const [currentpage, setPage] = useState(0)
  // const [loading, setloading] = useState(false)
  const dogsList = async (params: getIdParams) => {
    const res = await getDogsId(params);
    // console.log('res:', res)
    if (typeof res !== 'number') {
      setPage(currentpage + 1)
      setFetchData(res)
      const details = await getDogs(res.resultIds)
      // console.log('dd', details)
      if (details)
      setDogs(details)
    } else {
      // setloading(false)
      Swal.fire({
        icon:'error',
        title:'Oops...',
        text:'Something went wrong with our website..'
      })
    }
  }
  const checkFilter = () => {
    const minAge = Number(filter.min) === 0 ? "" : filter.min;
    const maxAge = (Number(filter.max) === 0 || Number(filter.max) < Number(filter.min)) ? "" : filter.max;
    let params = {"breed":filter.breed.slice(1), "sort":filter.feild.toLowerCase()+':'+filter.method, "ageMin": minAge,"ageMax":maxAge}
    return params;
  }
  const pageClickHanlder = async (e: {selected:number}) => {
    const selectedPage = ((e.selected + 1) * 25).toString();
    const params = checkFilter()
    dogsList({...params, 'from':selectedPage})
  }
  useEffect(() => {
    const params = checkFilter();
    console.log('params:', params)
    dogsList({...params})
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [filter])

  return (

    <div className="mb-4">
      <Header Ids={fetchData.resultIds} dogs={dogs}/>
      <div className="flex flex-row justify-around items-center">
        <Breed />
        <Button text="clear filter" class="h-6" onClick={()=>setFilter(initalFilter)}/>
      </div>

      <div className="flex flex-row justify-evenly items-center">
        <AgeRange />
        <Sort />
      </div>
      <MatchDog Ids={fetchData.resultIds} dogs={dogs} text="Random Match a dog for me"/>

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