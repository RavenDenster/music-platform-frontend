import React from 'react'
import HomeTrackItem from './HomeTrackItem';
import styles from '../../styles/HomeTrackList.module.scss'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const HomeTrackList = ({tracks}) => {
    
  return (
    <div className='list'>
        <div className={styles.headerRow}>
          <div className="col">
            <span>#</span>
          </div>
          <div className="col">
            <span>TITLE</span>
          </div>
          <div className={styles.album}> 
            <span>ALBUM</span>
          </div>
          <div className={styles.time}>
            <AccessTimeIcon/>
          </div>
        </div>

        <div className={styles.tracks}>
          {tracks.length && tracks.map((data, index) => 
            <HomeTrackItem 
                data={data} 
                i={index} 
                key={data.id}
                />
          )}
        </div>
    </div>
  )
}

export default HomeTrackList
