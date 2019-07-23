

import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account-management/services/account.service';
import { ToastrService } from 'ngx-toastr';


/**
* @title Basic expansion panel
*/
@Component({
  selector: 'kt-my-page',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {

  applicationData:any[];
  searchApplication:string;
  dataLoading:boolean=false;
  ngOnInit() {
  
    this.getApplications();
  }

  constructor( public restApi: AccountService,private toaster:ToastrService,)
  {
    
  }

  getApplications(){
    this.dataLoading=true;
    this.restApi.getAllApplications()
      .subscribe( data => {
     
        this.applicationData = data;
        //  this.authNoticeService.setNotice('Login information updated successfully', 'success');
        this.dataLoading=false;
        
      },
       error => {
             
      this.toaster.error('Error while loading applications due to '+ ' '+ error.error.error);
      this.dataLoading=false;
        return false;
      });
       
  }
}
