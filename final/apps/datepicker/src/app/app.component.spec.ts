import { componentFactoryName, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MockCalendarComponent } from '../testing/mocks';
import { DebugElement } from '@angular/core';

describe('AppComponent as a Component', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let calendarEl: DebugElement;
  let calendar: MockCalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, MockCalendarComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    calendarEl = fixture.debugElement.query(By.css('datepicker-calendar'));
    calendar = calendarEl.componentInstance;

    fixture.detectChanges();
  });

  it ('has a button that calls the next method', () => {
    spyOn(component, 'next');
    const buttonEl: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonEl.click();
    expect(component.next).toHaveBeenCalled();
  });

  it('contains the calendar', () => {
    expect(calendarEl).toBeTruthy();
  });

  it('uses the attribte on the template', () => {
    expect(calendar.date).toBe('2020/11');
  });
});

describe('AppComponent as a Class', () => {
  let component: AppComponent;

  beforeEach(() => {
    component = new AppComponent();
  });

  it('has a date for the parameters', () => {
    expect(component.date).toBe('2020/11');
  });

  it('has a next method to show the next month', () => {
    component.next();
    expect(component.date).toBe('2020/12');
  });
});
