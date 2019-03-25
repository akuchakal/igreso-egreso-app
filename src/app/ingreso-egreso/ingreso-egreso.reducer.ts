import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';

export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

const estatoInicial: IngresoEgresoState = {
    items: []
};

export function ingresoEgresoReducer( state = estatoInicial, action: fromIngresoEgreso.Acciones): IngresoEgresoState {
    switch (action.type) {
        case fromIngresoEgreso.SET_ITEMS:
            return {
                items: [ 
                    ...action.items.map(item => { return { ...item } })
                ]
            }
            break;
        case fromIngresoEgreso.UNSET_ITEMS:
            return { items: [] };
            break;
        default:
        return state;
            break;
    }
}

