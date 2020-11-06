import { AfterContentChecked, Component, Input } from '@angular/core';

import { CalendarService, Day } from './calendar.service';

@Component({
  selector: 'datepicker-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements AfterContentChecked {
  @Input() date: string;

  days: Day[] = [];

  weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  constructor(private service: CalendarService) {

  }

  ngAfterContentChecked() {
    const dateParams = this.date.split('/');
    this.days = this.service.getMonth(+dateParams[0], +dateParams[1]);
  }
}
