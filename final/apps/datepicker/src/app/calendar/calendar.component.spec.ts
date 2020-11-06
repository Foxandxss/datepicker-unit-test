import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CalendarComponent } from './calendar.component';
import { CalendarPipe } from './calendar.pipe';
import { CalendarService } from './calendar.service';

describe('CalendarComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: CalendarComponent;
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent, HostComponent, CalendarPipe ],
      providers: [CalendarService]
    });

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.debugElement.children[0].componentInstance;
    service = fixture.debugElement.children[0].injector.get(CalendarService);

    fixture.detectChanges();
  });

  it('has an input for the date', () => {
    expect(component.date).toBe('2020/11');
  });

  it('contains the formatted date on a header', () => {
    const header: HTMLDivElement = fixture.debugElement.query(By.css('.card > .card-header')).nativeElement;
    expect(header.textContent).toContain('November of 2020');
  });

  it('has the week days letters on top (by default, Monday)', () => {
    const weekDays = fixture.debugElement.queryAll(By.css('.a-week-day'));
    expect(weekDays.length).toBe(7);
    const monday: HTMLSpanElement = weekDays[0].children[0].nativeElement;
    expect(monday.textContent).toBe('M');
    const sunday: HTMLSpanElement = weekDays[6].children[0].nativeElement;
    expect(sunday.textContent).toBe('S');
  });

  it('ask the calendar service for the proper days', () => {
    spyOn(service, 'getMonth').and.callThrough();
    component.ngAfterContentChecked();
    expect(component.days.length).toBe(42);
    expect(service.getMonth).toHaveBeenCalledWith(2020, 11);
  });

  it('shows the days on screen', () => {
    const days = fixture.debugElement.queryAll(By.css('.a-day'));
    expect(days.length).toBe(42);
    expect(days[0].children[0].nativeElement.textContent).toBe('26');
    expect(days.pop().children[0].nativeElement.textContent).toBe('6');
  });

  it('applies a class for days outside the month', () => {
    const days = fixture.debugElement.queryAll(By.css('.a-day'));
    const outsideDay = days[0].children[0].nativeElement;
    expect(outsideDay.getAttribute('class')).toContain('outside');
    const currentMonthDay = days[15].children[0].nativeElement;
    expect(currentMonthDay.getAttribute('class')).toBeNull();
  });
});

@Component({
  selector: 'datepicker-host-cmp',
  template: '<datepicker-calendar [date]="date"></datepicker-calendar>'
})
class HostComponent {
  date = '2020/11';
}
