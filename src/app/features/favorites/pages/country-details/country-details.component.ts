import { FavoritesService } from '@shared/services/favorites.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';

import { Subscription, switchMap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { Country } from '@shared/models/country.interface';
import { CountryComment } from '@shared/models/comment.interface';
@Component({
    selector: 'app-country-details',
    templateUrl: './country-details.component.html',
    styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
    public is_loading: boolean = true;
    public country?: Country;
    public country_name!: string;
    public editor_content: SafeHtml = '';
    public comments?: CountryComment[] = [];
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
        this.getComments();

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
                error: () => {
                    this.router.navigateByUrl('/not-found', {
                        skipLocationChange: true,
                    })
                }
            });
    }

    public ngOnDestroy(): void {
        this._country_subscription?.unsubscribe();
    }

    public angularEditorLogo(): string | undefined {
        const img_url = prompt('Gimme URL');

        if (img_url) {
            if (this.validateImage(img_url)) {
                return `<img src="${img_url}" />`
            } else {
                alert('This no be an image')
            }
        }

        return;
    }

    public getComments() {
        this.comments = this.country?.comments;
    }

    public onEditComment(index: number) {
        const saved_comments = localStorage.getItem('saved_comments');

        if (saved_comments) {
            const comments = JSON.parse(saved_comments);
            this.editor_content = comments[index];
            this.editing_index = index;
        }
    }

    public onDeleteComment(index: number) {
        const saved_comments = localStorage.getItem('saved_comments');

        if (saved_comments) {
            const comments = JSON.parse(saved_comments);
            comments.splice(index, 1);
            this.comments = comments;
            localStorage.setItem('saved_comments', JSON.stringify(comments));
        }
    }

    public onSaveComment() {
        if (!this.country) return;

        let comments: CountryComment[] | undefined;

        if (this.editor_content !== '') {
            this.favoritesService.saveComment(
                this.country.name.common,
                this.editor_content,
                this.editing_index
            );
        } else {
            alert('Please make sure to add content within the comment. Only whitespace is not permitted');
            return;
        }

        this.comments = comments;
        this.editor_content = '';
        this.editing_index = undefined;
    }

    private validateImage(url: string) {
        return /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(url);
    }

    private navigateToHomePage() {
        this.router.navigateByUrl('/');
        this.toastrService.error(`No country with ${this.country_name} could be found in your favorites list.`, 'Failed to load country');
    }
}
