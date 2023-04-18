import React from 'react'
import styles from '../styles/Player.module.scss'
import stylesCom from '../styles/Component.module.scss'

interface TrackProgressProps {
    left: number;
    right: number;

    onChange: (e) => void
}

const TrackProgress: React.FC<TrackProgressProps> = ({left, right, onChange}) => {

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60);
    const seconds = ((ms % 60)).toFixed(0);
    if (Number(seconds) < 10) {
      return minutes + ":" + '0' + seconds;
    } else {
      return minutes + ":" + seconds;
    }
  }

  return (
    <div className={stylesCom.gridLogin}>
        <input 
            type='range'
            min={0}
            max={right}
            value={left}
            onChange={onChange}
        />
        {right == 100 ? <div className={styles.time} style={{color: 'white'}}>{left} / {right}</div> : <div style={{color: 'white'}}>{msToMinutesAndSeconds(left)} / {msToMinutesAndSeconds(right)}</div>}
    </div>
  )
}

export default TrackProgress
