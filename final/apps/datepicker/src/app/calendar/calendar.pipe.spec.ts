import { CalendarPipe } from './calendar.pipe';

describe('CalendarPipe', () => {
  let pipe: CalendarPipe;

  beforeEach(() => {
    pipe = new CalendarPipe();
  });

  it('transforms 2019/08 to "September of 2019"', () => {
    expect(pipe.transform('2019/08')).toBe('September of 2019');
  });

  it('transforms 2040/7 to "August of 2040"', () => {
    expect(pipe.transform('2040/7')).toBe('August of 2040');
  });

  it('transform 2019 to "Unknown Date"', () => {
    expect(pipe.transform('2019')).toBe('Unknown Date');
  });
});
