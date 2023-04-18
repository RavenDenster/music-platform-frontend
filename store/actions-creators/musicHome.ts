import axios from 'axios'
import {Dispatch} from 'react'
import { MusicHomeAction, MusicHomeActionTypes } from '../../types/musicHome'


export const fetchToken = () => {
    return async (dispatch: Dispatch<MusicHomeAction>) => {
        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded', 
                    'Authorization' : 'Basic ' + btoa('1a9fe9f1a0fe46c59e704483e305cb7f' + ':' + 'fe7b542e792540b796fd16239920bdb1')
                },
                body: 'grant_type=client_credentials'
            });
            const data = await response.json();
            dispatch({type: MusicHomeActionTypes.MUSIC_TOKEN, payload: data.access_token})
            return data.access_token
        } catch (e) {
            dispatch({type: MusicHomeActionTypes.FETCH_MUSIC_ERROR, payload: 'произошла ошибка при загрузке треков'})
        }
    }
}


export const fetchGenre = (token: string) => {
    console.log('fdfd');
    
    return async (dispatch: Dispatch<MusicHomeAction>) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + token}
            });
            const data = await response.json();
            console.log(data.categories.items)
            dispatch({type: MusicHomeActionTypes.FETCH_GENRE, payload: data.categories.items})
        } catch (e) {
            console.log('fdfd');
            dispatch({type: MusicHomeActionTypes.FETCH_MUSIC_ERROR, payload: 'произошла ошибка при загрузке треков'})
        }
    }
}



export const fetchPlaylistByGenre = (token: string, genreId: string) => {
    return async (dispatch: Dispatch<MusicHomeAction>) => {
        try {
            const limit = 5;
            const response = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + token}
            });
            const data = await response.json();
            const items = data.playlists.items.map((item) => {
                const objPlaylist = {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    image: item.images[0].url,
                    tracks: item.tracks
                }
                return objPlaylist
            }) 
            
            dispatch({type: MusicHomeActionTypes.FETCH_PLAY_LIST_BY_GENRE, payload: items})
        } catch (e) {
            dispatch({type: MusicHomeActionTypes.FETCH_MUSIC_ERROR, payload: 'произошла ошибка при загрузке треков'})
        }
    }
}


export const fetchHomeTrack = (token: string, tracksEndPoint: string) => {
    return async (dispatch: Dispatch<MusicHomeAction>) => {
        try {
            const limit = 20;
            const response = await fetch(`${tracksEndPoint}?limit=${limit}`, {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + token}
            });
            const data = await response.json();
            const items = data.items.map(({track}) => {
                const objTracks = {
                    id: track.id,
                    name: track.name,
                    artists: track.artists.map((artist) => artist.name),
                    image: track.album.images[1].url,
                    duration: track.duration_ms,
                    album: track.album.name,
                    context_uri: track.album.uri,
                    trackHref: track.href,
                }
                return objTracks
            })
    
            dispatch({type: MusicHomeActionTypes.FETCH_HOME_TRACK, payload: items})
        } catch (e) {
            dispatch({type: MusicHomeActionTypes.FETCH_MUSIC_ERROR, payload: 'произошла ошибка при загрузке треков'})
        }
    }
}

export const fetchHomeOneTrack = (token: string, trackEndPoint: string) => {
    return async (dispatch: Dispatch<MusicHomeAction>) => {
        try {
            const response = await fetch(`${trackEndPoint}`, {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + token}
            });
            const data = await response.json();
            const item = {
                id: data.id,
                name: data.name,
                artists: data.artists.map((artist) => artist.name),
                image: data.album.images[2].url,
                previewUrl: data.preview_url,
            }
            dispatch({type: MusicHomeActionTypes.PLAYER_TRACK, payload: item})
        } catch (e) {
            dispatch({type: MusicHomeActionTypes.FETCH_MUSIC_ERROR, payload: 'произошла ошибка при загрузке треков'})
        }
    }
}

export const selectHomeGenre = (payload): MusicHomeAction => {
    return {type: MusicHomeActionTypes.SELECT_HOME_GENRE, payload}
}

export const selectHomeAlbum = (payload): MusicHomeAction => {
    return {type: MusicHomeActionTypes.SELECT_HOME_ALBUM, payload}
}

export const changeHomePause = (): MusicHomeAction => {
    return {type: MusicHomeActionTypes.HOME_PAUSE}
}

export const changeHomePlay = (): MusicHomeAction => {
    return {type: MusicHomeActionTypes.HOME_PLAY}
}

export const changeVolumePlay = (payload): MusicHomeAction => {
    return {type: MusicHomeActionTypes.HOME_VOLUME, payload}
}
