import { useRouter } from 'next/router'
import React, {useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import { ITrack } from '../../types/track'
import { Button, Grid, TextField } from '@mui/material'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { useInput } from '../../hooks/useInput'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link'
import styles from '../../styles/TrackPage.module.scss'
import { useActions } from '../../hooks/useActions';
import { SERVER_URL } from '../../http'

const TrackPage = ({serverTrack}) => {
  const [track, setTrack] = useState<ITrack>(serverTrack) 
  const username = useInput('')
  const text = useInput('')
  const {tracks} = useTypedSelector(state => state.track)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const matche = useMediaQuery(theme.breakpoints.up('sm'));
  const {setActiveTrack} = useActions()
  console.log(tracks)

  const addComment = async () => {
    try {
        const response = await axios.post(`${SERVER_URL}tracks/comment`, {
            username: username.value,
            text: text.value,
            trackId: track._id
        })
        setTrack({...track, comments: [...track.comments, response.data]})
    } catch (e) {
        console.log(e)
    }
  }

  const changeActive = () => {
    setActiveTrack(null)
  }

  return (
    <MainLayout title={'Музыкальная площадка - ' + track.name + ' - ' + track.artist} keywords={'музыка, артисты, ' + track.name + ', ' + track.artist}>
      <Link className={styles.link} href={'/tracks'}>
        <Button
          variant={'outlined'}
          className={styles.button}
          onClick={changeActive}
        >
          К списку
        </Button>
      </Link>

      <Grid container className={matches ? styles.gridID : styles.gridIDMin} columns={{ md: 12 }}>
        <img src={`${SERVER_URL}` + track.picture} width={200} height={200}/>
        <div className={styles.info}>
            <h1>Название трека - {track.name}</h1>
            <h1>Исполнитель - {track.artist}</h1> 
            <h1>Прослушиваний - {track.listens}</h1>
        </div>
      </Grid>
      <h1 className={matche ? styles.titleTextTrack : styles.titleTextTrackMin}>Слова в треке</h1>
      <p className={matche ? styles.textTrack : styles.textTrackMin}>{track.text}</p>
      <h1 className={matche ? styles.titleTextTrack : styles.titleTextTrackMin}>Комментарии</h1>
      
      <Grid container>
        <TextField
            label='Ваше имя'
            sx={{input: {color: 'rgba(255, 255, 255, 0.87)'}}}
            InputLabelProps={{style: {color: 'rgba(255, 255, 255, 0.87)'}}}
            fullWidth
            {...username}
        />
        <TextField
            label='Комментарий'
            fullWidth
            multiline
            sx={{textarea: {color: 'rgba(255, 255, 255, 0.87)'}, marginTop: '20px'}}
            InputLabelProps={{style: {color: 'rgba(255, 255, 255, 0.87)'}}}
            rows={4}
            {...text}
        />
        <Button className={styles.button2} onClick={addComment}>Отправить</Button>
      </Grid>
      <div style={{marginBottom: '-20px'}}>
        {track.comments.map(comment =>
            <div className={styles.comments}>
                <div >Автор - {comment.username}</div>
                <div>Комментарий - {comment.text}</div>
            </div>
        )}
      </div>
    </MainLayout>
  )
}

export default TrackPage

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get(`${SERVER_URL}tracks/` + params.id)
    return {
        props: {
            serverTrack: response.data
        }
    }
}