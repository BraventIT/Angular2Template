import { ErrorLogService } from './error-log.service';
import { ToastrService } from './toaster.service';
import { Observable } from 'rxjs/Rx';
import { TokenAuthService } from './token.service';
import { Constants } from './../constants';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, RequestOptionsArgs, Response, Request, RequestMethod } from '@angular/http';
import { Router } from '@angular/router';

export enum Action { QueryStart, QueryStop };

/**
 * Class wrapper over the Angular Http Service which adds
 * the bearear token on each request
 * ( GET, POST, PUT.... )
 * @export
 * @class AuthHttp
 */
@Injectable()
export class AuthHttp {

    process: EventEmitter<any> = new EventEmitter<any>();
    authFailed: EventEmitter<any> = new EventEmitter<any>();

    constructor(private http: Http, private router: Router,
        private toastrService: ToastrService, private tokenService: TokenAuthService,
        private errorLogService: ErrorLogService) {
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._request(RequestMethod.Get, url, null, options);
    }

    public post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._request(RequestMethod.Post, url, body, options);
    }

    public put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._request(RequestMethod.Put, url, body, options);
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._request(RequestMethod.Delete, url, null, options);
    }

    public patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._request(RequestMethod.Patch, url, body, options);
    }

    public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._request(RequestMethod.Head, url, null, options);
    }

    private _request(method: RequestMethod, url: string, body?: string, options?: RequestOptionsArgs): Observable<Response> {
        let requestOptions = new RequestOptions(Object.assign({
            method: method,
            url: url,
            body: body
        }, options));

        if (!requestOptions.headers) {
            requestOptions.headers = new Headers();
        }

        const bearer = this.tokenService.getAccessToken();

        // if (bearer === '' || bearer === null) {
        //     this.toastr.showErrorMessage('The token expired');
        //     this._router.navigate([this.constants.Routes.Login]);
        // }

        requestOptions.headers.set('Authorization', bearer);
        requestOptions.headers.set('Accept', 'application/json');


        return Observable.create((observer) => {
            this.process.next(Action.QueryStart);

            this.http.request(new Request(requestOptions))
                // .map(res => res.json())
                .finally(() => {
                    this.process.next(Action.QueryStop);
                })
                .subscribe(
                (res) => {
                    observer.next(res);
                    observer.complete();
                },
                (err) => {
                    switch (err.status) {
                        case 401:
                            // intercept 401
                            this.toastrService.showErrorMessage(Constants.ErrorMessages.AuthorizationError);
                            console.log('intercept 401 AuthorizationError');
                            this.router.navigate([Constants.Routes.Home]);
                            this.authFailed.next(err);
                            observer.error(err);
                            break;
                        default:
                            this.errorLogService.logError(err);
                            observer.error(err);
                            break;
                    }
                });
        });
    }
}
