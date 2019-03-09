import { of } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MockComponent } from 'src/setup-jest';

import { ProductsComponent } from './products.component';
import { ProductsService } from './products.service';

const products = [{
	id: 16362,
	name: 'Computer',
	price: 864.00,
	vat: '23%',
	quantity: 0,
	subtotal: 0
}, {
	id: 16363,
	name: 'Printer',
	price: 342.00,
	vat: '23%',
	quantity: 0,
	subtotal: 0
}];
const mockProductsService = {
	addProduct: jest.fn(),
	fetchProducts: jest.fn(() => of(products))
};

describe('ProductsComponent', () => {
	let component: ProductsComponent;
	let fixture: ComponentFixture < ProductsComponent > ;

	beforeEach(async (() => {
		TestBed.configureTestingModule({
				imports: [HttpClientTestingModule],
				declarations: [
					ProductsComponent,
					MockComponent('app-products-filter', {
						outputs: ['filterChange']
					}),
					MockComponent('app-products-list', {
						inputs: ['quantities', 'products'],
						outputs: ['addToCart']
					})
				],
				providers: [{
					provide: ProductsService,
					useValue: mockProductsService
				}]
			})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProductsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	test('should create', () => {
		expect(component).toBeTruthy();
	});

	test('should fetch the list of products, on initialisation', () => {
		expect(component.products).toEqual(products);
		expect(component.initialProducts).toEqual(products);
	});

	test('should reset all product quantities to 0, on itialisation', () => {
		const expected = {
			[products[0].id]: 0,
			[products[1].id]: 0
		};
		expect(component.quantities).toEqual(expected);
	});

	test('should add to cart a product', () => {
		const addToCartSpy = jest.spyOn(component, 'addToCart');
		const addProductSpy = jest.spyOn(mockProductsService, 'addProduct');
		const debugElement = fixture.debugElement;
		const appProdListFixture = debugElement.query(By.css('app-products-list'));
		const appProdListInstance = appProdListFixture.componentInstance;
		const appProductEvent = {
			product: products[0],
			quantity: 4
		};
		appProdListInstance.addToCart.emit(appProductEvent);

		expect(addToCartSpy).toHaveBeenCalledWith(appProductEvent);
		expect(addProductSpy).toHaveBeenLastCalledWith(appProductEvent.product, appProductEvent.quantity);
		expect(component.quantities[products[0].id]).toBe(0);
	});

	test('should filter the products by their name', () => {
		const updateProductsSpy = jest.spyOn(component, 'updateProducts');
		const debugElement = fixture.debugElement;
		const appProdFilterFixture = debugElement.query(By.css('app-products-filter'));
		const appProdFilterInstance = appProdFilterFixture.componentInstance;
		const filter = 'Print';

		component.initialProducts = products;
		appProdFilterInstance.filterChange.emit(filter);

		expect(updateProductsSpy).toHaveBeenCalledWith(filter);
		expect(component.products.length).toBe(1);
		expect(component.products[0]).toEqual(products[1]);

	});
});
