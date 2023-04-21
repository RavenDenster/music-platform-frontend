import { MusicHomeAction, MusicHomeActionTypes, MusicHomeState } from "../../types/musicHome"

const initialState: MusicHomeState = {
    token: null,
    error: '',
    genres: {},
    playlist: {},
    tracks: {},
    selectGenre: {href: 'https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFDXXwE9BDJAr', icons: Array(1), id: '0JQ5DAqbMKFDXXwE9BDJAr', name: 'Rock'},
    selectAlbum: {id: '37i9dQZF1DXcF6B6QPhFDv', name: 'Rock This', description: "Nothing But Thieves along with today's Rock songs you need to hear.", image: 'https://i.scdn.co/image/ab67706f00000003c02bfd2d13e8c5784e0390f5', tracks: {href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DXcF6B6QPhFDv/tracks', total: 50}},
    playerTrack: {},
    pauseHome: false,
    volumeHome: 50,
}

export const musicHomeReducer = (state = initialState, action: MusicHomeAction): MusicHomeState => {
    switch(action.type) {
        case MusicHomeActionTypes.MUSIC_TOKEN:
            return {...state, token: action.payload}
        case MusicHomeActionTypes.FETCH_MUSIC_ERROR:
            return {...state, error: action.payload}
        case MusicHomeActionTypes.FETCH_GENRE:
            return {...state, genres: action.payload}
        case MusicHomeActionTypes.FETCH_PLAY_LIST_BY_GENRE:
            return {...state, playlist: action.payload}
        case MusicHomeActionTypes.FETCH_HOME_TRACK:
            return {...state, tracks: action.payload}
        case MusicHomeActionTypes.SELECT_HOME_GENRE:
            return {...state, selectGenre: action.payload}
        case MusicHomeActionTypes.SELECT_HOME_ALBUM:
            return {...state, selectAlbum: action.payload}
        case MusicHomeActionTypes.PLAYER_TRACK:
            return {...state, playerTrack: action.payload, pauseHome: false}
        case MusicHomeActionTypes.HOME_PAUSE:
            return {...state, pauseHome: true}
        case MusicHomeActionTypes.HOME_PLAY:
            return {...state, pauseHome: false}
        case MusicHomeActionTypes.HOME_VOLUME:
                return {...state, volumeHome: action.payload}
        default:
            return state
    }
}