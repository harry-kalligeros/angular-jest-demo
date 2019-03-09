import { MyDecimalPipe } from './my-decimal.pipe';

describe('MyDecimalPipe', () => {
	let pipe;

	beforeEach(() => {
		pipe = new MyDecimalPipe();
	});

	test('creates an instance', () => {
		expect(pipe).toBeTruthy();
	});

	test('transforms a number to decimal', () => {
		const input = 342.332394334,
			expected = '342.33',
			actual = pipe.transform(input);
		expect(actual).toBe(expected);
	});
});
