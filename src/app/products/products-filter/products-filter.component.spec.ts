import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFilterComponent } from './products-filter.component';
import { FormsModule } from '@angular/forms';

describe('ProductsFilterComponent', () => {
	let component: ProductsFilterComponent;
	let fixture: ComponentFixture<ProductsFilterComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule],
			declarations: [ProductsFilterComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProductsFilterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	test('should create', () => {
		expect(component).toBeTruthy();
	});
});
