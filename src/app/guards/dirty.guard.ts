import { Injectable } from '@angular/core';
import { Router, CanDeactivate } from '@angular/router';
import { ManageComponent } from '@components/components-manage/manage.component';

@Injectable({
    providedIn: 'root'
})
export class DirtyGuard implements CanDeactivate<ManageComponent> {

    constructor() { }

    canDeactivate(component: ManageComponent): boolean {
        if (component.isDirty) {
            if (confirm("You have unsaved changes! If you leave, your changes will be lost.")) {
                return true;
            } else {
                return false;
            }
        }

        return true;
    }

}
