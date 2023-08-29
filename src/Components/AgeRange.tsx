import { ChangeEvent } from "react";

export default function AgeRange ({age, setAge}:{age:Record<string,number>, setAge:(age:Record<string,number>)=>void}) {
  const handleCount = (e:React.MouseEvent<HTMLButtonElement>, kind:string) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    let btn = target.innerText;
    let temp = age[kind]
    if (btn === '-') {
      setAge({...age, [kind]: temp > 0 ? temp-1 : 0})
    } else if (btn === '+'){
      setAge({...age, [kind]: temp + 1})
    }
  }
  return (
    <div className="flex">
      <div className="flex flex-row m-2 items-center">
        <label htmlFor="min_age" className="mr-2 block text-sm text-gray-500">
        Age Range: <span className="ml-2 text-gray-600">From</span>
        </label>
        <div className="flex flex-row w-20 h-6 justify-evenly items-center rounded-lg relative bg-transparent mt-1 border-0 shadow-sm ring-1 ring-inset ring-gray-300">
          <button
          onClick={(e) => handleCount(e, 'min')}
          className="items-center flex text-gray-600 hover:text-accent active:text-secondary w-4  h-full rouned-l cursor-pointer outline-none"
          >
            <span className="text-2xl font-thin hover:font-medium">-</span>
          </button>
          <div className="flex items-center justify-center">
            <span id="min" className="text-gray-700 text-sm" >{age.min}</span>
          </div>
          <button
            onClick={(e) => handleCount(e, 'min')}
            className="text-gray-600 rouned-l cursor-pointer outline-none hover:text-accent active:text-secondary"
          >
            <span className="text-2xl font-thin hover:font-medium">+</span>
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-evenly m-2 items-center">
        <label htmlFor="max-age" className="mr-2 block text-sm text-gray-600">
          to
        </label>
        <div className="flex flex-row w-20 h-6 justify-evenly items-center rounded-lg relative bg-transparent mt-1 border-0 shadow-sm ring-1 ring-inset ring-gray-300">
          <button
          onClick={(e) => handleCount(e, 'max')}
          className="text-gray-600 hover:text-accent active:text-secondary  rouned-l cursor-pointer outline-none"
          >
            <span className="m-auto text-2xl font-thin hover:font-medium">-</span>
          </button>
          <div className="flex items-center justify-center">
            <span id="max" className="text-gray-700 text-sm" >{age.max}</span>
          </div>
          <button
            onClick={(e) => handleCount(e, 'max')}
            className="text-gray-600 rouned-l cursor-pointer outline-none hover:text-accent active:text-secondary"
          >
            <span className="hover:font-medium text-2xl font-thin">+</span>
          </button>
        </div>
      </div>
    </div>
  )
}