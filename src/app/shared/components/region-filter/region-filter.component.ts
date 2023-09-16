import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subscription, debounceTime, distinctUntilChanged, map } from 'rxjs';

import { FilterOptions } from '@shared/models/filter-options.interface';

@Component({
    selector: 'app-region-filter',
    templateUrl: './region-filter.component.html',
})
export class RegionFilterComponent implements OnInit, OnDestroy {
    @Input() public regions!: Set<string>;

    @Output() public on_filter: EventEmitter<FilterOptions> = new EventEmitter<FilterOptions>();

    public search_input: FormControl<string | null> = new FormControl('');
    public selected_regions: string[] = [];

    private _search_subscription?: Subscription;

    public ngOnInit(): void {
        this._search_subscription = this.search_input.valueChanges
            .pipe(
                debounceTime(350),
                distinctUntilChanged(),
                map(value => value),
            )
            .subscribe({
                next: (value) => {
                    this.on_filter.emit({
                        search_value: value ?? '',
                        selected_regions: this.selected_regions,
                    });
                }
            })
    }

    public ngOnDestroy(): void {
        this._search_subscription?.unsubscribe();
    }

    /**
     * Inserts or removes region from selected regions array and emits value
     *
     * @param region The region being selected
     */
    public onSelectRegion(region: string): void {
        if (this.selected_regions.includes(region)) {
            this.selected_regions = this.selected_regions.filter(el => el !== region);
        } else {
            this.selected_regions.push(region);
        }

        this.on_filter.emit({
            search_value: this.search_input.value ?? '',
            selected_regions: this.selected_regions,
        })
    }

    /**
     * Clears all selected regions and emits value
     */
    public onClearRegions(): void {
        this.selected_regions = [];

        this.on_filter.emit({
            search_value: this.search_input.value ?? '',
            selected_regions: this.selected_regions
        })
    }
}
