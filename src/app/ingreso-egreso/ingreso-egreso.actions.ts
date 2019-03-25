import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';

export const SET_ITEMS = '[Ingreso Egreso] Set Iems';
export const UNSET_ITEMS = '[Ingreso Egreso] Unset Iems';

export class SetItemsAction implements Action {
    readonly type = SET_ITEMS;

    constructor(public items: IngresoEgreso[]) {}
}

export class UnsetItemsAction implements Action {
    readonly type = UNSET_ITEMS;
}

export type Acciones = SetItemsAction | UnsetItemsAction;