import React, {useEffect} from 'react'
import { IconButton, Grid, Box} from '@mui/material';
import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material'
import styles from '../styles/Player.module.scss'
import TrackProgress from './TrackProgress';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { useDispatch } from 'react-redux';
import { NextThunkDispatch } from '../store';
import {addListen} from '../store/actions-creators/track'
import stylesList from '../styles/List.module.scss'
import stylesCom from '../styles/Component.module.scss'
import { SERVER_URL } from '../http'

let audio;

const Player = () => {
  const {pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)
  const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration} = useActions()
  const dispatch = useDispatch() as NextThunkDispatch
  
  useEffect(() => {
    if(!audio) {
      audio = new Audio()
    } else {
      setAudio()
      play()
    }
  }, [active])

  const setAudio = () => {
    if (active) {
      audio.src = `${SERVER_URL}` + active.audio
      audio.volume = volume / 100
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration))
      }
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime))
      }
    } else {
      audio.src = null
    }
  }

  const play = async () => {
    if (pause) {
      playTrack()
      audio.play()
      if (active) {
        await dispatch(await addListen(active._id))
      }
    } else {
      pauseTrack()
      audio.pause()
    }
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100
    setVolume(Number(e.target.value))
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value)
    setCurrentTime(Number(e.target.value))
  }

  // if(!active) {
  //   return null
  // }

  return (
    <div className={styles.wrapperplayer}>
      <div className={styles.player}>
        {/* <Box className={styles.play}>
          <IconButton onClick={play}>
            {!pause
              ? <Pause className={stylesList.pauseTrackIt}/>
              : <PlayArrow className={stylesList.pauseTrackIt}/>}
          </IconButton>
          <Grid container direction='column' className={stylesList.gridAlbumIt}>
              <div className={styles.name}>{active?.name}</div>
              <div className={styles.artist}>{active?.artist}</div>
          </Grid>
        </Box>
        <Box className={styles.timeTrack}>
          <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
        </Box>
        <Box className={styles.sound}>
          <VolumeUp className={stylesCom.volume}/>
          <TrackProgress left={volume} right={100} onChange={changeVolume}/>
        </Box> */}
      </div>
    </div>
  )
}

export default Player
