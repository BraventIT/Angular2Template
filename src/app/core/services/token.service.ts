import { Constants } from './../constants';
import { Injectable } from '@angular/core';
import 'localStorage';

@Injectable()
export class TokenAuthService {

    private auth_token;

    constructor() {
        this.auth_token = Constants.LocalStorage_Auth_Token;
    }

    /**
     * Store the token (in the localstorage)
     * @param {string} token
     * @memberOf TokenAuthService
     */
    storeToken(token: any): void {
        localStorage.setItem(this.auth_token, JSON.stringify(token));
    }

    /**
     * Remove the token
     * @memberOf TokenAuthService
     */
    clearToken() {
        localStorage.removeItem(this.auth_token);
    }

    /**
     * Gets the Store Access Token
     * @returns 'Bearer XXXXXXX'
     * @memberOf TokenAuthService
     */
    getAccessToken(): string {
        const token = this.getToken();

        if (token !== null && token !== '') {
            return 'Bearer ' + token.access_token;
        }

        return null;
    }

    /**
     * Checks the validity of the token
     * @returns true if the token is valid
     * @memberOf TokenAuthService
     */
    isTheTokenValid(): boolean {
        const token = this.getToken();

        if (token != null) {
            const cTs = Math.floor(Date.now() / 1000);
            return (token.expires_in >= cTs);
        }

        return false;
    }

    getToken(): any {
        const token = localStorage.getItem(this.auth_token);

        if (token != null && token !== '') {
            return JSON.parse(token);
        }

        return null;
    }
}
