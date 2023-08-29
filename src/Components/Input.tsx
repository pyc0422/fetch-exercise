
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:string,
  labelClass?:string,
  inputClass?:string,
  children?: React.ReactNode,
  erro?: undefined | object,
  register?:any
 }
 export default function Input (props:InputProps) {
   return (
     <div className="mb-4">
       <label htmlFor={props.id} className={`block text-gray-700 text-sm text-left mb-2 ${props.labelClass}`} >
         {props.label}
       </label>
       <input
       className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${props.inputClass}`}
       id={props.id}
       type={props.type}
       aria-invalid={props.erro}
       defaultValue={props.defaultValue}
       placeholder={props.placeholder}
       {...props.register(props.id, {
         required: props.required}
       )}
     />

       {props.erro && <div className="text-right text-xs text-red-500">{`${props.label} is required`}</div>}
     </div>
   )
 }