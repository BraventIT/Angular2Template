import { StringService } from './string.service';
import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Constants } from './../constants';
import * as entities from '../../entities';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ReferenceDataService {

    private ejemplo_values: entities.CodeValue[];

    constructor(private http: Http, private stringService: StringService) {
    }

    /**
    * Metodo de ejemplo para obtener datos de referencia con la clasica entidad code-value
    */
    getCodeValueMethod(): Observable<entities.CodeValue[]> {

        if (this.ejemplo_values) {
            return Observable.of(this.ejemplo_values);
        } else {
            return Observable.create(observer => {
                this.http.get(Constants.EndPoints.ReferenceData.GetReferenceDataEjemplo)
                    .map((res: Response) => res.json())
                    .subscribe((x) => {
                        this.ejemplo_values = x;
                        observer.next(x);
                        observer.complete();
                    });
            });
        }
    }
}
