import { TokenAuthService } from './services/token.service';
import { RouterModule } from '@angular/router';
import { ReferenceDataService, StringService, ToastrService } from './services';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [],
    declarations: [],
    providers: [StringService, ReferenceDataService, ToastrService, TokenAuthService]
})
export class CoreModule { }
