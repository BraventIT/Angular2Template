import { Store } from '@ngrx/store';
import * as redux from './redux';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  showSpinner = false;

  constructor(private store: Store<redux.Reducers.State>) {
  }

  ngOnInit() {

    /**
     * Suscripcion para saber si hay que mostrar loading spinner
     */
    this.store.select(redux.Reducers.getShowSpinner).subscribe(x => {
        setTimeout(() => {
          this.showSpinner = x;
        }, 1);
      });
  }
}
