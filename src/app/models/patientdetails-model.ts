import { Patientrelativedetails } from "./patientrelativedetails";

export class Patientdetails {
        Id!: string;
        firstName!: string;
        lastName!: string;
        dateofBirth!: Date;
        age!: number;
        gender!: boolean;
        race!: string;
        ethinicity!: string;
        //languagesknown!: string;
        email!: string;
        address!: string;
        pincode!: number;
        country!: string;
        state!: string;
        contactnumber!: string;
        allergyId!: string;
        allergyType!: string;
        isFatal!: boolean;
        PatientId!: number;
        patientDetails!:string;
        patientRelativeId!: string;
        PatientRelativeDetails!: Patientrelativedetails ;
}
