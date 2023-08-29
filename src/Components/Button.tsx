import { ButtonHTMLAttributes } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  text:string,
  class?: string,
}
export default function Button (props:ButtonProps) {
  const btn_style="capitalize text-xs rounded border border-1 border-gray-400 px-4 hover:opacity-80 hover:ring-2 active:ring-secondary"

  return (
    <button
    className={`${btn_style} ${props.class}`}
    onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}