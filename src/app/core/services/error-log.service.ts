import { ToastrService } from './toaster.service';
import { Constants } from './../constants';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorLogService {

    constructor(private toastr: ToastrService) {
    }

    /**
     * log the given error to various aggregation and tracking services.
     *
     * @param {*} error
     * @memberOf ErrorLogService
     */
    public logError(error: any): void {

        // Internal tracking.
        this.sendToConsole(error);
    }

    /**
     * Send the error the browser console (safely, if it exists).
     *
     * @param {*} error
     * @memberOf ErrorLogService
     */
    private sendToConsole(error: any): void {

        if (console && console.group && console.error) {

            console.group('Error Log Service');
            if (error.Message !== null && error.Message !== undefined && error.Message !== '') {
                this.toastr.showErrorMessage(error.Message);
            } else {
                this.toastr.showErrorMessage(Constants.ErrorMessages.ErrorGenerico);
            }
            console.error(error);
            console.groupEnd();
        }
    }
}
