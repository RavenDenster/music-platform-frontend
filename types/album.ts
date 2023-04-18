import { ITrack } from "./track";

export interface IAlbum {
    _id: string;
    name: string;
    picture: string;
    tracks: ITrack[]
}


export interface AlbumState {
    albums: IAlbum[];
    error: string;
    selectTrack: any
}

export enum AlbumsActionTypes {
    FETCH_ALBUMS = 'FETCH_ALBUMS',
    FETCH_ALBUMS_ERROR = 'FETCH_ALBUMS_ERROR',
    SELECT_ADD_TRACK = 'SELECT_ADD_TRACK'
}

interface FetchAlbumsAction {
    type: AlbumsActionTypes.FETCH_ALBUMS;
    payload: IAlbum[]
}

interface FetchAlbumsErrorAction {
    type: AlbumsActionTypes.FETCH_ALBUMS_ERROR;
    payload: string
}

interface SelectAddTrackAction {
    type: AlbumsActionTypes.SELECT_ADD_TRACK;
    payload: any
}

export type AlbumAction = FetchAlbumsAction | FetchAlbumsErrorAction | SelectAddTrackAction