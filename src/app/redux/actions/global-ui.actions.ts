import { Action } from '@ngrx/store';
import { UserIdentity } from './../../entities/user-identity';

export const SET_USER = '[Global UI] Guardar el usuario logado';
export class SetUser implements Action {
    readonly type = SET_USER;
    constructor(public payload: UserIdentity) { }
};

export const CLEAR_USER = '[Global UI] Borrar el usuario logado';
export class ClearUser implements Action {
    readonly type = CLEAR_USER;
};

export const NAVEGAR_A = '[Global UI] Iniciar Navegacion en la aplicacion';
export class NavegarA implements Action {
    readonly type = NAVEGAR_A;
    constructor(public payload: string) { }
};

export const SET_SPINNER = '[Global UI] Establecer visibilidad de loading spinner';
export class SetSpinnerVisibility implements Action {
    readonly type = SET_SPINNER;
    constructor(public payload: boolean) { }
};
