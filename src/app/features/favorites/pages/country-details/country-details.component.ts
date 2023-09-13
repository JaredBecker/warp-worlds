import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';

import { Subscription, switchMap, throwError } from 'rxjs';

import { AngularEditorConfig } from '@kolkov/angular-editor';

import { Country } from '@shared/models/country.interface';
import { CountryService } from '@shared/services/country.service';

@Component({
    selector: 'app-country-details',
    templateUrl: './country-details.component.html',
    styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
    public is_loading: boolean = true;
    public country?: Country;
    public editor_content: SafeHtml = '';
    public comments?: SafeHtml[] = [];

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
                'backgroundColor'
            ]
        ],
    };

    private _country_subscription?: Subscription;

    constructor(
        private countryService: CountryService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) { }

    public ngOnInit(): void {
        this.getComments();

        this._country_subscription = this.activatedRoute.paramMap
            .pipe(
                switchMap((params) => {
                    const country_name = params.get('country-name');

                    if (country_name) {
                        // Get request throws actual error if the name is incorrect
                        return this.countryService.getSingleCounty(country_name);
                    }

                    // Making sure observable is returned if no name is set
                    return throwError(() => new Error())
                })
            )
            .subscribe({
                next: (country) => {
                    this.country = country;
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
            if (this.isImage(img_url)) {
                return `<img src="${img_url}"/>`
            } else {
                alert('This no be an image')
            }
        }

        return
    }

    public isImage(url: string) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }

    public getComments() {
        const saved_comments = localStorage.getItem('saved_comments');

        if (saved_comments) {
            const comments = JSON.parse(saved_comments) as SafeHtml[];
            this.comments = comments;
        }
    }

    public save() {
        const saved_comments = localStorage.getItem('saved_comments');
        const comments = saved_comments ? JSON.parse(saved_comments) : [];
        comments.push(this.editor_content);
        this.comments = comments;
        localStorage.setItem('saved_comments', JSON.stringify(comments));
    }
}
