import { Component, OnInit, Input } from '@angular/core';
import { CartProduct } from '../products/product';

@Component({
	selector: 'app-total',
	templateUrl: './total.component.html',
	styleUrls: ['./total.component.scss']
})
export class TotalComponent implements OnInit {

	@Input() cartProducts: CartProduct[];

	ngOnInit() {

	}

	get total() {
		return this.calculateTotal();
	}

	private calculateTotal(): number {
		return this.cartProducts.reduce((acc: number, product: CartProduct) => {
			acc += product.subtotal;
			return acc;
		}, 0);
	}

}
