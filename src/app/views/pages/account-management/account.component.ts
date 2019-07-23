import { Component, OnInit, ViewChild, Directive, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator, MatAccordion, MatTreeNestedDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AccountService } from './services/account.service';
import { Observable } from 'rxjs';
import { PersonalInfo } from '../model/personalInfo';
import { FacialTokenImage } from '../model/FacialTokenImage';
// import { User } from  '../../../../core/auth/';
//import { User } from '../../../core/auth/';
import { User } from '../model/User';


import { NestedTreeControl } from '@angular/cdk/tree';
import { PersonasInfo } from '../model/PersonasInfo';
import { Persona } from '../model/Persona';
import { SecurityQuestion } from '../model/SecurityQuestion';
import { AuthNoticeService } from '../../../core/auth'
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';


interface CredInfo{  
  name: string;
  children?: CredInfo[];
  personType: string;
}

var TREE_DATA: CredInfo[] = [
  {         
    name: '',
    children: [],
    personType:'', 
  }
];

@Component({
  selector: 'kt-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {

  dataSource = new MatTreeNestedDataSource<CredInfo>();
  treeControl = new NestedTreeControl<CredInfo>(node => node.children); 

  selectedFile:string=null;
  account:Account[];
  fullName:String;
  personalForm: FormGroup;
  accountDetail:any={};
  loginForm: FormGroup;
  emailAddress:string;
  gender: string;
  firstName:string;  
  homePhone: string;
  dateOfBirth: string;
  id: number;
  personalInfo:PersonalInfo;
  userId:number;
  users : Observable<User[]>; 
  middleName: string; 
  lastName: string; 
  suffix: string;
  cellPhone: string;
  primaryAddressLine1: string;
  primaryAddressLine2: string;
  primaryAddressLine3: string;  
  primaryCity:string ;
  primaryCounty:string ;
  primaryState:string ;
  primaryCountry:string ;
  primaryZipcode:string ;
  secondaryAddressLine1:string ;
  secondaryAddressLine2:string ;
  secondaryAddressLine3:string ;
  secondaryCity:string ;
  secondaryCounty:string ;
  secondaryState:string ;
  secondaryCountry;
  secondaryZipcode:string ;
  isPrimaryMailingAddress:boolean;
  isSecondaryMailingAddress:boolean;
  nationalIdentityNumber1:string ;
  nationalIdentityNumber2:string ;
  externalId1:string ;
  externalId2:string ;
  facialTokenImage: FacialTokenImage;
  editPrimaryAddress:boolean=false;
  editSecondaryAddress:boolean=false;
  editHomePhone:boolean=false;
  editMobilePhone:boolean=false;
  editPersonalEmail:boolean=false;

  //LoginSecurity
  editAlternateLoginName:boolean=false;
  editPassword:boolean=false;
  editPhoneNumberForMFA_OTP:boolean=false;
  editEmailAddressForRecovery:boolean=false;
  inValidPassword:boolean=false;

  editSecurityQuestion: boolean=false;
  securityAnswer0: string;
  securityAnswer1: string;
  securityAnswer2: string;
  securityAnswer3: string;
  securityAnswer4: string;
  securityQues: [];


  //

  user: User;  
  loginName: string;
  password: string;
  alternateLoginName: string;
  phoneNumberForMFA_OTP:string;
  emailAddressForRecovery: string;
  securityQuestions: SecurityQuestion[];
  listOfSecurityQuestions: SecurityQuestion[];
  disableAddress:boolean=false;
  passwordObj:any=
  { password:'',
    newPassword:'',
    confirmPassword:''
  };
  

  personaInfo: PersonasInfo;
  personas: Persona[];
    
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatAccordion) accordion: MatAccordion;  
  
  constructor(private fb: FormBuilder,
    public restApi: AccountService, 
    private authNoticeService: AuthNoticeService,
    private translate: TranslateService,
    private toaster:ToastrService,
    public router: Router) { 
      this.dataSource.data = TREE_DATA;
    }
    
  ngOnInit() {  

    this.initForm();  
    if(!this.isPrimaryMailingAddress) {
      this.isSecondaryMailingAddress=true;
    }    
    this.loadLoggedInUser();
    this.loadUserPersonasInfoById();
    this.loadSecurityQuestionList();
  } 
  
  
  initForm(){
  
    this.personalForm = this.fb.group({
      emailAddress: [this.emailAddress, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(3),
            ])
      ],
      firstName: [this.firstName,Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      id: [this.id],
      suffix: [this.suffix],
      middleName: [this.middleName],
      lastName: [this.lastName],
      gender: [this.gender],
      cellPhone: [this.cellPhone],      
      homePhone: [this.homePhone],  
      dateOfBirth: new FormControl({value: this.dateOfBirth, disabled: true}),
      primaryAddressLine1: [this.primaryAddressLine1,Validators.required],
      primaryAddressLine2: [this.primaryAddressLine2],
      primaryAddressLine3: [this.primaryAddressLine3],
      primaryCity:[this.primaryCity,Validators.required],
	    primaryCounty:[this.primaryCounty,Validators.required],
	    primaryState:[this.primaryState,Validators.required],
	    primaryCountry:[this.primaryCountry,Validators.required],
	    primaryZipcode:[this.primaryZipcode,Validators.required],
	    secondaryAddressLine1:[this.secondaryAddressLine1,Validators.required],
	    secondaryAddressLine2:[this.secondaryAddressLine2],
	    secondaryAddressLine3:[this.secondaryAddressLine3],
	    secondaryCity:[this.secondaryCity],
	    secondaryCounty:[this.secondaryCounty],
	    secondaryState:[this.secondaryState],
	    secondaryCountry: [this.secondaryCountry],
	    secondaryZipcode:[this.secondaryZipcode],
      isPrimaryMailingAddress:new FormControl({value:this.isPrimaryMailingAddress,disabled:true}),
      nationalIdentityNumber1:[this.nationalIdentityNumber1],
      nationalIdentityNumber2:[this.nationalIdentityNumber2],
      externalId1:[this.externalId1],
      externalId2:[this.externalId2],
      facialTokenImage: [this.facialTokenImage]
            
    });  

   
    
	this.loginForm = this.fb.group({
      id: [this.id],
      loginName: [this.loginName],
      password: [this.password],
      alternateLoginName: [this.alternateLoginName],
      phoneNumberForMFA_OTP:[this.phoneNumberForMFA_OTP],
      emailAddressForRecovery: [this.emailAddressForRecovery],
      
      securityQues: this.fb.array([
       this.initSecurityAnswer()
      ])
    });  

  }

  initSecurityAnswer(){
    return this.fb.group({
      securityAnswer0: ['', Validators.required]
    })
  }

  loadLoggedInUser(){     
    this.restApi.getUserByLoginName(window.sessionStorage.getItem("username")).subscribe((data :User) => {      
    this.user=data;    
    this.loginForm.patchValue(data);      
    this.securityQuestions=data.securityQuetions;
    window.sessionStorage.setItem("id",data.id.toString());    
    this.loadPersonalInfoById(data.id.toString());  
    });      
} 


loadPersonalInfoById(id: string){
  this.restApi.getPersonalInfoById(id)
      .subscribe(data => {      
        this.accountDetail = data;
        this.personalForm.setValue(data);   
        
      });
      
}
loadUserPersonasInfoById(){
  this.restApi.getUserPersonasInfoById(window.sessionStorage.getItem("id"))
    .subscribe((data: PersonasInfo) => {    
      this.personas = data["persona"];
      var res =this.restApi.parseResponse(this.personas); 
      res.forEach(obj=>{ TREE_DATA.push(obj) });   
          });
}

loadSecurityQuestionList() {
  this.restApi.getAllSecurityQuestions()
    .subscribe((data: SecurityQuestion[]) => {

      this.listOfSecurityQuestions = data;
    });
}

onFileSelected(event){
this.selectedFile=event.target.files[0];
  console.log(event);
}

   changePrimaryAddress()
   {
     this.editPrimaryAddress=true;
   }
hasChild = (_: number, node: CredInfo) => !!node.children && node.children.length > 0;

   savePersonalInfo()
   {
    this.restApi.updatePersonalInfoById(window.sessionStorage.getItem("id"),this.personalForm.getRawValue())
      .subscribe( data => {
        this.accountDetail = data;
         this.personalForm.setValue(data);
         this.toaster.success('Personal Information Updated Successfully');
         this.resetPersonalInfo();
        

      },
      error => {
            
        this.toaster.error('Error while updating Personal Information due to '+ '' +error.error.error);
         return false;
     });

   }

   cancelPersonalInfo()
   {
    this.resetPersonalInfo();
    this.personalForm.getRawValue();
     this.personalForm.setValue(this.accountDetail);
     this.personalForm.getRawValue();
   }

   resetPersonalInfo()
   {
    this.editPrimaryAddress=false;
    this.editSecondaryAddress=false;
    this.editHomePhone=false;
    this.editMobilePhone=false;
    this.editPersonalEmail=false;
   }

   changeSecondaryAddress()
   {
     this.editSecondaryAddress=true;
     
   }
   saveSecondaryAddress()
   {
   }
   changeHomePhone()
   {
     this.editHomePhone=true;
   }
   changeMobilePhone()
   {
     this.editMobilePhone=true;
   }

   changePersonalEmail()
   {
     this.editPersonalEmail=true;
   }

   //Login Security Methods

   changeAlternateLoginName()
   {
     this.editAlternateLoginName=true;
   }
   changeEmailAddressRecovery()
   {
     this.editEmailAddressForRecovery=true;
   }

   changePhoneNumberForMFA_OTP()
   {
     this.editPhoneNumberForMFA_OTP=true;
   }

   changePassword()
   {
     this.editPassword=true;
   }

   changeSecurityQuestion()
   {
     this.editSecurityQuestion=true;
   }

   cancelLoginSecurity()
   {
    this.resetLoginSecurity();
    
    this.loginForm.getRawValue();
    this.loginForm.patchValue(this.user);
     this.loginForm.getRawValue();
   }
   resetLoginSecurity(){
    this.editAlternateLoginName=false;
    this.editEmailAddressForRecovery=false;
    this.editPhoneNumberForMFA_OTP=false;
    this.editPassword=false;
    this.passwordObj.newPassword='';
    this.passwordObj.confirmPassword='';
    this.passwordObj.password='';
   }

   saveLoginInfo()
   {
    if(this.passwordObj)
    {
     if(!(this.validatePassword(this.passwordObj.newPassword,this.passwordObj.confirmPassword)))
    {
      this.toaster.error('New Password and Confirm Password did not match!!')
      return false;
        }
        else{
          this.loginForm.controls['password'].setValue(this.passwordObj.newPassword);
         
        }

        if(!this.inValidPassword)
        {
        
    this.restApi.updateLoginInfoById(window.sessionStorage.getItem("id"),this.loginForm.getRawValue())
      .subscribe( data => {
        this.user = data;
         this.loginForm.patchValue(data);
        //  this.authNoticeService.setNotice('Login information updated successfully', 'success');
        this.toaster.success('Login information updated successfully');
        this.resetLoginSecurity();
      },
       error => {
             
      this.toaster.error('Error while updating Login information due to '+ ' '+ error.error.error);
        
        return false;
      });
       
    }
   }
  }

   private validatePassword(newPassword:string,confirmPassword:string){
     
  if(newPassword==confirmPassword)
  {
  return true;
  }
    else
 
  {
    return false;
  }
   }

   saveSecurityQuestion(){    
    window.alert("Save Securtiy Questions"+this.loginForm.controls['securityQues']);
   }

   cancelSecurityQuestion(){
     window.alert("Cancel Securtiy Questions");
     this.editSecurityQuestion=false;
   }

}


