import { TokenAuthService } from './token.service';
import { Constants } from './../constants';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

/**
 * Guard definition to check if the user has been logged in before navigating any place into the app.
 * @export
 * @class LoggedInGuard
 * @implements {CanActivate}
 */
@Injectable()
export class LoggedInGuard implements CanActivate {

    /**
     * This class provide a Guard to validate if the user can navigates to the app
     * @param loginService
     * @param router
     */
    constructor(private router: Router, private tokenService: TokenAuthService) {
    }

    canActivate() {

        if (this.tokenService.getToken() != null) {
            return true;
        }

        // send user to login view
        this.router.navigate([Constants.Routes.Home]);
        return false;
    }
}
