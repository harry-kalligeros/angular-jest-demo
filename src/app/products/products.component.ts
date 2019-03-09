import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from './products.service';
import { Product, Quantities, AddProductEvent } from './product';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
	products: Product[];
	initialProducts: Product[];
	quantities: Quantities;
	private subscription: Subscription;

	constructor(private productsService: ProductsService) { }

	ngOnInit() {
		this.registerSubscribers();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	addToCart($event: AddProductEvent) {
		const { product, quantity } = $event;
		this.productsService.addProduct(product, quantity);
		this.quantities[product.id] = 0;
	}

	updateProducts($event: string) {
		this.products = this.initialProducts
			.filter(product => product.name.toLowerCase().includes($event.toLowerCase()));
	}

	private registerSubscribers() {
		this.subscription = this.productsService.fetchProducts()
			.subscribe(products => {
				this.products = products;
				this.quantities = this.products.reduce((acc: Quantities, v: Product) => {
					acc[v.id] = 0;
					return acc;
				}, {});
				this.initialProducts = JSON.parse(JSON.stringify(products));
			});
	}

}
