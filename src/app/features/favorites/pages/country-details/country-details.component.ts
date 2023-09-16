import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';

import { Subscription, switchMap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { Country } from '@shared/models/country.interface';
import { FavoritesService } from '@shared/services/favorites.service';
import { DeleteModalComponent } from '@features/favorites/components/delete-modal/delete-modal.component';
import { ImageUploadModalComponent } from '@features/favorites/components/image-upload-modal/image-upload-modal.component';

@Component({
    selector: 'app-country-details',
    templateUrl: './country-details.component.html',
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
    public country?: Country;
    public country_name!: string;
    public editor_content: SafeHtml = '';
    public editing_index?: number;

    public text_editor_config: AngularEditorConfig = {
        editable: true,
        minHeight: '250px',
        width: 'auto',
        minWidth: '100%',
        placeholder: 'Enter comment here...',
        defaultParagraphSeparator: 'p',
        defaultFontSize: '3',
        fonts: [
            { name: 'Montserrat', class: 'Montserrat' }
        ],
        toolbarHiddenButtons: [
            [
                'subscript',
                'superscript',
                'fontName',
                'indent',
                'outdent',
            ],
            [
                'insertVideo',
                'insertImage',
                'backgroundColor',
                'link',
                'unlink',
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

                                return;
                            }
                        }

                        this.navigateToHomePage();
                    }
                },
                error: () => this.router.navigateByUrl('/not-found', { skipLocationChange: true }),
            });
    }

    public ngOnDestroy(): void {
        this._country_subscription?.unsubscribe();
    }

    public uploadCustomImage(): void {
        const modalRef = this.modalService.open(ImageUploadModalComponent);

        modalRef.result.then((img_markup: string | undefined) => {
            if (img_markup) {
                this.editor_content += img_markup
            }
        });
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

    private navigateToHomePage(): void {
        this.router.navigateByUrl('/');
        this.toastrService.error(`No country with ${this.country_name} could be found in your favorites list.`, 'Failed to load country');
    }
}
