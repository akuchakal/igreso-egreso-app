import * as fromUI from './ui.actions';

export interface State {
    isLoading: boolean;
}

const initState: State = {
    isLoading: false
}

export function uiReducer(state = initState, action: fromUI.Acciones): State {
    switch (action.type) {
        case fromUI.ACTIVAR_LOADING:
            return {
                isLoading: true
            }
            break;
        case fromUI.DESACTIVAR_LOADING:
            return {
                isLoading: false
            }
            break;
    
        default:
            return state;
            break;
    }
}