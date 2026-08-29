export interface LoginDTo{
    
    email:string,
    password:string
}



export interface RegisterDto{
    name:string
    email:string,
    password:string
}


export interface User{
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  role:string;


}



