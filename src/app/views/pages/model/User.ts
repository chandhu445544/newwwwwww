import { SecurityQuestion } from "./SecurityQuestion";

export class User {
    id: number;
    loginName: string;
    alternateLoginName: string       
    password: string;      
    phoneNumberForMFA_OTP: string;
    emailAddressForRecovery: string;
    securityQuetions: SecurityQuestion[];  
}