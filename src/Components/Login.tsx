"use client"
import Input from './Elements/Input';
import {useForm, SubmitHandler} from 'react-hook-form';
import { getAuth } from '@/utils/server';
import { useAppContext } from './AppContext';
import Swal from 'sweetalert2';
import {FaArrowDown} from "react-icons/fa"
type LoginValues = {
  name: string;
  email: string;
}
export default function LogIn() {

  const { user, setUser} = useAppContext()
  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {name:"", email:""}})
  const onSubmit: SubmitHandler<LoginValues> = (data) => {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!regexp.test(data.email)) {
      Swal.fire({icon:'error', title:'Oops...', text:'Invalid Email Address '})
      return
    }
    if (user.login === false) {
      return getAuth(data)
      .then((res) => {
       if(res === 200) {
        setUser({...user,name:data.name, email:data.email, login: true})
       }
      })
    }
  }
  return (
        <form className="px-2 pt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4 animate-bounce flex flex-col items-center justify-baseline drop-shadow-[0_1.5px_1.5px_rgba(255,255,255)]">
            <p className="w-1/2 p-1 text-center text-rose-300 text-sm border-2 border-rose-300 rounded-md shawdow-md">
               Starts Here
            </p>
            <FaArrowDown style={{color:'rgb(252 165 165)', marginTop:"2px"}}/>
          </div>
          <Input
            label="Name"
            required={true}
            id="name"
            aria-label="name_input"
            placeholder='Type your name...'
            register={register}
            erro={errors.name}
          />
          <Input
            label="Email"
            required={true}
            aria-label="email_input"
            id="email"
            placeholder="Type your email..."
            register={register}
            erro={errors.email}
          />
          <div className="text-center">
            <input
              aria-label="login_submit"
              className="font-extralight text-slate-50 w-full bg-rose-400 hover:opacity-80 active:opacity-100 shadow-sx border rounded-md px-4 py-1 text-m my-2 focus:outline-none focus:ring-2"
              type="submit"
              value="Start"
            />
          </div>

        </form>

  )
}