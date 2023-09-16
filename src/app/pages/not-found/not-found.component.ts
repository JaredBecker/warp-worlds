import { Component } from '@angular/core';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
    constructor() {
        new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = error => reject(error);
            img.src = '/assets/images/404.svg';
        });
    }
}
