import { ListKeyManager } from "@angular/cdk/a11y";
import { Appointment } from "./patientDashboard";

export class patientvisitdetails {
  
    id?:string;
  //public patientid?:number=0,
  height?: number;
  weight?: number;
  bloodPressure?: number;
 bodyTemprature?: number;
 respirationRate?: number;
 doctorDescription?:string;
 procedureDescription?:string;
 diagnosisDescription?:string;
 drugDescription?:string;
 appointmentId?:string;
 appointments?:Appointment;
 createddate?:Date;
 diagnosisList!:string[];
 proceduresList!:string[];
 drugList!:string[];
}
