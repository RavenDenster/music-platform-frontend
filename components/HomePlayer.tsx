import React, { useEffect } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import styles from '../styles/HomePlayer.module.scss'
import { Pause, PlayArrow, VolumeUp, } from '@mui/icons-material'
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { IconButton } from '@mui/material';
import { changeHomePause, changeHomePlay, changeVolumePlay, fetchHomeOneTrack } from '../store/actions-creators/musicHome';
import { useDispatch } from 'react-redux';
import { NextThunkDispatch } from '../store';

let audioHome
const HomePlayer = () => {

  const { pauseHome, playerTrack, volumeHome, tracks, token } = useTypedSelector(state => state.musicHome) 
  const dispatch = useDispatch()
  const dispatc = useDispatch() as NextThunkDispatch

    useEffect(() => {
        if(!audioHome) {
            audioHome = new Audio()
        } else {
          setAudio()
          play()
        }
    }, [playerTrack])

    const changeTrack = async (prev) => {
        if (tracks.length) {
            console.log(playerTrack, tracks)
            const index = tracks.findIndex(el => el.id == playerTrack.id) 
            if (prev == 'previous') {
                if (index == 0) {
                    console.log('')
                } else {
                    const track = tracks[index - 1] 
                    await dispatc(await fetchHomeOneTrack(token, track.trackHref))
                }
            } else {
                if (index == 19) {
                    console.log('')
                } else {
                    const track = tracks[index + 1] 
                    await dispatc(await fetchHomeOneTrack(token, track.trackHref))
                }
            }
        }
    }

    const setAudio = () => {
        if (playerTrack) {
            audioHome.src = playerTrack.previewUrl
            audioHome.volume = volumeHome / 100
          }
    }

    const play = () => {
        console.log(pauseHome, audioHome)
        if (pauseHome) {
            setTimeout(function () {      
                dispatch(changeHomePlay())
                audioHome.play()
             }, 150)
        } else {
            setTimeout(function () {      
                dispatch(changeHomePause())
                audioHome.pause()
             }, 150)
        }
    }

    const changeVolume = (e) => {
        audioHome.volume = Number(e.target.value) / 100
        dispatch(changeVolumePlay(Number(e.target.value)))
    }

    
 
  return (
    <div className={styles.player}>
        <div className={styles.track}> 
            <div className="trackImage">
                <img src={playerTrack.image} alt="currentPlaying" />
                </div>
                <div className={styles.trackInfo}>
                <div className={styles.trackInfoTrackName}>{playerTrack.name}</div>
                <div className={styles.trackInfoTrackArtists}>
                    {playerTrack.artists.join(", ")}
                </div>
            </div>
        </div>

        <div className={styles.controller}>
            <div className="previous">
                <SkipPreviousIcon onClick={() => changeTrack("previous")} />
            </div>
            <div className="state">
                <IconButton onClick={play}>
                    {/* {!pauseHome
                    ? <Pause sx={{color: 'white'}}/>
                    : <PlayArrow sx={{color: 'white'}}/>} */}
                </IconButton>
            </div>
            <div className="next">
              <SkipNextIcon onClick={() => changeTrack("next")} />
            </div>
        </div>

        <div className={styles.value}>
            <input className={styles.inputRange} type="range" onChange={changeVolume} value={volumeHome} min={0} max={100} />
        </div>
    </div>
  )
}

export default HomePlayer
