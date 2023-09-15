import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import Home from '../src/app/page'
import Search from '@/app/Search'
import { StateType } from '@/utils/pototype'
import { AppWrapper, AppContext } from '@/Components/AppContext'
import { useContext } from 'react'
describe('Home Page', () => {
  it('Home conditional renders login page', () => {
    render(<Home />)
    const title = screen.getByText("Log In")
    expect(title).toBeDefined()
  })

  it('Login Page Handled empty and invalid input', async () => {
    render(<Home />)
    const submit = screen.getByLabelText("login_submit")
    await userEvent.click(submit)
    const required = await screen.findAllByText(new RegExp("required", "i"))
    expect(required).toHaveLength(2)
    userEvent.type(screen.getByLabelText("name_input"), 'jest')
    userEvent.type(screen.getByLabelText("email_input"), "123")
    await userEvent.click(submit)
    expect(screen.findByText("Oops...")).toBeDefined()
  })

  it('Login with valid inputs', async () => {
    render(<Home />)
    const submit = screen.getByLabelText("login_submit")
    const name = screen.getByLabelText("name_input")
    const email = screen.getByLabelText("email_input")
    fireEvent.change(name, {target: {value: 'jest'}})
    fireEvent.change(email, {target: {value: '123@jest.com'}})
    await userEvent.click(submit)
    const required = screen.queryByText(new RegExp("required"))
    expect(required).toBeNull()
  })
})

const customRender = (child: React.ReactNode, { providerProps }:{providerProps:StateType}) => {
  return render(
    <AppContext.Provider value={providerProps}>{child}</AppContext.Provider>
     // renderOptions
    )
}
describe('Search Page', () => {
  const providerProps = {
    user: {name:"jest", email:"123@jest.com", login:true, dogs:[], saved:[]},
    setUser:()=>{},
    filter:{breed:"", min:"0", max:"0", size:"", feild:"Breed", method:"asc"},
    setFilter: () =>{}
  }

  it("Search Page render the name", () => {
    customRender(<Search />, {providerProps})
    expect(screen.getByText(/JEST/)).toBeInTheDocument()
  })
})