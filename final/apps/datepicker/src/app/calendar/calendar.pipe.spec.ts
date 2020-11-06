import { CalendarPipe } from './calendar.pipe';

describe('CalendarPipe', () => {
  let pipe: CalendarPipe;

  beforeEach(() => {
    pipe = new CalendarPipe();
  });

  it('transform 2020/11 to "November of 2020"', () => {
    expect(pipe.transform('2020/11')).toBe('November of 2020');
  });

  it('transforms 2040/8 to "August of 2040"', () => {
    expect(pipe.transform('2040/8')).toBe('August of 2040');
  });

  it('trasnform 2020 to "Unknown Date"', () => {
    expect(pipe.transform('2020')).toBe('Unknown Date');
  });
});
