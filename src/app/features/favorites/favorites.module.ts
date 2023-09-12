import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { FavoritesRoutingModule } from './favorites.routing.module';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { FavoritesListingComponent } from './pages/favorites-listing/favorites-listing.component';

@NgModule({
    declarations: [
        CountryDetailsComponent,
        FavoritesListingComponent
    ],
    imports: [
        CommonModule,
        FavoritesRoutingModule,
        SharedModule
    ]
})
export class FavoritesModule { }
