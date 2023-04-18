export interface MusicHomeState {
    token: string;
    error: string; 
    genres: any
    playlist: any;
    tracks: any;
    selectGenre: any;
    selectAlbum: any;
    playerTrack: any;
    pauseHome: boolean;
    volumeHome: number;
}

export enum MusicHomeActionTypes {
    MUSIC_TOKEN = 'MUSIC_TOKEN',
    FETCH_MUSIC_ERROR = 'FETCH_MUSIC_ERROR',
    FETCH_GENRE = 'FETCH_GENRE',
    FETCH_PLAY_LIST_BY_GENRE = 'FETCH_PLAY_LIST_BY_GENRE', 
    FETCH_HOME_TRACK = 'FETCH_HOME_TRACK',
    SELECT_HOME_GENRE = 'SELECT_HOME_GENRE',
    SELECT_HOME_ALBUM = 'SELECT_HOME_ALBUM',
    PLAYER_TRACK = 'PLAYER_TRACK',
    HOME_PAUSE = 'HOME_PAUSE',
    HOME_PLAY = 'HOME_PLAY',
    HOME_VOLUME = 'HOME_VOLUME'
}

interface FetchMusicHomeAction {
    type: MusicHomeActionTypes.MUSIC_TOKEN;
    payload: any
}

interface FetchMusicHomeErrorAction {
    type: MusicHomeActionTypes.FETCH_MUSIC_ERROR;
    payload: string
}

interface FetchHomeGenreAction {
    type: MusicHomeActionTypes.FETCH_GENRE;
    payload: any
}

interface fetchPlaylistByGenre {
    type: MusicHomeActionTypes.FETCH_PLAY_LIST_BY_GENRE;
    payload: any
}

interface fetchHomeTrack {
    type: MusicHomeActionTypes.FETCH_HOME_TRACK;
    payload: any
}

interface selectHomeGenre {
    type: MusicHomeActionTypes.SELECT_HOME_GENRE;
    payload: any
}

interface selectHomeAlbum {
    type: MusicHomeActionTypes.SELECT_HOME_ALBUM;
    payload: any
}

interface selectHomePlayerTrack {
    type: MusicHomeActionTypes.PLAYER_TRACK;
    payload: any
}

interface pauseHome {
    type: MusicHomeActionTypes.HOME_PAUSE;
}

interface playHome {
    type: MusicHomeActionTypes.HOME_PLAY;
}

interface homeVolume {
    type: MusicHomeActionTypes.HOME_VOLUME;
    payload: any
}


export type MusicHomeAction = FetchMusicHomeAction | FetchMusicHomeErrorAction | FetchHomeGenreAction | fetchPlaylistByGenre | fetchHomeTrack | selectHomeGenre | selectHomeAlbum | selectHomePlayerTrack | pauseHome | playHome | homeVolume