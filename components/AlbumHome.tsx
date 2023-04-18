import React from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import HomeTrackList from './lists/HomeTrackList'
import styles from '../styles/AlbumHome.module.scss'

const AlbumHome = () => {

  const { selectAlbum, tracks} = useTypedSelector(state => state.musicHome)

  return (
         <>
         <div className={styles.playlist}>
           <div className={styles.image}>
             <img src={selectAlbum.image} alt="selected playlist" />
           </div>
           <div className={styles.details}>
             <span className="type">PLAYLIST</span>
             <h1 className={styles.title}>{selectAlbum.name}</h1>
             <p className={styles.description}>{selectAlbum.description}</p>
           </div>
         </div>
         <HomeTrackList tracks={tracks}/>
       </>
  )
}

export default AlbumHome
