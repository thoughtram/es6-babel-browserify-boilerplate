import {Person} from './Person';

describe('Person', () => {
  let pedro;

  beforeEach(() => {
    pedro = new Person('Pedro', 'Snow');
  });

  it('should display a full name', () => {
    expect(pedro.fullName).toBe('Pedro Snow');
  });
});
