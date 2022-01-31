
export class Attendance {
   constructor(
      public id?:string,
      public physicianId?:string ,
      public timeSlot?:string[],
      public arrTimeSlot?:string,
      public dateTime?:Date,
      public isAbsent?:boolean,
   ){}
   
  }