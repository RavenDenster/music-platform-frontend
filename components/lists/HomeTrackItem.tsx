import React from 'react'
import styles from '../../styles/HomeTrackItem.module.scss'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { NextThunkDispatch } from '../../store'
import { fetchHomeOneTrack } from '../../store/actions-creators/musicHome'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const HomeTrackItem = ({data, i}) => {

  const dispatch = useDispatch() as NextThunkDispatch
  const {token} = useTypedSelector(state => state.musicHome)

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    if (Number(seconds) < 10) {
      return minutes + ":" + '0' + seconds;
    } else {
      return minutes + ":" + seconds;
    }
  }

  const click = async () => {
    await dispatch(await fetchHomeOneTrack(token, data.trackHref))
  }

  return (
    <div
      className={styles.row}
      onClick={click}
    >
        <div className={styles.col}>
          <span>{i + 1}</span>
        </div>
        <div className={classNames(styles.col, styles.detail)}>
          <div className="image">
            <img src={data.image} alt="track" />
          </div>
          <div className='info'>
            <span className="name">{data.name}</span>
            <span>{data.artists}</span>
          </div>
        </div> 
        <div className={styles.artist}>
          <div className={styles.col}>
            <span>{data.album}</span>
          </div>
        </div>
        <div className={classNames(styles.col, styles.time)}>
          <span>{msToMinutesAndSeconds(data.duration)}</span>
        </div>
    </div>
  )
}

export default HomeTrackItem
