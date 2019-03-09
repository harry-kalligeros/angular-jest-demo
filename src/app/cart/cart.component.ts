import { Component, OnInit } from '@angular/core';
import { SelectedProducts, CartProduct, Product } from '../products/product';
import { ProductsService } from '../products/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

	cartProducts: CartProduct[];
	_products: Product[];

	private subscription: Subscription;
	private _selectedProducts: SelectedProducts;

	constructor(private productsService: ProductsService) { }

	ngOnInit() {
		this.selectedProducts = this.productsService.selectedProducts;
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	get selectedProducts(): SelectedProducts {
		return this._selectedProducts;
	}

	set selectedProducts(selectedProducts: SelectedProducts) {
		this.makeCartProducts(selectedProducts);
		this._selectedProducts = selectedProducts;
	}

	removeFromCart(id: number) {
		this.productsService.removeProduct(id);
		this.selectedProducts = this.productsService.selectedProducts;
	}

	calculatePrice(product: CartProduct): number {
		const subtotal = this.productsService.calculatePrice(product);
		product.subtotal = subtotal;
		return subtotal;
	}

	private makeCartProducts(selectedProducts: SelectedProducts) {
		this.subscription = this.productsService.fetchProducts()
			.subscribe(products => {
				this._products = products;
				this.cartProducts = this._products
					.filter(product => selectedProducts.hasOwnProperty(product.id))
					.map(product => ({ ...product, quantity: selectedProducts[product.id], subtotal: 0 }))
					;
			});
	}
}
