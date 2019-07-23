import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../../../../core/auth';
import { Observable, throwError } from 'rxjs';
import { PersonalInfo } from '../../model/personalInfo';
import { retry, catchError } from 'rxjs/operators';
import { Persona } from '../../model/Persona';
import { SecurityQuestion } from '../../model/SecurityQuestion';



class CredNode { 
  constructor(
    public name: string, 
    public children: any[],
    public personType,){}
  }


@Injectable({
  providedIn: 'root'
})
export class AccountService {
    
  baseUrl: string = 'http://localhost:8080/admin/api/v1/';
 
   // Http Options
   httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': "Bearer "+JSON.parse(window.sessionStorage.getItem('token')).access_token
    })
    }
    
  constructor(private http: HttpClient) { }

  getPersonalInfoById(userid:string): Observable<any> {
    return this.http.get(this.baseUrl+'user/personalInfo/'+userid,this.httpOptions).pipe(retry(1), catchError(this.handleError));  

    
  }

  getUserByLoginName(username: string) : Observable<any>{   
     return this.http.get(this.baseUrl+'user/auth/'+username,this.httpOptions).pipe(retry(1), catchError(this.handleError));     

  }

  getUserPersonasInfoById(userid: string): Observable<any> {
    return this.http.get(this.baseUrl+'user/persona/'+userid,this.httpOptions).pipe(retry(1), catchError(this.handleError));     

  }

  getAllSecurityQuestions(): Observable<SecurityQuestion[]> {
    return this.http.get<SecurityQuestion[]>(this.baseUrl+'user/auth/securityQuestions',this.httpOptions).pipe(retry(1), catchError(this.handleError));  
  }

  updatePersonalInfoById(userid:string,personalInfo:PersonalInfo): Observable<any> {
    return this.http.put(this.baseUrl+'user/personalInfo/'+userid,personalInfo,this.httpOptions).pipe(retry(1), catchError(this.handleError));  
  }
  updateLoginInfoById(userid:string,user:User): Observable<any> {
    return this.http.put(this.baseUrl+'user/auth/'+userid ,user,this.httpOptions).pipe(retry(1), catchError(this.handleError));  
  }
  getAllApplications(): Observable<any> {
    return this.http.get(this.baseUrl+'user/application/all',this.httpOptions).pipe(retry(1), catchError(this.handleError));  }

  parseResponse(personas: Persona[]): any[] {     
    var parentArray=[];
      for(var i=0; i<personas.length;i+=1){
        if(personas[i].credentialInfo.length>0){
          var childArr= [];
          for(var j=0;j<personas[i].credentialInfo.length;j+=1){ 
            var det =personas[i].credentialInfo[j].details;
            var childArray =[];
            for(var prop in det){            
              const arr =[];
                  var item :any;                
                  if(det[prop] != null){
                    var jsonObj = [];
                    if(prop=="groups"){
                      var childata=det[prop];                 
                      for(var data in childata){
                          item = {};
                          item ["name"] = childata[data];        
                          jsonObj.push(item);                 
                        }
                        childArray.push(new CredNode(prop,jsonObj,personas[i].personType));              
                    }
                    else{
                      item = {};
                      jsonObj = [];
                      item ["name"] = det[prop]; 
                      jsonObj.push(item);
                      childArray.push(new CredNode(prop,jsonObj,personas[i].personType));  
                    }
                  }      
              } 
              item = {};
              jsonObj = [];
              item ["name"] = personas[i].credentialInfo[j].accountType; 
              item ["personType"] = personas[i].personType; 
              jsonObj.push(item);             
              parentArray.push(new CredNode(personas[i].credentialInfo[j].accountType,childArray,personas[i].personType));             
            }      
        } 
    }
    return parentArray;  
  } 

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
  
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}

