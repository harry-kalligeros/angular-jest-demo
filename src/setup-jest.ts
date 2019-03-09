import 'jest-preset-angular';
import { Pipe, PipeTransform, Component, Directive, EventEmitter } from '@angular/core';

/* global mocks for jsdom */
const mock = () => {
	let storage: { [key: string]: string } = {};
	return {
		getItem: (key: string) => (key in storage ? storage[key] : null),
		setItem: (key: string, value: string) => (storage[key] = value || ''),
		removeItem: (key: string) => delete storage[key],
		clear: () => (storage = {})
	};
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
	value: () => ['-webkit-appearance'],
});

Object.defineProperty(document.body.style, 'transform', {
	value: () => {
		return {
			enumerable: true,
			configurable: true,
		};
	},
});

/* output shorter and more meaningful Zone error stack traces */
// Error.stackTraceLimit = 2;



/**
 * Examples:
 * MockPipe('some-pipe');
 * MockPipe('some-pipe', () => 'foo');
 */
export function MockPipe(name: string, transform?: any): Pipe {

	class Mock implements PipeTransform {
		transform = transform || (() => undefined);
	}

	return Pipe({ name })(Mock as any);
}

/**
 * Examples:
 * MockComponent({selector: 'some-component'});
 * MockComponent({selector: 'some-component', inputs: ['some-input', 'some-other-input']});
 */
export function MockComponent(selector: string, options: Component = {}): Component {

	const metadata: Component = {
		selector,
		template: options.template || '',
		inputs: options.inputs || [],
		outputs: options.outputs || [],
		exportAs: options.exportAs || ''
	};

	class Mock {
		constructor() {
			metadata.outputs.forEach(method => {
				this[method] = new EventEmitter();
			});
		}
	}

	return Component(metadata)(Mock as any);
}

/**
 * Examples:
 * MockDirective({selector: '[some-directive]'});
 * MockDirective({selector: '[some-directive]', inputs: ['some-input', 'some-other-input']});
 */
export function MockDirective(selector: string, options: Directive = {}): Directive {

	const metadata: Directive = {
		selector,
		inputs: options.inputs || [],
		outputs: options.outputs || [],
		providers: options.providers || [],
		exportAs: options.exportAs || ''
	};

	class Mock {
		constructor() {
			metadata.outputs.forEach(method => {
				this[method] = new EventEmitter();
			});
		}
	}

	return Directive(metadata)(Mock as any);
}
