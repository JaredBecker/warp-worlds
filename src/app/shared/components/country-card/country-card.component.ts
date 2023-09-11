import { Component, Input } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Country } from '@shared/models/country.interface';
import { CountryModalComponent } from '../country-modal/country-modal.component';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent {
    @Input() public country!: Country;
    @Input() public use_modal: boolean = true;

    constructor(
        private modalService: NgbModal,
    ) { }

    public onSelectCountry() {
        if (this.use_modal) {
            const modalRef = this.modalService.open(CountryModalComponent);
            modalRef.componentInstance.country = this.country;
        } else {
            console.log('navigate by url on fav page');
        }
    }
}
