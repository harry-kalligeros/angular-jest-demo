import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalComponent } from './total.component';
import { MockPipe } from 'src/setup-jest';

describe('ProductComponent', () => {
	let component: TotalComponent;
	let fixture: ComponentFixture<TotalComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TotalComponent, MockPipe('myDecimal')]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TotalComponent);
		component = fixture.componentInstance;
		component.cartProducts = [];
		fixture.detectChanges();
	});

	test('should create', () => {
		expect(component).toBeTruthy();
	});
});
