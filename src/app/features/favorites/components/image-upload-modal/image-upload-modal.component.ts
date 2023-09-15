import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subscription, debounceTime, distinctUntilChanged, map } from 'rxjs';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-image-upload-modal',
    templateUrl: './image-upload-modal.component.html',
    styleUrls: ['./image-upload-modal.component.scss']
})
export class ImageUploadModalComponent implements OnInit, OnDestroy {
    public is_loading: boolean = false;
    public not_valid_url: boolean = false;
    public image_url: FormControl<string | null> = new FormControl('');

    private _image_input_subscription?: Subscription;

    constructor(
        public modal: NgbActiveModal,
    ) { }

    public ngOnInit(): void {
        this._image_input_subscription = this.image_url.valueChanges
            .pipe(
                debounceTime(350),
                distinctUntilChanged(),
                map(value => value),
            )
            .subscribe({
                next: (url) => {
                    if (url) {
                        this.is_loading = true;

                        this.validateImageURL(url).then((valid) => {
                            if (valid) {
                                this.modal.close(`<img src="${url}">`);
                            }

                            this.is_loading = false;
                            this.not_valid_url = true;
                        })
                    }


                }
            })
    }

    public ngOnDestroy(): void {
        this._image_input_subscription?.unsubscribe();
    }

    /**
     * Tries to load url to make sure the URL provided is actually valid
     *
     * @param url The URL to load the image from
     *
     * @returns Promise indicating if its valid or not
     */
    private validateImageURL(url: string): Promise<boolean> {
        return new Promise<boolean>((res) => {
            const image = new Image();
            image.onload = () => res(true);
            image.onerror = () => res(false);
            image.src = url;
        });
    }
}
