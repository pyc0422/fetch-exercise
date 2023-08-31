import { SelectHTMLAttributes } from "react";
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
  options: string[],
}
export default function Select (props:SelectProps) {
  return (
    <select
     className="m-2 pl-2 capitalize text-gray-500 text-sm border rounded-md shadow-sm outline-none focus:border-secondary"
     onChange={props.onChange}
     defaultValue={props.options[0]}
    >
      {props.options.map((option, i) =>
        <option key={i} value={option}>{option}</option>
      )}
   </select>
  )
}