import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private toastrService: ToastrService,
    ) {}

    public showToast() {
        this.toastrService.success('This is the message', 'This is the title');
    }
}
