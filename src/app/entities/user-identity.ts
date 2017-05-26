export class UserIdentity {

    nombre: string;
    apellidos: string;
    userPrincipalName: string;
    accessToken: string;
    idToken: string;

    constructor(item?: any) {

        this.nombre = item && item.nombre ? item.nombre : '';
        this.apellidos = item && item.apellidos ? item.apellidos : '';
        this.userPrincipalName = item && item.userPrincipalName ? item.userPrincipalName : '';
        this.accessToken = item && item.accessToken ? item.accessToken : '';
        this.idToken = item && item.idToken ? item.idToken : '';
    }
}
