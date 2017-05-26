import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService, SecurityService, Constants } from './../core';
import { Component, OnInit } from '@angular/core';
import * as redux from '../redux';
import { HomeService } from './home.service';

@Component({
    selector: 'app-home-component',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private toasterService: ToastrService,
        private store: Store<redux.Reducers.State>,
        private homeService: HomeService,
        private securityService: SecurityService,
        private router: Router) { }

    ngOnInit() {
        this.store.dispatch(new redux.Actions.GlobalUI.SetSpinnerVisibility(false));
    }
}
