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
import { deleteTracks } from '../../store/actions-creators/track';
import { NextThunkDispatch, wrapper } from '../../store'
import { useDispatch } from 'react-redux'
import stylesList from '../../styles/List.module.scss'
import { SERVER_URL } from '../../http'

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
  const router = useRouter()
  const {playTrack, setActiveTrack} = useActions()
  const dispatch = useDispatch() as NextThunkDispatch

  const play = (e) => {
    e.stopPropagation()
    setActiveTrack(track)
    playTrack()
  }
 
  const delet = async (e) => { 
    e.stopPropagation()
    await dispatch(await deleteTracks(track._id)) 
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
              <div style={{color: 'white'}}>{track.name}</div>
              <div className={stylesList.artistTrackIt}>{track.artist}</div>
          </Grid>
          {active && <div>02:42 / 03:22</div>}
          <div onClick={delet} style={{marginLeft: 'auto'}}>
              <Delete className={stylesList.deleteAlbumIt}/>
          </div>
      </Card>
  )
}

export default TrackItem

// export const getServerSideProps = wrapper.getServerSideProps(
//   store => async () =>
//   {
//       const dispatch = store.dispatch as NextThunkDispatch;
//       await dispatch(deleteTracks(track._id));

//       return { props: {} }
//   }
// );