const base_url = "https://frontend-take-home-service.fetch.com"

const options = { headers:{'Content-Type': 'application/json'}}
const getAuth = async ({name, email}:{name:string, email:string}) => {
  try {
    const auth = await fetch(`${base_url}/auth/login`, {...options, method: 'post',  body: JSON.stringify({name, email}), credentials: 'include'})
    if (auth && auth.status === 200) {
      return auth.status
    }
  } catch(error) {
    return error
  }

}

const logOut = async({name, email}:{name:string, email:string}) => {
  try {
    const res = await fetch(`${base_url}/auth/logout`, {...options, method:'post', body: JSON.stringify({name, email})})
    if (res) {
      return res.status
    }
  } catch(error) {
    return error
  }
}

const getBreeds = async () => {
  try {
    const res = await fetch(`${base_url}/dogs/breeds`, {...options, credentials: 'include'})
    if (res.ok){
      return res.json()
    }
    return res.status
  } catch(error) {
    return error
  }
}

const getDogsId = async (endpoint: string) => {

  const res = await fetch(base_url + endpoint, {...options, credentials: 'include'})
  if (res.ok) {

    return res.json()
  }
  return res.status
}
const getDogs = async(dogsList:Array<string>) => {
  const res = await fetch(`${base_url}/dogs`, {...options, method:'post', body:JSON.stringify(dogsList), credentials: 'include'})
  if (res.ok) {
    return res.json()
  }
  return res.status
}
export {getAuth, logOut, getBreeds, getDogsId, getDogs}