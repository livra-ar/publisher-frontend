import { LongTextPipe } from './long-text.pipe';

describe('LongTextPipe', () => {
  it('create an instance', () => {
    const pipe = new LongTextPipe();
    expect(pipe).toBeTruthy();
  });

	it('should not change text with letters less than threshold', () => {
		const pipe = new LongTextPipe();
		const shortStr = '12345678';
		expect(pipe.transform(shortStr, shortStr.length + 1)).toEqual(shortStr);
		expect(pipe.transform(shortStr, shortStr.length)).toEqual(shortStr);
		expect(pipe.transform('', 2)).toEqual('');
	});

	it('should change text with letters more than threshold', () => {
		const pipe = new LongTextPipe();
		const shortStr = '12345678';
		expect(pipe.transform(shortStr, shortStr.length - 1)).toEqual('1234567...');
		expect(pipe.transform(shortStr, 0)).toEqual('...');
	});
});
