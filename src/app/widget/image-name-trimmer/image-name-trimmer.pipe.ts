import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageNameTrimmer'
})
export class ImageNameTrimmerPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.length > 25? value.slice(0,8) + '...' + value.slice(value.lastIndexOf('.') - 3, value.length): value;
  }

}
