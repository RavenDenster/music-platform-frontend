export interface IComment {
    _id: string;
    username: string;
    text: string
}

export interface ITrack {
    _id: string;
    name: string;
    artist: string;
    text: string;
    listens: number;
    picture: string;
    audio: string;
    comments: IComment[]
}

export interface TrackState {
    tracks: ITrack[];
    error: string;
    countTracks: any;
    isLoading: boolean;
    tracksForOptionAlbums: ITrack[];
}

export enum TrackActionTypes {
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
    FETCH_LEN_TRACKS = 'FETCH_LEN_TRACKS',
    IS_LOADING = 'IS_LOADING',
    FETCH_TRACKS_ALBUM_OPTIONS = 'FETCH_TRACKS_ALBUM_OPTIONS'
}

interface FetchTracksAction {
    type: TrackActionTypes.FETCH_TRACKS;
    payload: ITrack[]
}

interface FetchTracksErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR;
    payload: string
}

interface FetchLenTracksAction {
    type: TrackActionTypes.FETCH_LEN_TRACKS;
    payload: any
}

interface IsLoading {
    type: TrackActionTypes.IS_LOADING;
    payload: any
}

interface FetchTracksAlbumOptions {
    type: TrackActionTypes.FETCH_TRACKS_ALBUM_OPTIONS;
    payload: ITrack[]
}

export type TrackAction = FetchTracksAction | FetchTracksErrorAction | FetchLenTracksAction | IsLoading | FetchTracksAlbumOptions