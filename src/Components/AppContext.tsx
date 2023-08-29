'use client';
import {createContext, useContext, useState} from 'react'

type UserType = {name: string; email: string; login: boolean};
type StateType = {user: UserType; setUser(user: UserType): void};

const AppContext = createContext<StateType>({user:{name:"", email:"", login:false}, setUser: () => {}});

const useApp = () : StateType=> {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("No app context")
  }
  return context;
}
export function AppWrapper({children}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<UserType>({name:"", email:"", login: false})
  return (
    <AppContext.Provider value = {{user, setUser}}>
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () => useContext(AppContext)