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
export interface IQuestion{
    key: string;
    question: string;
    type: string;
    responses: number;
    created: string;
    status: string;
    isPre: boolean;
    isRequired: boolean;
}