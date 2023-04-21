import axios from 'axios'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import { IAlbum } from '../../types/album'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import MainLayout from '../../layouts/MainLayout'
import { useRouter } from 'next/router'
import AddTrackIntoAlbum from '../../components/AddTrackIntoAlbum'
import { NextThunkDispatch, wrapper } from '../../store'
import { fetchAllTracksForPagin } from '../../store/actions-creators/track'
import { fetchAlbams } from '../../store/actions-creators/album'
import TrackListInAlbum from '../../components/lists/TrackListInAlbum'
import Link from 'next/link'
import { useActions } from '../../hooks/useActions'
import styles from '../../styles/AlbumPage.module.scss'
import { SERVER_URL } from '../../http'

const AlbumPage = ({serverAlbum}) => {
    const [album, setAlbum] = useState<IAlbum>(serverAlbum)
    const router = useRouter()
    const {setActiveTrack} = useActions()
    // console.log(album)

    const changeActive = () => {
      setActiveTrack(null)
    }

  return (
    <MainLayout title={'Музыкальная площадка - ' + album.name} keywords={'музыка, артисты, ' + album.name}>
    <Grid container justifyContent={{xs: 'center', md: 'space-around'}}>
    <Link className={styles.link} href={'/albums'}>
        <Button
          variant={'outlined'}
          className={styles.bottom} 
          onClick={changeActive}
        >
          К списку альбомов
        </Button>
      </Link>
        <AddTrackIntoAlbum album={album} setAlbum={setAlbum}/>
    </Grid>
    <TrackListInAlbum album={album} setAlbum={setAlbum}/>
     {/* @ts-ignore */}
     {!album.tracks.length && 
        <div className={styles.errorID}>Нет треков в альбоме</div>
      }
  </MainLayout>
  )
}

export default AlbumPage

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ({params}) => {
    const response = await axios.get(`${SERVER_URL}album/` + params.id)
    const dispatch = store.dispatch as NextThunkDispatch;
    //@ts-ignore
        await dispatch(fetchAllTracksForPagin());
        await dispatch(fetchAlbams());
    return {
        props: {
            serverAlbum: response.data
        }
    }
}) 
