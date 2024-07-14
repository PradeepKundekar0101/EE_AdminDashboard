export interface IUser{
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    role?:"mentor"|"admin";
}