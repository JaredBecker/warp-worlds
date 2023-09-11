import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Country } from '@shared/models/country.interface';
import { FavoritesService } from '@shared/services/favorites.service';

@Component({
    selector: 'app-country-modal',
    templateUrl: './country-modal.component.html',
    styleUrls: ['./country-modal.component.scss']
})
export class CountryModalComponent implements OnInit, OnDestroy {
    @Input() public country!: Country;

    public in_favorites: boolean = false;

    private _favorite_countries_subscription?: Subscription;

    constructor(
        private modalService: NgbModal,
        private favoritesService: FavoritesService,
    ) { }

    public ngOnInit(): void {
        this._favorite_countries_subscription = this.favoritesService
            .getFavoriteCountriesStream()
            .subscribe({
                next: (favorite_countries) => {
                    const formatted_name = this.country.name.common.replaceAll(' ', '');

                    if (favorite_countries[formatted_name]) {
                        this.in_favorites = true;
                    } else {
                        this.in_favorites = false;
                    }
                }
            })
    }

    public ngOnDestroy(): void {
        this._favorite_countries_subscription?.unsubscribe();
    }

    public closeModal() {
        this.modalService.dismissAll();
    }

    public onAddToFavorites(country: Country) {
        this.favoritesService.addToFavorites(country);
    }

    public onRemoveFromFavorites(common_name: string) {
        this.favoritesService.removeFromFavorites(common_name);
    }
}
