import { OrgInfo } from "./OrgInfo";
import { CredentialInfo } from "./CredentialInfo";

export class Persona {
    personType: string;
    credentialInfo : CredentialInfo[];
    orgInfo: OrgInfo;
}