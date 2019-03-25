import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from './ingreso-egreso.model';

@Pipe({
  name: 'ordeningresoEgreso'
})
export class OrdeningresoEgresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    items = items || [];
    return items.sort((a,b) => {
      if (a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
