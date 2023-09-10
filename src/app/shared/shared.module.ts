import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RegionFilterComponent } from './components/region-filter/region-filter.component';
import { CountryCardComponent } from './components/country-card/country-card.component';

@NgModule({
    declarations: [
    RegionFilterComponent,
    CountryCardComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        NgbModule
    ],
    exports: [
        NgbModule,
        RegionFilterComponent,
        CountryCardComponent,
    ]
})
export class SharedModule { }
