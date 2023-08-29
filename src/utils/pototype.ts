export type Dog = {
  img: string;
  name: string;
  age: number;
  id:string;
  zip_code: string;
  breed: string;
}


export type getIdParams = {
  breeds?:string;
  zipCodes?:string;
  ageMin?:string;
  ageMax?:string;
  size?:string;
  from?:string;
  sort?:string;
}