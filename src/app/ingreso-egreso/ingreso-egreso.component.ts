import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
// import { AppState } from '../app.reducer';
import * as fromIngresoEgreso from './ingreso-egreso.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  forma: FormGroup;
  tipo = 'ingreso';
  loadingSubs: Subscription = new Subscription();
  cargando: boolean;

  constructor(
    public ingresoEgresoService: IngresoEgresoService,
    private store: Store<fromIngresoEgreso.AppState>) { }

  ngOnInit() {
    this.ingresoEgresoService.initIngresoEgresoListener();
    this.loadingSubs = this.store.select('ui')
      .subscribe( ui => this.cargando = ui.isLoading );
    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0)),
    });
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  crearIngresoEgreso(){
    this.store.dispatch(new ActivarLoadingAction());
    const ingresoEgreso = new IngresoEgreso({
      ...this.forma.value,
      tipo: this.tipo
    });
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then( () => {
        this.forma.reset({ monto: 0 });
        this.notificacion(
          'Operacion exitosa',
          'La operación se realizo correctamente',
          'success');
      })
      .catch( err => {
        this.notificacion(
          'Error',
          err.message,
          'error');
      })
      .finally( () => this.store.dispatch(new DesactivarLoadingAction()));
  }

  private notificacion(titulo: string, msg: string, tipo: any ) {
    Swal.fire({
      title: titulo,
      text: msg,
      type: tipo,
      confirmButtonText: 'Aceptar'
    });
  }

}
