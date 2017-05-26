import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromActions from '../../redux/actions';
import * as fromReducers from '../../redux/reducers';
import { UserIdentity } from '../../entities/user-identity';
import { TokenAuthService } from './token.service';

export enum Pages {
}

/**
 * This Service provide us mthods to log in and log out an user into the app
 * Also provide us properties to know the roles of the user logged.
 * @export
 * @class SecurityService
 */
@Injectable()
export class SecurityService {

    private _user: UserIdentity;

    constructor(private tokenService: TokenAuthService, private store: Store<fromReducers.State>) {
        this.store.select(fromReducers.getUserInfo).subscribe(x => this._user = x);
        this.reloadUserFromToken();
    }

    /**
     * get the name of the logged user
     * @readonly
     * @type {string}
     * @memberOf SecurityService
     */
    get userName(): string {
        if (this._user) {
            return this._user.nombre;
        }
    }

    /**
     * log the user into the system
     * - store the token
     * @param {*} token
     * @memberOf SecurityService
     */
    logInUser(token: any): boolean {

        if (token) {
            this.tokenService.storeToken(token);
            const user = this.getUserIdentityFromToken(token);
            this.store.dispatch(new fromActions.GlobalUI.SetUser(user));
        }

        return false;
    }

    /**
     * Log out the user from the system
     * @memberOf SecurityService
     */
    logOutUser() {
        this.tokenService.clearToken();
        this.store.dispatch(new fromActions.GlobalUI.ClearUser());
    }

    /**
     * return true if the user can navigate to the selected view
     * @param {Pages} page
     * @returns {boolean}
     * @memberOf SecurityService
     */
    canUserAccess(page: Pages): boolean {
        return true;
    }

    private getUserIdentityFromToken(token: any): UserIdentity {

        if (!token) {
            return null;
        }

        const user = new UserIdentity(token);

        return user;
    }

    /**
     * If user refreshes the view, we have to set the user identity object again on REDUX
     *
     * @private
     *
     * @memberOf SecurityService
     */
    private reloadUserFromToken() {

        const token = this.tokenService.getToken();
        if (token) {
            const user = this.getUserIdentityFromToken(token);
            this.store.dispatch(new fromActions.GlobalUI.SetUser(user));
        }
    }
}
