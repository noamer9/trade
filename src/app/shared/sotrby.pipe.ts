import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'sotrBy'
})
export class SotrbyPipe implements PipeTransform {

  transform(value: any[], order = '', column: string = ''): any[] {
    if( order === '1' ){
     return value.sort((a, b) => a.title.localeCompare(b.title));
    }
   return value.sort((a, b) => parseFloat(b.change) - parseFloat(a.change));
  }

}
