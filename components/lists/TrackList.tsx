import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ITrack } from '../../types/track'
import TrackItem from './TrackItem'

interface TrackListprops {
    tracks: ITrack[]
}

const TrackList: React.FC<TrackListprops> = ({tracks}) => {
  
  return (
    <Grid container direction='column'>
      <Box p={2} >
        {tracks.map(track =>
            <TrackItem
                key={track._id}
                track={track}
            />        
        )}
      </Box>
    </Grid>
  )
}

export default TrackList
