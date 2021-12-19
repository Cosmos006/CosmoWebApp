export interface AppointmentData {
    id: number;
    doctorName: string;
    date: Date;
    nurseName: string;
    isDeclined: boolean;
    diagnosis:string;
    
  }

  // export const appointmentData: AppointmentData[] = [
    
  // ];
  export interface Appointment { 
    value: string;
    viewValue: string;
  }
  export interface AppointmentPastHeaderData {
    // id: number;
    doctorName: string;
    date: Date;
    nurseName: string;
    diagnosis:string;
    // isDeclined: boolean;
  }
  export interface AppointmentHeaderData {
    doctorName: string;
    date: string;
    nurseName: string;
    diagnosis: string;
  }

  export const appointments: Appointment[] = [
    { value: '1', viewValue: 'Upcoming Appointments' },
    { value: '2', viewValue: 'Past Appointments' },
    { value: '3', viewValue: 'Decline Appointments' }
  ];

  export const appointmentPastHeaderData: AppointmentPastHeaderData[] = [
    {
      doctorName: 'Doctor Name',
      date: new Date('2/12/2021'),
      nurseName: 'Nurse Name',
      diagnosis: 'Diagnosis'
    }
  ];

  export const appointmentHeaderData: AppointmentHeaderData[] = [
    {
      doctorName: 'Doctor Name',
      date: 'Appointment Date',
      nurseName: 'Nurse Name',
      diagnosis: 'Diagnosis'
    }
  ];