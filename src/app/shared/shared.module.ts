import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RegionFilterComponent } from './components/region-filter/region-filter.component';

@NgModule({
    declarations: [
    RegionFilterComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        NgbModule
    ],
    exports: [
        NgbModule,
        RegionFilterComponent,
    ]
})
export class SharedModule { }
