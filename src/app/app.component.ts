import { Component, Injector } from '@angular/core';
import { PopupService } from './popup.service';
import { createCustomElement } from '@angular/elements';
import { PopupComponent } from './popup.component';

@Component({
  selector: 'app-root',
  template:
  `
  <input #input value="Message">
  <button type="button" (click)="popup.showAsComponent(input.value)">Show as component</button>
  <button type="button" (click)="popup.showAsElement(input.value)">Show as element</button>
  `
})
export class AppComponent {
  constructor(injector: Injector, public popup: PopupService) {
    // Convert 'Popup Component' to a custom element
    const PopupElement = createCustomElement(PopupComponent, {injector});
    //Register the custom element with the browser
    customElements.define('popup-element', PopupElement);
  };
}
