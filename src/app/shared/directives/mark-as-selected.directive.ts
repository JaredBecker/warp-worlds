import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appMarkAsSelected]'
})
export class MarkAsSelectedDirective {
    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) { }

    @HostListener('click') public onClick() {
        // Get the country card element ref and toggle selected class
        const country_card = this.el.nativeElement.parentElement.parentElement;

        if (country_card.classList.contains('selected')) {
            this.renderer.removeClass(country_card, 'selected');
        } else {
            this.renderer.addClass(country_card, 'selected');
        }

        // Update button class so it doesn't get lost in the purple background
        if (this.el.nativeElement.classList.contains('btn-outline-secondary')) {
            this.renderer.removeClass(this.el.nativeElement, 'btn-outline-secondary');
            this.renderer.addClass(this.el.nativeElement, 'btn-primary');
        } else {
            this.renderer.removeClass(this.el.nativeElement, 'btn-primary');
            this.renderer.addClass(this.el.nativeElement, 'btn-outline-secondary');
        }
    }

}
