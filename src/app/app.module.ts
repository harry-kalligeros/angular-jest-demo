import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { MyDecimalPipe } from './my-decimal.pipe';
import { MyUnderlineDirective } from './my-underline.directive';
import { ProductsFilterComponent } from './products/products-filter/products-filter.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsComponent } from './products/products.component';
import { TotalComponent } from './total/total.component';

@NgModule({
	declarations: [
		AppComponent,
		TotalComponent,
		ProductsComponent,
		CartComponent,
		MyDecimalPipe,
		ProductsListComponent,
		ProductsFilterComponent,
		MyUnderlineDirective
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule
	],
	providers: [
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
