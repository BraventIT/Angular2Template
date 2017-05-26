import { UserIdentity } from './../../entities';
import { Action } from '@ngrx/store';
import { GlobalUI } from '../actions';

export interface State {
    showSpinner: boolean;
    userInfo: UserIdentity;
};

export const initialState: State = {
    showSpinner: false,
    userInfo: null
};

export function reducer(state = initialState, action: Action): State {
    switch (action.type) {

        case GlobalUI.SET_SPINNER:
            return Object.assign({}, state, { showSpinner: action.payload });

        case GlobalUI.SET_USER:
            return Object.assign({}, state, { userInfo: action.payload });

        case GlobalUI.CLEAR_USER:
            return Object.assign({}, state, { userInfo: null });

        default:
            return state;
    }
};

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getShowSpinner = (state: State) => state.showSpinner;

export const getUserInfo = (state: State) => state.userInfo;
