import { AuthAction, AuthctionTypes, AuthState } from "../../types/auth"

const initialState: AuthState = {
   user: {},
   isAuth: false,
   error: '',
   dataUser: {},
   isLoading: false
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch(action.type) {
        case AuthctionTypes.USER:
            return {...state, user: action.payload}
        case AuthctionTypes.IS_AUTH:
            return {...state, isAuth: action.payload}
        case AuthctionTypes.FETCH_AUTH_ERROR:
            return {...state, error: action.payload}
        case AuthctionTypes.DATA_USER:
            return {...state, dataUser: action.payload}
        case AuthctionTypes.IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}