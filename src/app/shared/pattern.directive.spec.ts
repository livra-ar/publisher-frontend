import { patternValidator } from './pattern.directive';

describe('ValidPasswordDirective', () => {
  it('should create an instance', () => {
    const result = patternValidator(/a/);
    expect(result).toBeTruthy();
  });
});
