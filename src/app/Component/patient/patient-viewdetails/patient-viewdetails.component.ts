import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import { Allergy } from 'src/app/models/allergy-model';
import { diagnosis } from 'src/app/models/diagnosis-model';
//import { logKeyValuePairs } from 'src/app/models/Globalfunctions';
import { medication } from 'src/app/models/medication-model';
import { patientvisitdetails } from 'src/app/models/patientvisitdetails';
import { procedure } from 'src/app/models/procedure-model';
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
  role:string="nurse";
  constructor(private patient:patientdetails,private router: Router,private route:ActivatedRoute) { }
  height?:number;
  // public variables = ['One','Two','County', 'Three', 'Zebra', 'XiOn'];
  // public variables2 = [{ id: 0, name: 'One' }, { id: 1, name: 'Two' }];;Validators.pattern(^\d*\.?\d{0,2}$/g)]
  //^[0-9]+$
  public filteredList1: any;
  public filteredList2: any;
  public filteredList3:any;

    
  ngOnInit(): void 
  {
    
    // this.patient.Getpatientvisitdetailsfromid(1).subscribe((x)=>{console.log(x)});
      
    // // this.patient.Observeevent()
    //     console.log(this.postobj);
    
    
    //this.SetConditionforvisibility();
    //console.log(this.previousdetails);
    //this.fetchdata();
    this.SetConditionforvisibility();
    this. getdiscriptiondetails();
    
    this.filteredList1= this.listOfdiagnosisdiscription.slice();
    this.getproceduredetails();
    this.filteredList2= this.listOfprocedurediscription.slice();
    this.getmedicationdetails();
    //this.filteredList3=this.listOfmedication.slice();
  this.route.queryParams.subscribe((params)=>
  {
     this.Guid+=params['guidId'];
     alert(this.Guid)
  })

  if(this.Guid!=null)
  {
   
    this.fetchdata(this.Guid);
  }

  
    
  }


  

Addupdatepatientdetails(index:number)
{
  
  if(this.nurseform.invalid || this.physicianform.invalid)
  {
    alert("check all fields are filled");
    console.log(this.nurseform);
  }
  else
  {
  console.log(this.nurseform);
  this.postobj.id=this.nurseform.value.id;
  this.postobj.patientid;
  this.postobj.height=this.nurseform.value.height;
  this.postobj.weight=this.nurseform.value.weight;
  this.postobj.bloodpressure=this.nurseform.value.bloodpressure;
  this.postobj.bodytemprature=this.nurseform.value.bodytemprature;
  this.postobj.respirationrate=this.nurseform.value.respirationrate;
  
  this.postobj.diagnosisid=this.physicianform.value.diagnosisid;
  this.postobj.diagnosisdiscription=this.physicianform.value.diagnosisdiscription;

  this.postobj.diagnosisdiscription=this.physicianform.value.diagnosisdiscription;
  this.postobj.diagnosisisdepricated=this.physicianform.value.diagnosisisdepricated;
  this.postobj.procedureid=this.physicianform.value.procedureid;
  this.postobj.procedurediscription=this.physicianform.value.procedurediscription;
  this.postobj.proceduredepricated=this.physicianform.value.proceduredepricated;
  this.postobj.drugid=this.physicianform.value.drugid;
  this.postobj.drugname=this.physicianform.value.drugname;
  this.postobj.druggenericname=this.physicianform.value.druggenericname;
  this.postobj.drugbrandname=this.physicianform.value.drugbrandname;
  this.postobj.drugform=this.physicianform.value.drugform;
  
  if(index==0)
  {
  this.patient.Addpatientvisitdetails(this.postobj);
   alert("PatietDetails saved succesfully");
  // this.fetchdata()
  }
  else
  {
      this.patient.UpdatePatientvisitdetails(this.postobj,this.postobj.id).subscribe((result)=>
      {
           console.log(result);
      });
     
      alert("successfully update record");
  }
}
}

fetchdata(Id?:number)
{
  //alert(Id);
   this.patient.Getpatientvisitdetailsfromid(Id?Id:0).subscribe(result => this.postobj = result);
  // console.log(this.postobj);
   this.nurseform=new FormGroup
   ({
    patientid:new FormControl(this.postobj.patientid?this.postobj.patientid:null,),
    height:new FormControl(this.postobj.height?this.postobj.height:null,[Validators.required]),
    weight:new FormControl(this.postobj.weight?this.postobj.weight:null,[Validators.required]),
    bloodpressure:new FormControl(this.postobj.bloodpressure?this.postobj.bloodpressure:null,[Validators.required]),
    bodytemprature:new FormControl(this.postobj.bodytemprature?this.postobj.bodytemprature:null,[Validators.required]),
    respirationrate:new FormControl(this.postobj.respirationrate?this.postobj.respirationrate:null,[Validators.required])
   });
   this.physicianform=new FormGroup({
    diagnosisid:new FormControl(this.postobj.diagnosisid?this.postobj.diagnosisid:null,),
    diagnosisdiscription:new FormControl(this.postobj.diagnosisdiscription?this.postobj.diagnosisdiscription:null,[Validators.required]),
    diagnosisdiscriptionifother:new FormControl({
      value : '',
      disabled: this.iseditable
    }),
    diagnosisisdepricated:new FormControl(this.postobj.diagnosisisdepricated?this.postobj.diagnosisisdepricated:null,),
    procedureid:new FormControl(this.postobj.procedureid?this.postobj.procedureid:null,),
    procedurediscription:new FormControl(this.postobj.procedurediscription?this.postobj.procedurediscription:null,[Validators.required]),
    proceduredepricated:new FormControl(this.postobj.proceduredepricated?this.postobj.proceduredepricated:null,),
    drugid:new FormControl(this.postobj.drugid?this.postobj.drugid:null,),
    drugname:new FormControl(this.postobj.drugname?this.postobj.drugname:null,),
    druggenericname:new FormControl(this.postobj.druggenericname?this.postobj.druggenericname:null,),
    drugbrandname:new FormControl(this.postobj.drugbrandname?this.postobj.drugbrandname:null,),
    drugform:new FormControl(this.postobj.drugform?this.postobj.drugform:null,[Validators.required]),

    
   
    });
  this.SetConditionforvisibility();
}
getdiscriptiondetails()
{
  this.patient.GetDiagnosisdetails().subscribe((x) => {
    this.listOfdiagnosis.push(...x);
   //console.log(this.listOfdiagnosis);
    for (let i = 0; i < this.listOfdiagnosis.length; i++) {
      this.listOfdiagnosisdiscription.push(this.listOfdiagnosis[i].Description);
      var mySet = new Set(this.listOfdiagnosisdiscription);
      this.listOfdiagnosisdiscription = [...mySet];
    // console.log(this.listOfdiagnosisdiscription);
     
    }
    //console.log(this.listOfdiagnosisdiscription);
  });
}
getproceduredetails()
{
  this.patient.GetProceduredetails().subscribe((x) => {
    this.listOfprocedure.push(...x);
   //console.log(this.listOfprocedure);
    for (let i = 0; i < this.listOfprocedure.length; i++) {
      this.listOfprocedurediscription.push(this.listOfprocedure[i].ProcedureDescription);
      var mySet = new Set(this.listOfprocedurediscription);
      this.listOfprocedurediscription = [...mySet];
      //console.log(this.listOfprocedurediscription);
     //console.log(myArr);
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
  if(this.role=="nurse")
  {
   // logKeyValuePairs(this.physicianform,1)
    this.physicianform.disable();
  }
  else if(this.role=="physician")
  {
    //logKeyValuePairs(this.nurseform,1)
    this.nurseform.disable();
  }
  else
  {
    //logKeyValuePairs(this.nurseform)\
    this.physicianform.disable();
    this.nurseform.disable();
  }

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
       else if(event.value===this.diagnosisidlist[i].Description)
        {
          this.physicianform.controls['diagnosisid'].setValue(this.diagnosisidlist[i].ID);
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
       else if(event.value===this.listOfprocedure[i].ProcedureDescription)
        {
          this.physicianform.controls['procedureid'].setValue(this.listOfprocedure[i].ID);
        }
      }
      
      //console.log(this.diagnosisidlist);
    }
}
