import { ErrorHandler } from '@angular/core';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { ErrorLogService } from './error-log.service';

export interface LoggingErrorHandlerOptions {
    rethrowError: boolean;
    unwrapError: boolean;
}

export let LOGGING_ERROR_HANDLER_OPTIONS: LoggingErrorHandlerOptions = {
    rethrowError: false,
    unwrapError: true
};

@Injectable()

export class LoggingErrorHandler implements ErrorHandler {

    // CAUTION: The core implementation of the ErrorHandler class accepts a boolean
    // parameter, `rethrowError`; however, this is not part of the interface for the
    // class. In our version, we are supporting that same concept; but, we are doing it
    // through an Options object (which is being defaulted in the providers).

    /**
     * Creates an instance of LoggingErrorHandler.
     * @param {ErrorLogService} errorLogService
     * @param {LoggingErrorHandlerOptions} options
     *
     * @memberOf LoggingErrorHandler
     */
    constructor(private errorLogService: ErrorLogService,
        @Inject(LOGGING_ERROR_HANDLER_OPTIONS) private options: LoggingErrorHandlerOptions) {

    }

    /**
     * Handle the given error.
     *
     * @param {*} error
     * @memberOf LoggingErrorHandler
     */
    public handleError(error: any): void {

        // Send to the error-logging service.
        try {
            this.options.unwrapError
                ? this.errorLogService.logError(this.findOriginalError(error))
                : this.errorLogService.logError(error);
        } catch (loggingError) {
            console.group('ErrorHandler');
            console.warn('Error when trying to log error to', this.errorLogService);
            console.error(loggingError);
            console.groupEnd();
        }

        if (this.options.rethrowError) {
            throw (error);
        }
    }

    // I attempt to find the underlying error in the given Wrapped error.
    private findOriginalError(error: any): any {
        while (error && error.originalError) {
            error = error.originalError;
        }
        return (error);
    }
}

// I am the collection of providers used for this service at the module level.
// Notice that we are overriding the CORE ErrorHandler with our own class definition.
// --
// CAUTION: These are at the BOTTOM of the file so that we don't have to worry about
// creating futureRef() and hoisting behavior.
export let LOGGING_ERROR_HANDLER_PROVIDERS = [

    {
        provide: LOGGING_ERROR_HANDLER_OPTIONS,
        useValue: LOGGING_ERROR_HANDLER_OPTIONS
    },
    {
        provide: ErrorHandler,
        useClass: LoggingErrorHandler
    }
];
