import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'perfilimage'
})
export class PerfilimagePipe implements PipeTransform {

  transform(image: string): unknown {
    const url = 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png';
    return (image) ? image : url;
  }

}
