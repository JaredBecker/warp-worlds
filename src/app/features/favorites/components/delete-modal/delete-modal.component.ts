import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
})
export class DeleteModalComponent {
    constructor(
        public modal: NgbActiveModal,
    ) { }
}
