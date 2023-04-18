import { TrackAction, TrackActionTypes, TrackState } from "../../types/track"

const initialState: TrackState = {
    tracks: [],
    error: '',
    countTracks: '',
    isLoading: false,
    tracksForOptionAlbums: []
}

export const trackReducer = (state = initialState, action: TrackAction): TrackState => {
    switch(action.type) {
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return {...state, error: action.payload}
        case TrackActionTypes.FETCH_TRACKS:
            return {...state, tracks: action.payload}    
        case TrackActionTypes.FETCH_LEN_TRACKS:
            return {...state, countTracks: action.payload}    
        case TrackActionTypes.IS_LOADING:
            return {...state, isLoading: action.payload}  
        case TrackActionTypes.FETCH_TRACKS_ALBUM_OPTIONS:
            return {...state, tracksForOptionAlbums: action.payload}  
        default:
            return state
    }
}