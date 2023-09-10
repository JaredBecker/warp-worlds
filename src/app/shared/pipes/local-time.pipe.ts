import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'localTime'
})
export class LocalTimePipe implements PipeTransform {
    public transform(value: string): unknown {
        // TODO: Come back to this and figure out how the hell to calculate it

        return value;
    }
}
