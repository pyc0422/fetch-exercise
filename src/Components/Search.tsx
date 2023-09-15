import Header from "@/Components/Header"
import {  getDogs, getDogsId } from "@/utils/server"
import React, { useEffect, useState} from "react";
import { Dog, getIdParams } from "@/utils/pototype";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import { useAppContext } from "./AppContext";
import Filter from "./Filter";
import ListPage from "./Elements/ListPage";

const page_style="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all hover:bg-rose-300"
const initialFilter = {breed:"", min:"0", max:"0", size:"",feild:"Breed", method:"asc"}

export default function Search() {
  const {filter, setFilter, activeTab} = useAppContext()
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
    let params = {"sort":filter.feild.toLowerCase()+':'+filter.method, "ageMin": minAge,"ageMax":maxAge}
    if (filter.breeds === 'none' || filter.breeds===""){
      return params;
    }
    return {...params, "breeds":filter.breeds};
  }
  const pageClickHanlder = async (e: {selected:number}) => {
    const selectedPage = ((e.selected + 1) * 25).toString();
    const params = checkFilter()
    dogsList({...params, 'from':selectedPage})
  }
  useEffect(() => {
    const params = checkFilter();
    console.log('oara', params)
    dogsList({...params})
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [filter])

  return (
    <>
    <Header Ids={fetchData.resultIds} dogs={dogs}/>
    <div className="mt-24 w-full">
      { activeTab === 'tab-saved' ? <ListPage type="saved" />
      : activeTab === "tab-adopt" ? <ListPage type="adopted" />
      :
      <>
        <Filter dogs={dogs} />

        <div className="flex justify-center items-center">
          <div className="fixed bottom-0 bg-[#fdccce] w-screen flex flex-row justify-center">
           <ReactPaginate
            className="w-1/2 min-w-fit flex flex-row text-sm font-medium justify-evenly mt-4 mb-8"
            previousClassName={page_style}
            nextClassName={page_style}
            pageLinkClassName={page_style}
            previousLabel={'Previous < '}
            nextLabel={'> Next'}
            breakLabel={'...'}
            activeClassName={'bg-rose-300'}
            initialPage={currentpage}
            pageCount={Math.ceil(fetchData.total / 25)|1}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            selectedPageRel={"clicked"}
            onPageChange={pageClickHanlder}
           />
        </div>
      </div>

      </>
      }

    </div>
  </>
  )
}