import { UserDetails } from 'src/app/models/UserDetails';


export interface Doctor {
    id:number;
    title: string;
    firstName: string;
    lastName: string;
    userName:string;
    contact: number;
    specialization: string;
    email: string;
    createdOn: string;
    isAvailablity: boolean;
    date:Date;
 userDetails :UserDetails;
    
}