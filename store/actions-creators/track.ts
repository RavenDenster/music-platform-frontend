import axios from 'axios'
import {Dispatch} from 'react'
import { SERVER_URL } from '../../http'
import { TrackAction, TrackActionTypes } from '../../types/track'

export const fetchAllTracksForPagin = () => {
    return async (dispatch: Dispatch<TrackAction>) => { 
        try {           
            const response = await axios.get(`${SERVER_URL}tracks`)
            dispatch({type: TrackActionTypes.FETCH_LEN_TRACKS, payload:response.data.length})
            dispatch({type: TrackActionTypes.FETCH_TRACKS_ALBUM_OPTIONS, payload:response.data})
        } catch (e) {
            dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'произошла ошибка при загрузке треков'})
        }
    }
}

export const fetchTracks = (curPage) => {
    return async (dispatch: Dispatch<TrackAction>) => { // когда мы получаем все элементы и запихиваем их в диспачь лучше это писать в отдельном файле, когда мы получаем один конкретный элемент лучше его получать уже в [id] файле и пощещать в отледьный стейт, чтобы позже его редактировать 
        try {           
            const response = await axios.get(`${SERVER_URL}tracks?count=10&offset=${curPage * 10}`)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'произошла ошибка при загрузке треков'})
        } 
    }
}

export const searchTracks = (query: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get(`${SERVER_URL}tracks/search?query=` + query)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'произошла ошибка при загрузке треков'})
        }
    }
}

export const deleteTracks = (id: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.delete(`${SERVER_URL}tracks/` + id)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'произошла ошибка при загрузке треков'})
        }
    }
}

export const addListen = (id: string) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            await axios.post(`${SERVER_URL}tracks/listen/` + id)
        } catch (e) {
            dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'произошла ошибка при загрузке треков'})
        }
    }
}