import React from 'react'
import styles from '../../styles/TrackItem.module.scss'
import { Card, IconButton, Grid } from '@mui/material';
import {Delete,} from '@mui/icons-material'
import { useRouter } from 'next/router';
import { NextThunkDispatch } from '../../store'
import { useDispatch } from 'react-redux'
import { IAlbum } from '../../types/album';
import { albumGive, deleteAlbum } from '../../store/actions-creators/album';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import axios from 'axios';
import stylesList from '../../styles/List.module.scss'
import { SERVER_URL } from '../../http'

interface AlbumItemProps {
    album: IAlbum;
}

const AlbumItem: React.FC<AlbumItemProps> = ({album}) => {
  const router = useRouter()
  const dispatch = useDispatch() as NextThunkDispatch
  const {albums} = useTypedSelector(state => state.album)
  const { user } = useTypedSelector(state => state.auth) 
  
  

  const delet = async (e) => {
    e.stopPropagation()
    const oneUser = await axios.get(`${SERVER_URL}users/` + user)
    // console.log(oneUser.data)
    const albumsNew = oneUser.data.albums.filter(alb => alb._id != album._id)
    const albumsId = albumsNew.map(album => album._id)
    const response = await axios.put(`${SERVER_URL}users/albums/delete/` +  user, {
        albums: albumsId
    })
    console.log(response.data)
    console.log(albums)
    await dispatch(albumGive(response.data.albums))
    await dispatch(await deleteAlbum(album._id)) 
  }

  return (
    <Card className={styles.track} onClick={() => router.push('/albums/' + album._id)}>
        <img width={70} height={70} src={`${SERVER_URL}` + album.picture} />
        <Grid container direction='column' className={stylesList.gridAlbumIt}>
            <div>{album.name}</div>
            <div className={stylesList.countTrack}>Кол-во треков: {album.tracks.length}</div>
        </Grid>
        <IconButton onClick={delet} style={{marginLeft: 'auto'}}>
            <Delete className={stylesList.deleteAlbumIt}/>
        </IconButton>
    </Card>
  )
}

export default AlbumItem