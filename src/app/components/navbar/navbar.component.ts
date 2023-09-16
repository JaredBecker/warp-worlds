import { Component, Renderer2 } from '@angular/core';

import { ThemeService } from '@shared/services/theme.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
})
export class NavbarComponent {
    public is_dark_mode: boolean;

    constructor(
        private themeService: ThemeService,
        private renderer: Renderer2,
    ) {
        this.is_dark_mode = this.themeService.isDarkModeEnabled();
        this.setTheme();
    }

    public toggleTheme(): void {
        this.themeService.toggleTheme();
        this.is_dark_mode = this.themeService.isDarkModeEnabled();
        this.setTheme();
    }

    public setTheme(): void {
        this.renderer.setAttribute(
            document.querySelector('html'),
            'data-bs-theme',
            this.is_dark_mode ? 'dark' : 'light'
        )
    }
}
