import { AlbumAction, AlbumState, AlbumsActionTypes } from "../../types/album"


const initialState: AlbumState = {
    albums: [],
    error: '',
    selectTrack: {}
}

export const albumReducer = (state = initialState, action: AlbumAction): AlbumState => {
    switch(action.type) {
        case AlbumsActionTypes.FETCH_ALBUMS_ERROR:
            return {...state, error: action.payload}
        case AlbumsActionTypes.FETCH_ALBUMS:
            return {...state, albums: action.payload}    
        case AlbumsActionTypes.SELECT_ADD_TRACK:
            return {...state, selectTrack: action.payload}
        default:
            return state
    }
}