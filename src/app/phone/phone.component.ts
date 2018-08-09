import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-phone',
    templateUrl: './phone.component.html',
    styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

    @Input()
    user: any;

    // custom event
    @Output()
    zoom = new EventEmitter<string>(); // capable d'émettre un évènement

    constructor() { }

    ngOnInit() {
    }

    displayNumber() {
        this.zoom.emit(this.user.phoneNumber);
    }

}
