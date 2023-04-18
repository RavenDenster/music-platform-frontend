export interface AuthState {
    user: any;
    isAuth: any;
    error: string;
    dataUser: any;
    isLoading: boolean;
}

export enum AuthctionTypes {
    IS_AUTH = 'IS_AUTH',
    USER = 'USER',
    FETCH_AUTH_ERROR= 'FETCH_AUTH_ERROR',
    DATA_USER = 'DATA_USER',
    IS_LOADING = 'IS_LOADING'
}

interface FetchUSerAction {
    type: AuthctionTypes.USER;
    payload: any
}

interface IsAuthAction {
    type: AuthctionTypes.IS_AUTH;
    payload: boolean
}

interface IsAuthError {
    type: AuthctionTypes.FETCH_AUTH_ERROR
    payload: any
}

interface DataUser {
    type: AuthctionTypes.DATA_USER
    payload: any
}

interface IsLoading {
    type: AuthctionTypes.IS_LOADING
    payload: any
}

export type AuthAction = FetchUSerAction | IsAuthAction | IsAuthError | DataUser | IsLoading