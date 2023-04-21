import React from 'react'
import { ITrack } from '../../types/track'
import styles from '../../styles/TrackItem.module.scss'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Delete from '@mui/icons-material/Delete'
import Pause from '@mui/icons-material/Pause'
import PlayArrow from '@mui/icons-material/PlayArrow'
import { useRouter } from 'next/router';
import { useActions } from '../../hooks/useActions';
import { IAlbum } from '../../types/album';
import axios from 'axios';
import stylesList from '../../styles/List.module.scss'
import { SERVER_URL } from '../../http'

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
    album: IAlbum
    setAlbum: any
  } 

const TrackItemInAlbum: React.FC<TrackItemProps> = ({track, active = false, album, setAlbum}) => {
  const router = useRouter()
  const {playTrack, pauseTrack, setActiveTrack} = useActions()

  const play = (e) => {
    e.stopPropagation()
    setActiveTrack(track)
    playTrack()
  }

  const delet = async (e) => {
    const tracksNew = album.tracks.filter(trac => trac._id != track._id)
    const tracksId = tracksNew.map(track => track._id)
    e.stopPropagation()
    const response = await axios.put(`${SERVER_URL}album/tracks/delete/` +  album._id, {
            tracks: tracksId
    })
    setAlbum({...album, tracks: response.data.tracks}) // мы могли сделать так через стейт или через router (.then(resp => router.push('/albums'))) но с динамическими лучше так делать
  }

  return (
    <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
        <div onClick={play}>
          {active
            ? <Pause className={stylesList.pauseTrackIt}/>
            : <PlayArrow className={stylesList.pauseTrackIt}/>}
        </div>
        <img width={70} height={70} src={`${SERVER_URL}` + track.picture} />
        <Grid container direction='column' className={stylesList.gridTrackIt}>
            <div>{track.name}</div>
            <div className={stylesList.artistTrackIt}>{track.artist}</div>
        </Grid>
        {active && <div>02:42 / 03:22</div>}
        <div onClick={delet} style={{marginLeft: 'auto'}}>
            <Delete className={stylesList.deleteAlbumIt}/>
        </div>
    </Card>
  )
}

export default TrackItemInAlbum
