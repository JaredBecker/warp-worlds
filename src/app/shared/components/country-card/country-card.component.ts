import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Country } from '@shared/models/country.interface';
import { CountryModalComponent } from '@shared/components/country-modal/country-modal.component';
import { FavoritesService } from '@shared/services/favorites.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-country-card',
    templateUrl: './country-card.component.html',
    styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent implements OnInit, OnDestroy {
    @Input() public country!: Country;
    @Input() public use_modal: boolean = true;

    public select: string = 'Select';

    private _currently_selected_sub?: Subscription;

    constructor(
        private modalService: NgbModal,
        private favoritesService: FavoritesService,
        private router: Router,
    ) { }

    public ngOnInit(): void {
        this._currently_selected_sub = this.favoritesService
            .getCurrentlySelectedCountStream()
            .subscribe({
                next: (count) => {
                    // Use count to track once favorite countries have been added and reset
                    if (count === 0) {
                        this.select = 'Select';
                    }
                }
            })
    }

    public ngOnDestroy(): void {
        this._currently_selected_sub?.unsubscribe();
    }

    /**
     * Handles what should happen when clicking on country card.
     * Either displays modal or redirects to favorites page
     */
    public onSelectCountry(): void {
        if (this.use_modal) {
            const modalRef = this.modalService.open(CountryModalComponent);
            modalRef.componentInstance.country = this.country;
        } else {
            this.router.navigate(['/favorites/view', this.country.name.common]);
        }
    }

    public onSelectFavorite(event: Event): void {
        // Stop the anchor tag opening modal or redirecting
        event.stopPropagation();
        this.select = this.select === 'Select' ? 'Selected' : 'Select';
        this.favoritesService.toggleCurrentlySelected(this.country);
    }

    public onRemoveFavorite(event: Event) {
        event.stopPropagation();
        this.favoritesService.removeFromFavorites(this.country.name.common);
    }
}
