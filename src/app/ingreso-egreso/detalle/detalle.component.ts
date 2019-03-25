import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgreso[];
  subscripcion: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subscripcion = this.store.select('ingresoEgreso')
      .pipe(
        filter(ieArray =>  ieArray.items.length > 0)
      )
      .subscribe(ingresoEgreso => {
        // console.log(ingresoEgreso.items);
        this.items = ingresoEgreso.items;
      });
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  borrarItem(item: IngresoEgreso) {
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
      .then(() => {
        Swal.fire({
          title: 'Eliminado',
          text: item.descripcion,
          type: 'success',
          confirmButtonText: 'Aceptar'
        });
      });  
  }

}
