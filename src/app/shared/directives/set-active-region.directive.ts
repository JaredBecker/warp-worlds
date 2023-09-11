import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appSetActiveRegion]'
})
export class SetActiveRegionDirective {
    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) { }

    @HostListener('click') public onClick(): void {
        // If clear then remove all active classes else toggle class
        if (this.el.nativeElement.innerText === 'Clear') {
            const btns = document.querySelectorAll('.region_filter_btn');

            btns.forEach(button => this.renderer.removeClass(button, 'active'));
        } else {
            if (this.el.nativeElement.classList.contains('active')) {
                this.renderer.removeClass(this.el.nativeElement, 'active');
            } else {
                this.renderer.addClass(this.el.nativeElement, 'active');
            }
        }
    }
}
