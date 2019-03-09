import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product, Quantities, AddProductEvent } from '../product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent  {

	@Input() products: Product[];
	@Input() quantities: Quantities;
	@Output() addToCart = new EventEmitter<AddProductEvent>();

	addProductToCart(product: Product, quantity: number) {
		this.addToCart.emit({product, quantity});
	}
}
