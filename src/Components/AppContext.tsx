'use client';
import { Dog } from '@/utils/pototype';
import {createContext, useContext, useState} from 'react'

type UserType = {name: string; email: string; login: boolean, dogs:Array<Dog>, saved:Array<Dog>};
type FilterType =Record<string, string>
type StateType = {
  user: UserType;
  setUser(user: UserType): void;
  filter: FilterType;
  setFilter(filter:FilterType):void;
};
const initialState = {
  user:{name:"", email:"", login:false, dogs:[], saved:[]},
  setUser: () => {},
  filter:{breeds:"", min:"0", max:"0", size:"", feild:"Breed", method:"asc"},
  setFilter:() => {}
}
export const AppContext = createContext<StateType>(initialState);

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
  const [user, setUser] = useState<UserType>(initialState.user)
  const [filter, setFilter] = useState<FilterType>(initialState.filter)
  return (
    <AppContext.Provider value = {{user, setUser, filter, setFilter}}>
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () => useContext(AppContext)