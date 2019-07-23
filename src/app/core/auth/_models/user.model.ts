import { BaseModel } from '../../_base/crud';
import { Address } from './address.model';
import { SocialNetworks } from './social-networks.model';

export class User extends BaseModel {
    id: number;
    username: string;
    password: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    roles: number[];
    pic: string;
    fullname: string;
    occupation: string;
	companyName: string;
	phone: string;
    address: Address;
    socialNetworks: SocialNetworks;

   // id: number;
    loginName: string;
   // password: string;
    alternateLoginName: string
    phoneNumberForMFA_OTP: string;
    emailAddressForRecovery: string;
    securityQuetions: string[]; 

    clear(): void {
       
        this.loginName ='';   
        this.alternateLoginName='';
        this.phoneNumberForMFA_OTP='';
        this.emailAddressForRecovery='';
        this.securityQuetions =[]; 


        this.id = undefined;
        this.username = '';
        this.password = '';
        this.email = '';
        this.roles = [];
        this.fullname = '';
        this.accessToken = '';
        this.refreshToken = '';
        this.pic = './assets/media/users/default.jpg';
        this.occupation = '';
        this.companyName = '';
        this.phone = '';
        this.address = new Address();
        this.address.clear();
        this.socialNetworks = new SocialNetworks();
        this.socialNetworks.clear();
    }
}
