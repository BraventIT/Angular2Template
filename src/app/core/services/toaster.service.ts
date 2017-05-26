import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

@Injectable()
export class ToastrService {
    // https://github.com/stabzs/Angular2-Toaster

    constructor(public toastr: ToasterService) { }

    /**
     * Show an error window
     * @param message
     * @param title
     */
    showErrorMessage(message: string, title?: string) {
        this.toastr.pop('error', title, message);
    }

    /**
     * Show a success message window
     * @param {string} message the message
     * @param {string} [title] the title
     * @memberOf ToastrService
     */
    showSuccessMessage(message: string, title?: string) {
        this.toastr.pop('success', title, message);
    }

    /**
    * Show an info message window
    * @param message
    * @param title
    */
    showInfoMessage(message: string, title?: string) {
        this.toastr.pop('info', title, message);
    }

    /**
    * Show an info message window
    * @param message
    * @param title
    */
    showWarningMessage(message: string, title?: string) {
        this.toastr.pop('warning', title, message);
    }

    closeAllMessages() {
        this.toastr.clear();
    }
}
