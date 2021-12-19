export interface AppointmentData {
    id: number;
    doctorName: string;
    date: Date;
    nurseName: string;
    isDeclined: boolean;
    diagnosis:string;
    
  }

  export const appointmentData: AppointmentData[] = [
    {
      id: 1,
      doctorName: 'Dr. 1',
      date: new Date('02/26/2021 10:00'),
      nurseName: 'Nurse 1',
      isDeclined: false,
      diagnosis:'Chest pain'
    },
    {
      id: 2,
      doctorName: 'Dr. 2',
      date: new Date('2/27/2021'),
      nurseName: 'Nurse 2',
      isDeclined: false,
      diagnosis:'Headache'
    },
    {
      id: 3,
      doctorName: 'Dr. 3',
      date: new Date('2/28/2021'),
      nurseName: 'Nurse 3',
      isDeclined: false,
      diagnosis:'Fever'
    },
    {
      id: 4,
      doctorName: 'Dr. 4',
      date: new Date('2/28/2021'),
      nurseName: 'Nurse 4',
      isDeclined: false,
      diagnosis:'Pneumonia'
    },
    {
      id: 5,
      doctorName: 'Dr. 5',
      date: new Date('1/03/2022'),
      nurseName: 'Nurse 5',
      isDeclined: false,
      diagnosis:'Hypertension'
    },
    {
      id: 6,
      doctorName: 'Dr. 6',
      date: new Date('2/02/2021'),
      nurseName: 'Nurse 6',
      isDeclined: true,
      diagnosis:'Stroke'
    },
    {
      id: 7,
      doctorName: 'Dr. 7',
      date: new Date('6/02/2021'),
      nurseName: 'Nurse 7',
      isDeclined: true,
      diagnosis:'The takeaway'
    },
    {
      id: 8,
      doctorName: 'Dr. 8',
      date: new Date('2/12/2021'),
      nurseName: 'Nurse 8',
      isDeclined: false,
      diagnosis:'Fever'
    },
  ];
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