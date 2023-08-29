"use client"
import Input from '@/Components/Input';
import {useForm, SubmitHandler} from 'react-hook-form';
import { getAuth } from '@/utils/server';
import { useRouter } from 'next/navigation';
import { useAppContext } from './AppContext';
import Swal from 'sweetalert2';
type LoginValues = {
  name: string;
  email: string;
}
export default function LogIn() {
  const router = useRouter();
  const { user, setUser} = useAppContext()
  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {name:"", email:""}})
  const onSubmit: SubmitHandler<LoginValues> = (data) => {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const temp = regexp.test(data.email)
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

      <div className="max-w-300">
        <form className="px-2 pt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <strong className="text-xl">Log In</strong>
          </div>
          <Input
            label="Name"
            required={true}
            id="name"
            placeholder='Type your name...'
            register={register}
            erro={errors.name}
          />
          <Input
            label="Email"
            required={true}
            id="email"
            placeholder="Type your email..."
            register={register}
            erro={errors.email}
          />
          <div className="text-center">
            <input
              className="hover:opacity-80 active:opacity-100 shadow-sx border rounded-md px-4 py-1 text-m my-2 focus:outline-none focus:ring-2"
              type="submit"
              value="Submit"
            />
          </div>

        </form>
      </div>
  )
}