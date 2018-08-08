import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators'; // tap nouveau do qui permet d'espionner un flux

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

    searchTerm = new FormControl();
    searchTerms$: Observable<string> = this.searchTerm.valueChanges;

    constructor() { }

    ngOnInit() {
        this.searchTerms$
            .pipe(
                tap(x => console.log('Avant map', x)),
                map(x => x.toUpperCase()),
                map(upperCased => this.reverse(upperCased)),
                tap(x => console.log('Après map', x)),
                debounceTime(1000) // Décale de 1s
            )
            .subscribe(data => console.log(data));
    }

    reverse(word) {
        return word.split('').reverse().join('');
    }

}
