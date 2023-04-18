import { Card, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AlbumLogin from '../../components/AlbumLogin'
import CreateAlbum from '../../components/CreateAlbum'
import AlbumList from '../../components/lists/AlbumList'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import MainLayout from '../../layouts/MainLayout'
import { NextThunkDispatch, wrapper } from '../../store'
import { fetchAlbams } from '../../store/actions-creators/album'
import { checkAuth } from '../../store/actions-creators/auth'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Skeleton from '@mui/material/Skeleton';
import globStyles from '../../styles/Common.module.scss'
import styles from '../../styles/AlbumPage.module.scss'

const Album = () => {
    const {albums} = useTypedSelector(state => state.album)
    const { isAuth, dataUser, isLoading } = useTypedSelector(state => state.auth)
    const dispatch = useDispatch() as NextThunkDispatch
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    console.log(isLoading) 

    useEffect(() => {
        if(localStorage.getItem('token')) {
            const firstFetch = async () => { 
                await dispatch(await checkAuth())
            }
            firstFetch()
        }
      }, [])

  if(isLoading) {
    return (
      <MainLayout title={'Список альбомов - музыкальная площадка'}>
          <Grid container justifyContent='center'>
              <Card className={globStyles.skeleton}>
                <div className={styles.title}>Список альбомов</div>
                <Skeleton variant="rounded" width={400} height={100} />
                <Skeleton variant="rounded" width={400} height={100} />
                <Skeleton variant="rounded" width={400} height={100} />
              </Card>
          </Grid>  
      </MainLayout>
    )
  }

  return (
    <MainLayout title={'Список альбомов - музыкальная площадка'}>
        <Grid container justifyContent='center'>
            <Card className={styles.card}>
            {isAuth == false 
              ? 
              <Box p={3}>
                <AlbumLogin/>
              </Box>
              : 
              <>
              <Box p={3}>
                <Grid container justifyContent={{xs: 'center', md: 'space-between'}} alignItems='center' >
                  <Box sx={{textAlign: 'center'}}>
                    <div className={styles.title}>Список альбомов</div>
                    <div className={matches ? styles.mail : styles.mailMin}>Твой майл: {dataUser.email}</div>
                    <div className={matches ? styles.warn :  styles.warnMin}>*твои альбомы видны только тебе</div>
                  </Box>
                  <Box >
                    <CreateAlbum/>
                  </Box>
                </Grid>
              </Box>
              <AlbumList albums={albums}/>
              {!albums.length && 
              <div className={styles.error}>Нет альбомов</div>
              }
              </>
            }
            </Card>
        </Grid>  
    </MainLayout>
  )
}

export default Album

export const getServerSideProps = wrapper.getServerSideProps(
    store => async () =>
    {
        const dispatch = store.dispatch as NextThunkDispatch;
        await dispatch(fetchAlbams());
        return { props: {} }
    }
);

