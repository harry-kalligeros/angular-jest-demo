import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { Product } from './product';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
	let httpMock: HttpTestingController;
	let service: ProductsService;

	beforeEach(() => TestBed.configureTestingModule({
		imports: [HttpClientTestingModule],
	}));


	beforeEach(inject([HttpTestingController], _httpMock => {
		httpMock = _httpMock;
		service = TestBed.get(ProductsService);

	}));

	test('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('#fetchProducts', () => {
		test('should return an Observable<Product[]>', () => {
			const dummyProducts: Product[] = [
				{
					id: 39092,
					name: 'Sausages',
					price: 76.00,
					vat: '23%'
				},
				{
					id: 16362,
					name: 'Computer',
					price: 864.00,
					vat: '23%'
				}
			];

			service.fetchProducts().subscribe(products => {
				expect(products.length).toBe(2);
				expect(products).toEqual(dummyProducts);
			});

			const req = httpMock.expectOne(`api/products`);
			expect(req.request.method).toBe('GET');
			req.flush(dummyProducts);
		});
	});

	test('adds a product', () => {
		const product = {
			id: 16362,
			name: 'Computer',
			price: 864.00,
			vat: '23%'
		};
		const quantity = 2;
		const expected = {
			16362: 2
		};
		service.addProduct(product, quantity);
		const actual = service.selectedProducts;
		expect(actual).toEqual(expected);
	});

	test('removes a product', () => {
		service.selectedProducts = {
			16362: 2
		};
		const expected = {};
		service.removeProduct(16362);
		const actual = service.selectedProducts;
		expect(actual).toEqual(expected);
	});

	test('calculates the price of a product given the quantity and the VAT', () => {
		const product = {
			id: 16362,
			name: 'Computer',
			price: 864.00,
			vat: '23%',
			quantity: 3,
			subtotal: 0
		};
		const expected = 3188.16;
		const actual = service.calculatePrice(product);
		expect(actual).toEqual(expected);
	});

});
