import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appRipple]',
  host: {
    // Run spawnRipple whenever the element is pressed (mouse, touch or pen)
    '(pointerdown)': 'spawnRipple($event)',
    // Adds the class that makes the element clip the ripple (see styles.css)
    class: 'ripple-host',
  },
})
export class RippleDirective {
  // The element this directive sits on, e.g. your button or link
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  spawnRipple(event: PointerEvent) {
    const host = this.el.nativeElement;

    // Where the element is on screen and how big it is
    const rect = host.getBoundingClientRect();

    // Make the circle big enough to cover the whole element,
    // even if you click in a corner
    const size = Math.max(rect.width, rect.height) * 2;

    // Create the circle
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;

    // Mouse position inside the element, shifted by half the size
    // so the circle's center lands exactly where you clicked
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    host.appendChild(ripple);

    // Remove the circle when its animation is done, so they don't pile up
    ripple.addEventListener('animationend', () => ripple.remove());
  }
}
