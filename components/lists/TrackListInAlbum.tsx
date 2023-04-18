import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, {useState} from 'react'
import { IAlbum } from '../../types/album'
import TrackItemInAlbum from './TrackItemInAlbum'

interface TrackListprops {
  album: IAlbum
  setAlbum: any
}

const TrackListInAlbum: React.FC<TrackListprops> = ({album, setAlbum}) => {

  return (
    <Grid container direction='column'>
      <Box p={2}>
        {album.tracks.map(track =>
            <TrackItemInAlbum
                key={track._id} 
                track={track}
                album={album}
                setAlbum={setAlbum}
            />        
        )}
      </Box>
    </Grid>
  )
}

export default TrackListInAlbum