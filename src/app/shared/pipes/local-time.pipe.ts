import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'currentLocalTime'
})
export class CurrentLocalTimePipe implements PipeTransform {
    // It ain't pretty but it works
    public transform(value: string): string {
        const time = moment.utc().utcOffset();
        const local_offset = moment.utc().utcOffset(-1 * time).utcOffset();
        const country_offset = moment.utc().utcOffset(value).utcOffset();
        const output = moment().utc().utcOffset(local_offset + country_offset).format('LT');

        return output;
    }
}
