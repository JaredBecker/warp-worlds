import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RegionFilterComponent } from './components/region-filter/region-filter.component';
import { CountryCardComponent } from './components/country-card/country-card.component';
import { CountryCardPlaceholderComponent } from './components/country-card-placeholder/country-card-placeholder.component';
import { CountryModalComponent } from './components/country-modal/country-modal.component';

import { CurrencyObjectValuesPipe } from './pipes/currency-object-values.pipe';
import { LanguagePipe } from './pipes/language.pipe';
import { CurrentLocalTimePipe } from './pipes/local-time.pipe';
import { SetActiveRegionDirective } from './directives/set-active-region.directive';
import { MarkAsSelectedDirective } from './directives/mark-as-selected.directive';

@NgModule({
    declarations: [
    RegionFilterComponent,
    CountryCardComponent,
    CountryCardPlaceholderComponent,
    CountryModalComponent,
    CurrencyObjectValuesPipe,
    LanguagePipe,
    CurrentLocalTimePipe,
    SetActiveRegionDirective,
    MarkAsSelectedDirective
  ],
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        NgbModule,
        RegionFilterComponent,
        CountryCardComponent,
        CountryCardPlaceholderComponent,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class SharedModule { }
