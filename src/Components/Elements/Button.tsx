import { ButtonHTMLAttributes } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  text:string,
  class?: string,
  control?:string,
  active?:boolean,
}
export default function Button (props:ButtonProps) {
  const btn_style="capitalize text-sm py-1 px-2  px-4 hover:opacity-80 rounded active:ring-secondary"
  const a_style = " border-rose-400 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-106 duration-200"

  return (
      <a aria-controls={props.control} className={props.active ? "border-b-4" + a_style: a_style }>
      <button
      className={`${btn_style} ${props.class}`}
      onClick={props.onClick}
      >
        {props.text}
      </button>
    </a>

  )
}