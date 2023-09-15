import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { FavoritesListingComponent } from './pages/favorites-listing/favorites-listing.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'view-all',
                component: FavoritesListingComponent
            },
            {
                path: 'view/:country-name',
                component: CountryDetailsComponent
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FavoritesRoutingModule { }
