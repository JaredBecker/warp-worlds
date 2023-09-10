import { Component, Input } from '@angular/core';
import { CountryMin } from '@shared/models/country-min.interface';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent {
    @Input() public country!: CountryMin;
}
