import axios from 'axios'
import {Dispatch} from 'react'
import { AlbumAction, AlbumsActionTypes } from '../../types/album'
import { SERVER_URL } from '../../http'

export const fetchAlbams = () => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get(`${SERVER_URL}album`)
            dispatch({type: AlbumsActionTypes.FETCH_ALBUMS, payload: response.data})
        } catch (e) {
            dispatch({type: AlbumsActionTypes.FETCH_ALBUMS_ERROR, payload: 'произошла ошибка при загрузке треков'})
        }
    }
}

export const deleteAlbum = (id: string) => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            await axios.delete(`${SERVER_URL}album/` + id)
        } catch (e) {
            dispatch({type: AlbumsActionTypes.FETCH_ALBUMS_ERROR, payload: 'произошла ошибка при загрузке треков'})
        }
    }
}

export const selectAddTrack = (payload): AlbumAction => {
    return {type: AlbumsActionTypes.SELECT_ADD_TRACK, payload}
}

export const albumsAdd = (payload): AlbumAction => {
    return {type: AlbumsActionTypes.SELECT_ADD_TRACK, payload}
}

export const albumGive = (payload): AlbumAction => {
    return {type: AlbumsActionTypes.FETCH_ALBUMS, payload}
}