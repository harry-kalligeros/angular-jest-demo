import { Component, Renderer2, ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUnderlineDirective } from './my-underline.directive';
import { By } from '@angular/platform-browser';

// Do not import any other than you test. For others, mock it
class MockRenderer2 {
	addClass(document: string, cssClass: string) {
		return true;
	}
}

class MockElementRef {
	nativeElement = {};
}

@Component({
	selector: 'app-test-component',
	template: `<div id="test" appMyUnderline>Hello World</div>">`
})
class TestComponent {
}

describe('MyUnderlineDirective', () => {
	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;
	let renderer: MockRenderer2;
	let elementRef: MockElementRef;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MyUnderlineDirective, TestComponent],
			providers: [{ provide: Renderer2, useClass: MockRenderer2 }, {
				provide: ElementRef, useClass: MockElementRef
			}]
		}).compileComponents();
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		renderer = fixture.debugElement.injector.get(Renderer2);
		elementRef = fixture.debugElement.query(By.directive(MyUnderlineDirective)).injector.get(ElementRef);
	}));

	test('should create', () => {
		expect(component).toBeTruthy();
	});

	test('should have class is-underlined', () => {
		const spy = jest.spyOn(renderer, 'addClass');
		fixture.detectChanges();
		expect(spy).toBeCalledWith(elementRef.nativeElement, 'is-underlined');
	});

});
