import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { elementClosest } from '@fullcalendar/angular';


import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import { Allergy } from 'src/app/models/allergy-model';
import { diagnosis } from 'src/app/models/diagnosis-model';
//import { logKeyValuePairs } from 'src/app/models/Globalfunctions';
import { medication } from 'src/app/models/medication-model';
import { patientvisitdetails } from 'src/app/models/patientvisitdetails';
import { procedure } from 'src/app/models/procedure-model';
import { Role } from 'src/app/models/Role';
import { patientdetails } from 'src/app/Services/patientdetails.service';

import { PreviouspatientvisitdetailsComponent } from '../previouspatientvisitdetails/previouspatientvisitdetails.component';

@Component({
  selector: 'app-patient-viewdetails',
  templateUrl: './patient-viewdetails.component.html',
  styleUrls: ['./patient-viewdetails.component.css']
})
export class PatientViewdetailsComponent implements OnInit

{
  
  @Input() index = 0;
  @Input() previousdetails! : patientvisitdetails
  
  patientvisitbuttonsave:boolean=false;
  patientvisitbuttonupdate:boolean=false;
  nurseform:FormGroup=new FormGroup({});
  physicianform:FormGroup=new FormGroup({});
  panelOpenState = false;
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  postobj:patientvisitdetails=new patientvisitdetails();
  //postobj!:patientvisitdetails; 
  // private postObj= new BehaviorSubject<patientdetails>();
  iseditable=true;
  Id:any;
  diagnosisobj!:diagnosis;
  diagnosisidlist:diagnosis[]=[];
  listOfdiagnosis: diagnosis[] = [];
  listOfdiagnosisdiscription: string[] = ['others'];
  listOfprocedure:procedure[]=[];
  listOfprocedurediscription:string[]=['others'];
  listOfmedication:medication[]=[];
  selectionlist: string[] = ['Yes', 'No'];
  Guid:any;
 
  constructor(private patient:patientdetails,private router: Router,private route:ActivatedRoute) { }
  height?:number;
 
  public filteredList1: any;
  public filteredList2: any;
  public filteredList3:any;
  patientid?:string;
  Rolename?:String;
    VisitId:any;
  ngOnInit(): void 
  {
    this.bindToUI();
    var Get = localStorage.getItem('currentUser');
 
    if (typeof Get === 'string') {
       var id= JSON.parse(Get).id;
       this.patientid =id;
      
    }
    

   this.postobj=new patientvisitdetails();
    
    this. getdiscriptiondetails();
    
    this.filteredList1= this.listOfdiagnosisdiscription.slice();
    this.getproceduredetails();
    this.filteredList2= this.listOfprocedurediscription.slice();
    this.getmedicationdetails();
    this.fetchdata(this.Guid);
    //this.filteredList3=this.listOfmedication.slice();
  // this.route.queryParams.subscribe((params)=>
  // {
  //    this.Guid+=params['guidId'];
     
  // })

  // if(this.Guid!=null)
  // {
    //this.fetchdata(this.Guid);
 // }

  
  
  }


  

Addupdatepatientdetails()
{
  
  if(this.nurseform.invalid)
  {
    alert("check all fields are filled");
  
    console.log(this.nurseform);
  }
  else
  {
    
      var dat:patientvisitdetails=
      {
        height: this.nurseform.value.height,
        weight: this.nurseform.value.weight,
        bloodPressure: this.nurseform.value.bloodpressure,
        bodyTemprature: this.nurseform.value.bodytemprature,
        respirationRate: this.nurseform.value.respirationrate,

        //diagnosisid:this.physicianform.value.diagnosisid,
        //diagnosisList:this.physicianform.value.diagnosisdiscription,

        //diagnosisid:this.physicianform.value.diagnosisid,
        
        diagnosislist:this.physicianform.value.diagnosisdiscription,
        //diagnosisDescription: this.physicianform.value.diagnosisdiscription,
        
        //diagnosisisdepricated:this.physicianform.value.diagnosisisdepricated,
        //procedureId:this.physicianform.value.procedureid,
       // diagnosislist:JSON.parse(this.physicianform.value.diagnosisdiscription),
       procedureslist:this.physicianform.value.procedurediscription,
        //proceduredepricated:this.physicianform.value.proceduredepricated,
        //drugid:this.physicianform.value.drugid,
        druglist:this.physicianform.value.drugname,
        
        doctorDescription: this.physicianform.value.diagnosisdiscriptionifother,
        appointmentId: 'F15B843F-E04B-46A4-3817-08D9E5551C14',
        //appointments: ,
        createddate: new Date(),
       
      };
      let _that = this;
      this.patient
        .Getpatientvisitdetailsfromid(this.Guid)//need to change
        .then(async response => {
          response.text().then(responseData => {
            var result = JSON.parse(responseData);
            _that.postobj = result;
            this.Guid=_that.postobj.id;
            _that.bindToUI();
            
          });
        })
  
  
  this.patient.Addpatientvisitdetails(dat);
   alert("PatietDetails saved succesfully");
  
}
 
}
updatepatientdetails()
{
  if(this.physicianform.invalid)
  {
    alert("check all fields are filled");
   
  }
  else
  {
    
      var dat:patientvisitdetails=
      {
        height: this.nurseform.value.height,
        weight: this.nurseform.value.weight,
        bloodPressure: this.nurseform.value.bloodpressure,
        bodyTemprature: this.nurseform.value.bodytemprature,
        respirationRate: this.nurseform.value.respirationrate,

        //diagnosisid:this.physicianform.value.diagnosisid,
        //diagnosisList:this.physicianform.value.diagnosisdiscription,

        //diagnosisid:this.physicianform.value.diagnosisid,
        
        diagnosislist:this.physicianform.value.diagnosisdiscription,
        //diagnosisDescription: this.physicianform.value.diagnosisdiscription,
        
        //diagnosisisdepricated:this.physicianform.value.diagnosisisdepricated,
        //procedureId:this.physicianform.value.procedureid,
       // diagnosislist:JSON.parse(this.physicianform.value.diagnosisdiscription),
       procedureslist:this.physicianform.value.procedurediscription,
        //proceduredepricated:this.physicianform.value.proceduredepricated,
        //drugid:this.physicianform.value.drugid,
        druglist:['para','vicks'],
        
        doctorDescription: this.physicianform.value.diagnosisdiscriptionifother,
        appointmentId: 'F15B843F-E04B-46A4-3817-08D9E5551C14',
        //appointments: ,
        createddate: new Date(),
       
      };
      
      this.patient.UpdatePatientvisitdetails(dat,this.VisitId);
      alert("PatietDetails saved succesfully");
   
      this.fetchdata(this.Guid)
   }
  
  }

fetchdata(Id:any)
{
  
    let _that = this;
    this.patient
      .Getpatientvisitdetailsfromid(Id)
      .then(async response => {
        response.text().then(responseData => {
           var result = JSON.parse(responseData);
           _that.postobj = result;
          this.VisitId=_that.postobj.id;
         
          
          _that.bindToUI();
          
        });
      })

  
    this.SetConditionforvisibility();
    }

  bindToUI() {
    this.nurseform=new FormGroup
    ({
     //patientid:new FormControl(this.postobj.patientid?this.postobj.patientid:null,),
     height:new FormControl(this.postobj?.height,[Validators.required]),
     weight:new FormControl(this.postobj?.weight,[Validators.required]),
     bloodpressure:new FormControl(this.postobj?.bloodPressure,[Validators.required]),
     bodytemprature:new FormControl(this.postobj?.bodyTemprature,[Validators.required]),
     respirationrate:new FormControl(this.postobj?.respirationRate,[Validators.required])
    });
    this.physicianform=new FormGroup({
    diagnosisid:new FormControl(null,),
     diagnosisdiscription:new FormControl(this.postobj.diagnosislist? this.postobj.diagnosislist:null,[Validators.required]),
     diagnosisdiscriptionifother:new FormControl(
      this.postobj?.doctorDescription
     
     ),
    diagnosisisdepricated:new FormControl(null,),
     procedureid:new FormControl(null,),
     procedurediscription:new FormControl(this.postobj.procedureslist?this.postobj.procedureslist:null,[Validators.required]),
     proceduredepricated:new FormControl(null,),
    drugid:new FormControl(null,),
     drugname:new FormControl(this.postobj.druglist?this.postobj.druglist:null,),
     druggenericname:new FormControl(null,),
    drugbrandname:new FormControl(null,),
    drugform:new FormControl(null,[Validators.required]),
    });

    
}
getdiscriptiondetails()
{
  this.patient.GetDiagnosisdetails().subscribe((x) => {
    this.listOfdiagnosis.push(...x);
   console.log(this.listOfdiagnosis);
    for (let i = 0; i < this.listOfdiagnosis.length; i++) {
      this.listOfdiagnosisdiscription.push(this.listOfdiagnosis[i].description);
      var mySet = new Set(this.listOfdiagnosisdiscription);
      this.listOfdiagnosisdiscription = [...mySet];
     console.log(this.listOfdiagnosisdiscription);
     
    }
   
  });
}
getproceduredetails()
{
  this.patient.GetProceduredetails().subscribe((x) => {
    this.listOfprocedure.push(...x);
   
    for (let i = 0; i < this.listOfprocedure.length; i++) {
      this.listOfprocedurediscription.push(this.listOfprocedure[i].description);
      var mySet = new Set(this.listOfprocedurediscription);
      this.listOfprocedurediscription = [...mySet];
      
    }
    
  });
}
getmedicationdetails()
{
  this.patient.GetMedicationdetails().subscribe((x) => {
    this.listOfmedication.push(...x);
  });
}
SetConditionforvisibility()
{
 
  this.patient.GetRole(this.patientid) .then(async response => {
    response.text().then(responseData => {
       this.Rolename = responseData; 
       
 
  if((this.Rolename=="nurse") || (this.Rolename=="NURSE"))
  {
    this.patientvisitbuttonsave=true;
    this.patientvisitbuttonupdate=true;
    this.physicianform.disable();
    
  }
  else if(this.Rolename=="physician" || this.Rolename=='PHYSICIAN')
  {
   this.patientvisitbuttonsave=false;
   this.patientvisitbuttonupdate=true;
    this.nurseform.disable();
  }
  else if(this.Rolename=="PATIENT" || this.Rolename=='patient')
  {
    
    this.physicianform.disable();
    this.nurseform.disable();
    this.patientvisitbuttonsave=false;
    this.patientvisitbuttonupdate=false;
  }
})
});
}
cleardata()
{
  this.physicianform.reset();
  this.nurseform.reset();
}
ondiscriptionselect(event:any)
{
  if(event.value==='others')
  {
    this.physicianform.controls['diagnosisdiscriptionifother'].enable();
    //this.physicianform.getRawValue().
    //this.iseditable=false;
  }
  else if(event.value===!'others' || !(event.value ===''))
  {
    this.physicianform.controls['diagnosisdiscriptionifother'].disable();
  }

   this.patient.GetidfromDiagnosisdetails(event.value).subscribe(x =>this.diagnosisidlist=x) 
    {
      for(let i=0;i<this.diagnosisidlist.length;i++)
      {
        if(event.value==='others')
        {
          this.physicianform.controls['diagnosisid'].setValue('0');
        }
       else if(event.value===this.diagnosisidlist[i].description)
        {
          this.physicianform.controls['diagnosisid'].setValue(this.diagnosisidlist[i].id);
        }
      }
      
      //console.log(this.diagnosisidlist);
    }
//   this.physicianform.controls['diagnosisid'].patchValue(this.diagnosisobj.ID);
//  console.log(this.diagnosisobj);

}
onselectprocedure(event:any)
{
  if(event.value==='others')
  {
    //this.physicianform.controls['diagnosisdiscriptionifother'].enable();
    //this.physicianform.getRawValue().
    //this.iseditable=false;
  }
  else if(event.value===!'others' || !(event.value ===''))
  {
    //this.physicianform.controls['diagnosisdiscriptionifother'].disable();
  }

  //  this.patient.GetidfromDiagnosisdetails(event.value).subscribe(x =>this.diagnosisidlist=x) 
  //   {
      for(let i=0;i<this.listOfprocedure.length;i++)
      {
        if(event.value==='others')
        {
          this.physicianform.controls['procedureid'].setValue('0');
        }
       else if(event.value===this.listOfprocedure[i].description)
        {
          this.physicianform.controls['procedureid'].setValue(this.listOfprocedure[i].id);
        }
      }
      
      //console.log(this.diagnosisidlist);
    }
}
