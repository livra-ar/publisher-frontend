import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longText'
})
export class LongTextPipe implements PipeTransform {

  transform(value: string, maxLength?:number): string {
  	if (isNaN(maxLength))
  		maxLength = 20;

    return (value.length <= maxLength) ? value : value.substr(0, maxLength) + '...';
  }

}
