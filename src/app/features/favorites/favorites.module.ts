import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularEditorModule } from '@kolkov/angular-editor';

import { SharedModule } from '@shared/shared.module';
import { FavoritesRoutingModule } from './favorites.routing.module';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { FavoritesListingComponent } from './pages/favorites-listing/favorites-listing.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { ImageUploadModalComponent } from './components/image-upload-modal/image-upload-modal.component';

@NgModule({
    declarations: [
        CountryDetailsComponent,
        FavoritesListingComponent,
        DeleteModalComponent,
        ImageUploadModalComponent,
    ],
    imports: [
        CommonModule,
        FavoritesRoutingModule,
        SharedModule,
        AngularEditorModule
    ]
})
export class FavoritesModule { }
