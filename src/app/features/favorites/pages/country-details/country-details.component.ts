import { FavoritesService } from '@shared/services/favorites.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';

import { Subscription, switchMap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { Country } from '@shared/models/country.interface';
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
        if (!this.country) return;

        if (this.country.comments && this.country.comments[index]) {
            this.favoritesService.deleteComment(this.country_name, index);
        }
    }

    public onSaveComment(): void {
        if (!this.country) return;

        if (this.editor_content !== '') {
            this.favoritesService.saveComment(
                this.country.name.common,
                this.editor_content,
                this.editing_index
            );

            this.toastrService.success(`Comment added to ${this.country.name.common}`, 'Success!')
        } else {
            this.toastrService.error('Please make sure there is content within the comment before saving', 'Failed!')
            return;
        }

        this.editor_content = '';
        this.editing_index = undefined;
    }

    private async validateImageURL(url: string): Promise<boolean> {
        const img_url_valid = await new Promise<boolean>((res, rej) => {
            const image = new Image();
            image.onload = () => res(true);
            image.onerror = () => res(false);
            image.src = url;
        });

        return img_url_valid;
    }

    private navigateToHomePage(): void {
        this.router.navigateByUrl('/');
        this.toastrService.error(`No country with ${this.country_name} could be found in your favorites list.`, 'Failed to load country');
    }
}
