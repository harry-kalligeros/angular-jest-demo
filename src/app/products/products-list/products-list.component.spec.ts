import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { Product, Quantities, AddProductEvent } from '../product';
import { ProductsListComponent } from './products-list.component';

describe('ProductsListComponent', () => {
	let component: ProductsListComponent;
	let fixture: ComponentFixture<ProductsListComponent>;
	let products: Product[];
	let quantities: Quantities;
	let tableEl: DebugElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule],
			declarations: [ProductsListComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProductsListComponent);
		component = fixture.componentInstance;
		tableEl = fixture.debugElement.query(By.css('table'));
		products = [
			{
				id: 69148,
				name: 'Bacon',
				price: 12.00,
				vat: '23%'
			},
			{
				id: 79695,
				name: 'Sausages',
				price: 14.50,
				vat: '23%'
			}
		];
		quantities = {
			69148: 2,
			79695: 3
		};
		component.products = products;
		component.quantities = quantities;
		fixture.detectChanges();

	});

	test('should create', () => {
		expect(component).toBeTruthy();
	});

	test('displays 2 products', () => {
		expect(tableEl.queryAll(By.css('tbody > tr')).length).toBe(2);
	});

	test('displays the Bacon with a quantity of 2', () => {
		expect(tableEl.query(By.css('tbody > tr:first-child input')).nativeElement.value).toBe('2');
	});

	test('displays the Sausages with a quantity of 3', () => {
		expect(tableEl.query(By.css('tbody > tr:nth-child(2) input')).nativeElement.value).toBe('3');
	});

	test('has the "Add to cart" disabled when the Sausages product have a quantity of 0', () => {
		const quantityEl = tableEl.query(By.css('tbody > tr:nth-child(2) input'));
		quantityEl.nativeElement.value = '0';
		quantityEl.nativeElement.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		const buttonEl = tableEl.query(By.css('tbody > tr:nth-child(2) button')).nativeElement;
		expect(buttonEl.disabled).toBe(true);
	});

	test('adds 4 pieces of Bacon to the cart', () => {
		let addProductEvent: AddProductEvent;
		const quantityEl = tableEl.query(By.css('tbody > tr:first-child input'));
		quantityEl.nativeElement.value = '4';
		quantityEl.nativeElement.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		const buttonEl = tableEl.query(By.css('tbody > tr:first-child button'));
		component.addToCart.subscribe(value => addProductEvent = value);
		buttonEl.triggerEventHandler('click', null);
		const expected = {
			product: {
				id: 69148,
				name: 'Bacon',
				price: 12.00,
				vat: '23%'
			},
			quantity: 4
		};
		expect(addProductEvent).toEqual(expected);
	});




});
