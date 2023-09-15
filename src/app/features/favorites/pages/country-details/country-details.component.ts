import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';

import { Subscription, switchMap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { Country } from '@shared/models/country.interface';
import { FavoritesService } from '@shared/services/favorites.service';
import { DeleteModalComponent } from '@features/favorites/components/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-country-details',
    templateUrl: './country-details.component.html',
    styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
    public country?: Country;
    public country_name!: string;
    public editor_content: SafeHtml = '';
    public editing_index?: number;
    public posted_dated?: string;

    public text_editor_config: AngularEditorConfig = {
        editable: true,
        minHeight: '250px',
        width: 'auto',
        minWidth: '100%',
        placeholder: 'Enter comment here...',
        defaultParagraphSeparator: 'p',
        defaultFontSize: '3',
        fonts: [{
            name: 'Montserrat', class: 'Montserrat'
        }],
        toolbarHiddenButtons: [
            [
                'subscript',
                'superscript',
                'fontName'
            ],
            [
                'insertVideo',
                'insertImage',
                'backgroundColor',
            ]
        ],
    };

    private _country_subscription?: Subscription;

    constructor(
        private router: Router,
        private toastrService: ToastrService,
        private favoritesService: FavoritesService,
        private activatedRoute: ActivatedRoute,
        private modalService: NgbModal,
    ) { }

    public ngOnInit(): void {
        this._country_subscription = this.activatedRoute.paramMap
            .pipe(
                switchMap((params) => {
                    this.country_name = params.get('country-name') ?? '';

                    return this.favoritesService.getFavoriteCountriesStream();
                }),
            )
            .subscribe({
                next: (favorite_countries) => {
                    if (favorite_countries) {
                        if (this.country_name !== '') {
                            const formatted_name = this.country_name.replaceAll(' ', '');

                            if (favorite_countries[formatted_name]) {
                                this.country = favorite_countries[formatted_name];
                            } else {
                                this.navigateToHomePage();
                            }
                        } else {
                            this.navigateToHomePage();
                        }
                    }
                },
                error: () => this.router.navigateByUrl('/not-found', { skipLocationChange: true }),
            });
    }

    public ngOnDestroy(): void {
        this._country_subscription?.unsubscribe();
    }

    public uploadCustomImage(): void {
        const img_url = prompt('Gimme URL');

        if (img_url) {
            this.validateImageURL(img_url).then((valid) => {
                if (valid) {
                    this.editor_content += `<img src="${img_url}" />`;
                } else {
                    alert('This no be an image');
                }
            });
        }

        return;
    }

    public onEditComment(index: number): void {
        if (!this.country) return;

        if (this.country.comments && this.country.comments[index]) {
            this.editing_index = index;
            this.editor_content = this.country.comments[index].html;
        }
    }

    public onDeleteComment(index: number): void {
        const modalRef = this.modalService.open(DeleteModalComponent);

        modalRef.result.then((should_delete) => {
            if (should_delete) {
                if (this.country) {
                    if (this.country.comments && this.country.comments[index]) {
                        this.favoritesService.deleteComment(this.country_name, index);
                        this.toastrService.success('Comment deleted successfully', 'Success!');
                    }
                }
            }
        });
    }

    public onSaveComment(): void {
        if (!this.country) return;

        if (this.editor_content !== '') {
            this.favoritesService.saveComment(
                this.country.name.common,
                this.editor_content,
                this.editing_index
            );

            // Check if editing to change out success message
            if (this.editing_index !== undefined) {
                this.toastrService.success(`Comment has been updated`, 'Success!')
            } else {
                this.toastrService.success(`Comment added to ${this.country.name.common}`, 'Success!')
            }
        } else {
            this.toastrService.error('Please make sure there is content within the comment before saving', 'Failed!')
            return;
        }

        // Reset fields
        this.editor_content = '';
        this.editing_index = undefined;
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

    private navigateToHomePage(): void {
        this.router.navigateByUrl('/');
        this.toastrService.error(`No country with ${this.country_name} could be found in your favorites list.`, 'Failed to load country');
    }
}
