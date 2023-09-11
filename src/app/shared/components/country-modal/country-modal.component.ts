import { Component, Input } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Country } from '@shared/models/country.interface';

@Component({
    selector: 'app-country-modal',
    templateUrl: './country-modal.component.html',
    styleUrls: ['./country-modal.component.scss']
})
export class CountryModalComponent {
    @Input() public country!: Country;

    constructor(
        private modalService: NgbModal
    ) { }

    public closeModal() {
        this.modalService.dismissAll();
    }


}
