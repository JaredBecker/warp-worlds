import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { FavoritesService } from './shared/services/favorites.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    public currently_selected_count: number = 0;

    private _currently_selected_sub?: Subscription;

    constructor(
        private favoritesService: FavoritesService,
    ) { }

    public ngOnInit(): void {
        this._currently_selected_sub = this.favoritesService
            .getCurrentlySelectedCountStream()
            .subscribe({
                next: (count) => this.currently_selected_count = count
            })
    }

    public ngOnDestroy(): void {
        this._currently_selected_sub?.unsubscribe();
    }

    public onAddSelected() {
        this.favoritesService.addMultipleCountriesToFavorites();
    }
}
