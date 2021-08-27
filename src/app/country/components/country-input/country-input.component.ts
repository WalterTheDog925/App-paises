import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html'
})
export class CountryInputComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() placeholder: string = '';

  debouncer: Subject<string> =  new Subject;

  term: string = '';

  ngOnInit(){ 
    this.debouncer
    .pipe(debounceTime(300))
    .subscribe(val => {
      this.onDebounce.emit(val);
    })
  }

  search() {
    this.onEnter.emit(this.term);
  }

  pressedKey(ter: any) {
    this.debouncer.next(this.term);
  }
}
