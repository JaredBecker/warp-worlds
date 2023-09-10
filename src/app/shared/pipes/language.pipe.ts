import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'language'
})
export class LanguagePipe implements PipeTransform {
    public transform(obj: { [key: string]: string }): string {
        let output = [];

        for (const key in obj) {
            output.push(obj[key]);
        }

        return output.join(', ');
    }
}
