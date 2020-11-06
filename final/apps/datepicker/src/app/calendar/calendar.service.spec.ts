import { CalendarService, Day } from './calendar.service';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    service = new CalendarService();
  });

  it('should be able to generate a month starting on Saturday', () => {
    const days: Day[] = service.getMonth(2020, 8);
    expect(days.length).toBe(42);
    expect(days[0].day).toBe(27);
    expect(days.pop().day).toBe(6);
  });

  it('should be able to generate a month starting on Monday', () => {
    const days: Day[] = service.getMonth(2021, 2);
    expect(days.length).toBe(42);
    expect(days[0].day).toBe(1);
    expect(days.pop().day).toBe(14);
  });

  it('should be able to generate a month starting on Tuesday', () => {
    const days: Day[] = service.getMonth(2020, 12);
    expect(days.length).toBe(42);
    expect(days[0].day).toBe(30);
    expect(days.pop().day).toBe(10);
  });

  it('should be able to generate a month starting on Sunday', () => {
    const days: Day[] = service.getMonth(2020, 11);
    expect(days.length).toBe(42);
    expect(days[0].day).toBe(26);
    expect(days.pop().day).toBe(6);
  });

  it('should work on a future future date', () => {
    const days: Day[] = service.getMonth(2040, 8);
    expect(days.length).toBe(42);
    expect(days[0].day).toBe(30);
    expect(days.pop().day).toBe(9);
  });

  it('should be able to generate a non leap february', () => {
    const days: Day[] = service.getMonth(2019, 2);
    expect(days.length).toBe(42);
    expect(days[0].day).toBe(28);
    expect(days.pop().day).toBe(10);
  });

  it('should be able to generate a leap february', () => {
    const days: Day[] = service.getMonth(2016, 2);
    expect(days.length).toBe(42);
    expect(days[0].day).toBe(1);
    expect(days.pop().day).toBe(13);
  });

  it('should mark the days outside the month', () => {
    const days: Day[] = service.getMonth(2020, 11);
    const day26 = days[0];
    const day1Nov = days[6];
    const day1Dec = days[36];

    expect(day26).toEqual({ day: 26, outsideMonth: true});
    expect(day1Nov).toEqual({ day: 1, outsideMonth: false});
    expect(day1Dec).toEqual({ day: 1, outsideMonth: true});
  });
});
