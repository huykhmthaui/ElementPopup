import { Injectable, EnvironmentInjector, ApplicationRef, createComponent } from "@angular/core";
import { PopupComponent } from "./popup.component";
import { NgElement, WithProperties } from '@angular/elements';

@Injectable()
export class PopupService {
    constructor(private injector: EnvironmentInjector,
                private applicationRef: ApplicationRef) {}
    
    //previous dynamic-loading method required you to set up infrastructure before adding the popup to the DOM

    showAsComponent(message: string) {
        //create element
        const popup = document.createElement('popup-component');

        //create the component and wire it up with the element
        const popupComponentRef = createComponent(PopupComponent, {environmentInjector: this.injector, hostElement: popup});

        //Attach to the view so that the change detector know to run
        this.applicationRef.attachView(popupComponentRef.hostView);

        //Listen to the close event
        popupComponentRef.instance.closed.subscribe(() => {
            document.body.removeChild(popup);
            this.applicationRef.detachView(popupComponentRef.hostView);
        });

        //set the message
        popupComponentRef.instance.message = message;

        //add to the DOM
        document.body.appendChild(popup);
    }

    showAsElement(message: string) {
        const popupEl : NgElement & WithProperties<PopupComponent> = document.createElement('popup-element') as any;

        popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));

        popupEl.message = message;

        document.body.appendChild(popupEl);
    }



}