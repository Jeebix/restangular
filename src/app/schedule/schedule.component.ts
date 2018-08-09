import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators'; // tap nouveau do qui permet d'espionner un flux

import { ScheduleService } from "../services/schedule.service";
import { EveningEvent } from '../models/evening-event.interface';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

    searchTerm = new FormControl();
    searchTerms$: Observable<string> = this.searchTerm.valueChanges;
    result: EveningEvent[] = [];

    constructor(private scheduleService: ScheduleService) { }

    ngOnInit() {
        this.searchTerms$
            .pipe(
                // tap(x => console.log('Avant map', x)),
                // map(x => x.toUpperCase()),
                // map(upperCased => this.reverse(upperCased)),
                // tap(x => console.log('Après map', x)),
                debounceTime(1000), // Décale de 1s
                switchMap(word => this.scheduleService.search(word)), // switchMap permet d'aplatir un observable d'observable (fusionne 2 flux)
                tap(x => console.log(x))
            )
            .subscribe(data => this.result = data);
    }

    reverse(word) {
        return word.split('').reverse().join('');
    }

}
