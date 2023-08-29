"use client"
import Input from '@/Components/Utilities/Input';
import {useForm, SubmitHandler} from 'react-hook-form';
import { getAuth } from '@/utils/server';
import { useRouter } from 'next/navigation';
import { useAppContext } from './AppContext';
type LoginValues = {
  name: string;
  email: string;
}
export default function LogIn() {
  const router = useRouter();
  const { user, setUser} = useAppContext()
  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {name:"", email:""}})
  const onSubmit: SubmitHandler<LoginValues> = (data) => {
    if (user.login === false) {
      return getAuth(data)
      .then((res) => {
       if(res === 200) {
        setUser({name:data.name, email:data.email, login: true})
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