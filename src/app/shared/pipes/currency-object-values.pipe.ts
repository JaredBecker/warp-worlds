import { Pipe, PipeTransform } from '@angular/core';

import { CurrenciesObject } from '@shared/models/currencies-object.interface';

@Pipe({
    name: 'currencyObjectValues'
})
export class CurrencyObjectValuesPipe implements PipeTransform {
    public transform(obj: CurrenciesObject): string {
        let output = [];

        for(const key in obj) {
            output.push(`${obj[key].name}`);
        }

        return output.join(', ');
    }
}
