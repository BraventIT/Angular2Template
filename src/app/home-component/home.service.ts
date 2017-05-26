import { StringService, Constants, AuthHttp } from './../core';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HomeService {

    constructor(private http: AuthHttp, private stringService: StringService) { }

    /**
     * Metodo de ejemplo
     *
     * @param {string} idTest
     * @returns {Observable<any>}
     *
     * @memberOf HomeService
     */
    getTest(idTest: string): Observable<any> {

        const url = this.stringService.stringFormat([Constants.EndPoints.Test.prueba, idTest]);

        return this.http
            .get(url)
            .map((res: Response) => res.json());
    }
}
