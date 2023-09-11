import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private is_dark_mode: boolean = true;

    constructor() {
        const theme = localStorage.getItem('theme');
        this.is_dark_mode = theme === 'dark' ? true : false;
    }

    public toggleTheme(): void {
        this.is_dark_mode = !this.is_dark_mode;
        console.log(this.is_dark_mode);
    }

    public isDarkModeEnabled(): boolean {
        return this.is_dark_mode;
    }
}
