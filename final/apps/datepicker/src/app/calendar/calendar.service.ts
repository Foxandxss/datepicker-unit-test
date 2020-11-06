import { Injectable } from '@angular/core';

export interface Day {
  day: number;
  outsideMonth: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  getMonth(year: number, month: number): Day[] {
    const days: Day[] = [];
    const date = new Date(year, month - 1, 1);
    const difference = -date.getDay();
    const numberOfLastDays = this.getNumberOfLastDays(difference);

    date.setDate(numberOfLastDays);
    for (let i = 0; i < 42; i++) {
      const currentMonth = date.getMonth() + 1;
      days[i] = { day: date.getDate(), outsideMonth: currentMonth !== month };
      date.setDate(date.getDate() + 1);
    }

    return days;
  }

  private getNumberOfLastDays(difference: number): number {
    return difference === 0 ? -5 : difference + 2;
  }
}
