import { environment } from '../../environments/environment';

const API_BASE_ENDPOINT: string = environment.API_Url;

export const Constants = Object.freeze({
    Routes: {
        Home: ''
    },
    EndPoints: {
        Test: {
            // endpoint fake para ejemplo simple en home service
            prueba: API_BASE_ENDPOINT + ''
        },
        ReferenceData: {
            // endpoint fake usado en el servicio de reference-data
            GetReferenceDataEjemplo: API_BASE_ENDPOINT + ''
        }
    },
    ErrorMessages: {
        ErrorGenerico: 'Ha ocurrido un error en su petición. Por favor inténtelo de nuevo más tarde.',
        AuthorizationError: 'No esta autorizado para acceder.'
    },
    LocalStorage_Auth_Token: 'awu_auth_token',
    Access_Control_Origin: '*'
});
