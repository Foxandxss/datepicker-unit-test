import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CalendarPipe } from './calendar.pipe';
import { CalendarService } from './calendar.service';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<HostComponent>;
  let hostComponent: HostComponent;
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent, HostComponent, CalendarPipe ],
      providers: [ CalendarService ]
    });

    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    service = fixture.debugElement.children[0].injector.get(CalendarService);

    fixture.detectChanges();
  });

  it('has an input for the date', () => {
    expect(component.date).toBe('2019/8');
  });

  it('contains the formatted date on a header', () => {
    const header: HTMLDivElement = fixture.debugElement.query(By.css('.card > .card-header')).nativeElement;
    expect(header.textContent).toContain('September of 2019');
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
    expect(service.getMonth).toHaveBeenCalledWith(2019, 8);
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
  selector: 'app-host-cmp',
  template: '<app-calendar [date]="date"></app-calendar>'
})
class HostComponent {
  date = '2019/8';
}
