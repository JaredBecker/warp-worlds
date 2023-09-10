import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RegionFilterComponent } from './components/region-filter/region-filter.component';
import { CountryCardComponent } from './components/country-card/country-card.component';
import { CountryCardPlaceholderComponent } from './components/country-card-placeholder/country-card-placeholder.component';
import { CountryModalComponent } from './components/country-modal/country-modal.component';

@NgModule({
    declarations: [
    RegionFilterComponent,
    CountryCardComponent,
    CountryCardPlaceholderComponent,
    CountryModalComponent
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
        CountryCardPlaceholderComponent
    ]
})
export class SharedModule { }
