export interface IUser{
    _id:string;
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    role?:"mentor"|"admin";
    occupation?:string;
    isBrokerConnected?:boolean;
}