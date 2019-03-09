import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'myDecimal'
})
export class MyDecimalPipe implements PipeTransform {

	transform(value: number, args?: any): any {
		return value.toFixed(2);
	}

}
