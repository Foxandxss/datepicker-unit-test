import { CalendarService, Day } from './calendar.service';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    service = new CalendarService();
  });

  it('should be able to generate a month starting on Saturday', () => {
    const days: Day[] = service.getMonth(2019, 5);
    expect(days.length).toBe(42);
    expect(days[0].day).toBe(27);
    expect(days.pop().day).toBe(7);
  });

  it('should be able to generate a month starting on Monday', () => {
    const days: Day[] = service.getMonth(2019, 6);
    expect(days.length).toBe(42);
    expect(days[0].day).toBe(1);
    expect(days.pop().day).toBe(11);
  });

  it('should be able to generate a month starting on Tuesday', () => {
    const days: Day[] = service.getMonth(2019, 0);
    expect(days.length).toBe(42);
    expect(days[0].day).toBe(31);
    expect(days.pop().day).toBe(10);
  });

  it('should be able to generate a month starting on Sunday', () => {
    const days: Day[] = service.getMonth(2019, 8);
    expect(days.length).toBe(42);
    expect(days[0].day).toBe(26);
    expect(days.pop().day).toBe(6);
  });

  it('should be able to generate a non leap february', () => {
    const days: Day[] = service.getMonth(2019, 1);
    expect(days.length).toBe(42);
    expect(days[0].day).toBe(28);
    expect(days.pop().day).toBe(10);
  });

  it('should be able to generate a leap february', () => {
    const days: Day[] = service.getMonth(2016, 1);
    expect(days.length).toBe(42);
    expect(days[0].day).toBe(1);
    expect(days.pop().day).toBe(13);
  });

  it('should work on a future future date', () => {
    const days: Day[] = service.getMonth(2040, 7);
    expect(days.length).toBe(42);
    expect(days[0].day).toBe(30);
    expect(days.pop().day).toBe(9);
  });

  it('should mark the days outside the month', () => {
    const days: Day[] = service.getMonth(2018, 5);
    const day28 = days[0];
    const day1Jan = days[4];
    const day1Jul = days[34];

    expect(day28).toEqual({ day: 28, outsideMonth: true});
    expect(day1Jan).toEqual({ day: 1, outsideMonth: false});
    expect(day1Jul).toEqual({ day: 1, outsideMonth: true});
  });
});
