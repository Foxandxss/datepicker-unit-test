import { Component, Input, AfterContentChecked } from '@angular/core';
import { Day, CalendarService } from './calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements AfterContentChecked {
  @Input() date: string;

  days: Day[] = [];

  weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  constructor(private service: CalendarService) {}

  ngAfterContentChecked() {
    const dateParams = this.date.split('/');
    this.days = this.service.getMonth(+dateParams[0], +dateParams[1]);
  }
}
