import { Component, Input } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Country } from '@shared/models/country.interface';
import { CountryModalComponent } from '@shared/components/country-modal/country-modal.component';
import { FavoritesService } from '@shared/services/favorites.service';

@Component({
    selector: 'app-country-card',
    templateUrl: './country-card.component.html',
    styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent {
    @Input() public country!: Country;
    @Input() public use_modal: boolean = true;

    // Using string to update button state text because changing it in directive is bad practice
    public select: string = 'Select';

    constructor(
        private modalService: NgbModal,
        private favoritesService: FavoritesService,
    ) { }

    /**
     * Handles what should happen when clicking on country card.
     * Either displays modal or redirects to favorites page
     */
    public onSelectCountry() {
        if (this.use_modal) {
            const modalRef = this.modalService.open(CountryModalComponent);
            modalRef.componentInstance.country = this.country;
        } else {
            console.log('navigate by url on fav page');
        }
    }

    public selectFavorite(event: Event) {
        // Stop the anchor tag opening modal or redirecting
        event.stopPropagation();

        // Update button text
        this.select = this.select === 'Select' ? 'Selected' : 'Select';

        this.favoritesService.toggleCurrentlySelected(this.country);
    }
}
