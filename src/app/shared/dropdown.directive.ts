import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]',
})

export class DropdownDirective {
    @HostBinding('class.open') isOpen: boolean = false;

    @HostListener('document:click', ['$event']) dropdownToggle(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

    constructor(private elRef: ElementRef) { }

}