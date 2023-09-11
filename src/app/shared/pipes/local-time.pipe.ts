import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'localTime'
})
export class LocalTimePipe implements PipeTransform {
    public transform(value: string): unknown {
        // TODO come back to this
        const formatted_timezone = value.replace('UTC', '');
        const time = moment().utcOffset();
        const local_offset = moment().utcOffset(-1 * time).utcOffset();
        const country_offset = moment().utcOffset(formatted_timezone).utcOffset();
        const output = moment().utc().utcOffset(local_offset + country_offset);

        return output;
    }
}
