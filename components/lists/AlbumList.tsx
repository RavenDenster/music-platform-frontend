import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import styles from '../../styles/TrackItem.module.scss'
import React from 'react'
import { IAlbum } from '../../types/album'
import AlbumItem from './AlbumItem'

interface AlbumListprops {
    albums: IAlbum[]
}

const AlbumList: React.FC<AlbumListprops> = ({albums}) => {
  return (
    <Grid container direction='column'>
      <Box p={2} className={styles.boxTrack}>
        {albums.map(album =>
            <AlbumItem
                key={album._id}
                album={album}
            />        
        )}
      </Box>
    </Grid>
  )
}

export default AlbumList
