import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { MockComponent, MockPipe } from 'src/setup-jest';
import { ProductsService } from '../products/products.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CartComponent', () => {
	let component: CartComponent;
	let fixture: ComponentFixture<CartComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule
			],
			declarations: [
				CartComponent,
				MockComponent('app-total', {inputs: ['cartProducts']}),
				MockPipe('myDecimal')
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	test('should create', () => {
		expect(component).toBeTruthy();
	});
});
