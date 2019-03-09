import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-products-filter',
	templateUrl: './products-filter.component.html',
	styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit {

	@Output() filterChange = new EventEmitter<string>();

	private _productsFilter: string;

	constructor() { }

	ngOnInit() {
	}

	get productsFilter() {
		return this._productsFilter;
	}

	set productsFilter(value: string) {
		this._productsFilter = value;
		this.filterChange.emit(value);
	}

}
