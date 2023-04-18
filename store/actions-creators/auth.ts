import { AuthAction, AuthctionTypes } from "../../types/auth"
import AuthService from "./axiosAuth"
import {Dispatch} from 'react'
import axios from "axios"
import { API_URL } from "../../http"
import { AlbumAction, AlbumsActionTypes } from "../../types/album"

export const changeUser = (payload): AuthAction => {
    return {type: AuthctionTypes.USER, payload}
}

export const changeAccess = (payload): AuthAction => {
    return {type: AuthctionTypes.IS_AUTH, payload}
}

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await AuthService.login(email, password)
            console.log(response.data.dataUser.albums)
            localStorage.setItem('token', response.data.token)
            dispatch({type: AuthctionTypes.IS_AUTH, payload: true})
            dispatch({type: AuthctionTypes.USER, payload: response.data.user})
            dispatch({type: AlbumsActionTypes.FETCH_ALBUMS, payload: response.data.dataUser.albums})
            dispatch({type: AuthctionTypes.DATA_USER, payload: response.data.dataUser})
        } catch(e) {
            //@ts-ignoretype-ignore
            dispatch({type: AuthctionTypes.FETCH_AUTH_ERROR, payload: 'пользователь не найден'})
        }
    }
}

export const registration = (email: string, password: string) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await AuthService.registration(email, password)
            localStorage.setItem('token', response.data.accessToken)
            dispatch({type: AuthctionTypes.IS_AUTH, payload: true})
            dispatch({type: AuthctionTypes.USER, payload: response.data.user})
            dispatch({type: AlbumsActionTypes.FETCH_ALBUMS, payload: response.data.dataUser.albums})
            dispatch({type: AuthctionTypes.DATA_USER, payload: response.data.dataUser})
        } catch(e) {
            //@ts-ignoretype-ignore
            dispatch({type: AuthctionTypes.FETCH_AUTH_ERROR, payload: 'некорректный майл или пароль'})
        }
    }
}

export const checkAuth = () => {
    return async (dispatch: Dispatch<any>) => {
        dispatch({type: AuthctionTypes.IS_LOADING, payload: true})
        try {
            const response = await axios.get<any>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response)
            localStorage.setItem('token', response.data.token)
            dispatch({type: AuthctionTypes.IS_AUTH, payload: true})
            dispatch({type: AuthctionTypes.USER, payload: response.data.user})
            dispatch({type: AlbumsActionTypes.FETCH_ALBUMS, payload: response.data.dataUser.albums})
            dispatch({type: AuthctionTypes.DATA_USER, payload: response.data.dataUser})
        } catch(e) {
            //@ts-ignoretype-ignore
            dispatch({type: AuthctionTypes.FETCH_AUTH_ERROR, payload: 'произошла ошибка при авторизации'})
        } finally {
            dispatch({type: AuthctionTypes.IS_LOADING, payload: false})
        }
    }
}