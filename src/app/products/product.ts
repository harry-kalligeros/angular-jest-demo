export class Product {
	id: number;
	name: string;
	price: number;
	vat: string;
}

export class CartProduct extends Product {
	quantity: number;
	subtotal: number;
}


export type ProductSchema = Record<keyof Product, string>;

export type SelectedProducts = Record<number, number>;
export type Quantities = Record<number, number>;

export interface AddProductEvent {
	product: Product;
	quantity: number;
}
