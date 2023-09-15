import { useAppContext } from "../AppContext";

import Card from "../Card";

export default function ListPage ({type}:{type:string}) {
  const {user} = useAppContext()
  const dogs = type === 'saved' ? user.saved : user.dogs;

  return (
    <div className="mt-6 flex flex-wrap justify-center">
      { !dogs.length ? <h1>{`You haven't ${type} any dog yet.`}</h1>
      : dogs.map(dog =>
        <Card key={dog.id} dog={dog} heart={false} click={type==='saved'}/>
        )
      }
    </div>
  )
}