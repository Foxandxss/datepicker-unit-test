import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockCalendarComponent } from '../testing/mocks'

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let calendarEl: DebugElement;
  let calendar: MockCalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
      declarations: [AppComponent, MockCalendarComponent]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    calendarEl = fixture.debugElement.query(By.css('app-calendar'));
    calendar = calendarEl.componentInstance;
  });

  it('contains the calendar', () => {
    expect(calendarEl).toBeTruthy();
  });

  it('has a date for the parameters', () => {
    expect(component.date).toBe('2019/08');
  });

  it('uses the attribute on the template', () => {
    expect(calendar.date).toBe('2019/08');
  });

  it('has a next method to show the next month', () => {
    component.next();
    expect(component.date).toBe('2019/9');
  });

  it('has a button that calls the next method', () => {
    spyOn(component, 'next');
    const buttonEl: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonEl.click();
    expect(component.next).toHaveBeenCalled();
  });
});
