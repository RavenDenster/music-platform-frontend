import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import PaginationItem from '@mui/material/PaginationItem'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box';
import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import TrackList from '../../components/lists/TrackList'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import MainLayout from '../../layouts/MainLayout'
import { NextThunkDispatch, wrapper } from '../../store'
import { fetchAllTracksForPagin, fetchTracks, searchTracks } from '../../store/actions-creators/track'
import Pagination from '@mui/material/Pagination';
import styles from '../../styles/TrackPage.module.scss'
import globStyles from '../../styles/Common.module.scss'
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link'
import { useActions } from '../../hooks/useActions'


const index = () => {
  const {tracks, error, countTracks} = useTypedSelector(state => state.track)
  const [query, setQuery] = useState<string>('')
  const dispatch = useDispatch() as NextThunkDispatch
  const [timer, setTimer] = useState(null)
  const [curPage, setCurPage] = useState(1)
  const count = Math.ceil(countTracks / 10)
  const {setActiveTrack} = useActions()

   useEffect(() => {
    const firstFetch = async () => {
        await dispatch(await fetchAllTracksForPagin())
    }
    firstFetch()
   }, [tracks])

   useEffect(() => {
    const firstFetch = async () => {
        await dispatch(await fetchTracks(curPage - 1));
    }
    firstFetch()
   }, [curPage])
   
   const pagin = (item, value) => {
    setCurPage(value)
   }

   const changeActive = () => {
    setActiveTrack(null)
  }
 
  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if(timer) {
        clearTimeout(timer)
    }
    setTimer(
        setTimeout(async () => {
            await dispatch(await searchTracks(e.target.value))
        }, 500)
    )
  }
  
  if (error) {
    return <MainLayout> 
        <h1>{error}</h1>
    </MainLayout>
  }

  return (
    <MainLayout title={'Список треков - музыкальная площадка'}>
        <Grid container justifyContent='center'>
            <Card className={styles.mainCard}>
                <Box p={3}>
                    <Grid container justifyContent='space-between'>
                        <h1 className={styles.title}>Список треков</h1>
                        <Link className={styles.link} href={'/tracks/create'}>
                            <Button className={styles.title} onClick={changeActive}>Загрузить</Button>
                        </Link>
                    </Grid>
                </Box>
                <TextField 
                    fullWidth
                    placeholder='Search...'
                    value={query}
                    onChange={search}
                />
                <div style={{opacity: '.5'}}>*треки которые вы загрузите будут видны всем пользователям</div>
                <TrackList tracks={tracks}/>
                {!tracks.length && 
                    <Box className={globStyles.skeleton}>
                        <Skeleton variant="rounded" width={400} height={100} />
                        <Skeleton variant="rounded" width={400} height={100} />
                        <Skeleton variant="rounded" width={400} height={100} />
                    </Box>
                }
                <Box className={globStyles.flex}>
                    {/* @ts-ignore */}
                    <Pagination count={count} color="primary" variant="outlined" className={styles.pagin} onChange={(e, v) => pagin(e, v)} shape="rounded" renderItem={(item)=> <PaginationItem {...item} className={styles.paginItem}/>} />
                </Box>
            </Card>
        </Grid>
    </MainLayout>
  )
}

export default index

// export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
//     const dispatch = store.dispatch as NextThunkDispatch
//     await dispatch(await fetchTracks())
// })

export const getServerSideProps = wrapper.getServerSideProps(
    store => async () =>
    {
        // const dispatch = store.dispatch as NextThunkDispatch;
        // await dispatch(fetchTracks());

        return { props: {} }
    }
);
