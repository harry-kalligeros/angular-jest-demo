import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CartProduct, Product, SelectedProducts } from './product';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {
	selectedProducts: SelectedProducts = {};

	constructor(private http: HttpClient) { }


	fetchProducts(): Observable<Product[]> {
		return this.http.get<Product[]>('api/products');
	}

	addProduct(product: Product, quantity: number) {
		this.selectedProducts[product.id] = (this.selectedProducts[product.id] || 0) + quantity;
	}

	removeProduct(id: number) {
		delete this.selectedProducts[id];
	}

	calculatePrice(product: CartProduct): number {
		const unitPrice = this.priceIncVat(product);
		return (unitPrice * product.quantity);
	}

	private priceIncVat(product: CartProduct) {
		const vat: number = parseInt(product.vat, 10);
		return (+product.price + ((vat * +product.price) / 100));
	}

}
