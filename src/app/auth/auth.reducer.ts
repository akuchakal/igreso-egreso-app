import * as fromAuth from './auth.actions';
import { User } from './user.model';

export interface AuthState {
    user: User;
}

const estadoInicial: AuthState = {
    user: null
};


export function authReducers(state = estadoInicial, action: fromAuth.Acciones): AuthState {
    switch (action.type) {
        case fromAuth.SET_USER:
            return {
                user: {...action.user}
            };
            break;
    
        default:
        return state;
            break;
    }
}