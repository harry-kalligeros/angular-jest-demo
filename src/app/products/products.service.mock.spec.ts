import { of } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { Product } from './product';
import { ProductsService } from './products.service';


jest.mock('@angular/common/http');

describe('ProductsService', () => {

	const httpClient = {
		get: jest.fn()
	};
	// new MockHttpClient();
	const productsService = new ProductsService(httpClient as any);

	test('should be created', () => {
		expect(productsService).toBeTruthy();
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

			httpClient.get.mockReturnValueOnce(of(dummyProducts));

			productsService.fetchProducts().subscribe(products => {
				expect(products.length).toBe(2);
				expect(products).toEqual(dummyProducts);
			});
			expect(httpClient.get.mock.calls[0][0]).toEqual('api/products');
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
		productsService.addProduct(product, quantity);
		const actual = productsService.selectedProducts;
		expect(actual).toEqual(expected);
	});

	test('removes a product', () => {
		productsService.selectedProducts = {
			16362: 2
		};
		const expected = {};
		productsService.removeProduct(16362);
		const actual = productsService.selectedProducts;
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
		const actual = productsService.calculatePrice(product);
		expect(actual).toEqual(expected);
	});

});
