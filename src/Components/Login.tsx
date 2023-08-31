"use client"
import Input from './Elements/Input';
import {useForm, SubmitHandler} from 'react-hook-form';
import { getAuth } from '@/utils/server';
import { useAppContext } from './AppContext';
import Swal from 'sweetalert2';

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

      <div className="mt-8 max-w-300">
        <form className="px-2 pt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <strong className="text-xl">Log In</strong>
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
              className="hover:opacity-80 active:opacity-100 shadow-sx border rounded-md px-4 py-1 text-m my-2 focus:outline-none focus:ring-2"
              type="submit"
              value="Submit"
            />
          </div>

        </form>
      </div>
  )
}