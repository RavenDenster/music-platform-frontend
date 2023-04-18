import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { Typography, Box, Autocomplete, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { NextThunkDispatch } from '../store';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { fetchPlaylistByGenre, selectHomeGenre, selectHomeAlbum, fetchHomeTrack, fetchGenre } from '../store/actions-creators/musicHome';

const SelectHome = () => {
    const dispatch = useDispatch()
    const dispatc = useDispatch() as NextThunkDispatch
    const {token, selectAlbum, genres, selectGenre, playlist, tracks} = useTypedSelector(state => state.musicHome)
    const [flag, setFlag] = useState(true)

    const changeSelect = async (newValue) => {
        dispatch(selectHomeGenre(newValue))
    }

    useEffect(() => {
        const firstFetch = async () => {
            await dispatc(await fetchGenre(token))
        }
        firstFetch()
    }, [])

    useEffect(() => {
        const firstFetch = async () => {
            await dispatc(await fetchPlaylistByGenre(token, selectGenre.id))
        }
        firstFetch()
        console.log(flag)
    }, [selectGenre])

    useEffect(() => {
        const firstFetch = async () => {
            await dispatc(await fetchHomeTrack(token, selectAlbum.tracks.href))
        }
        firstFetch()
    }, [selectAlbum])

    const alert = () => {
        if (!genres.length) {
            setFlag(false)
        }
    }

  return (
    <div>
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent='space-around' columns={{ lg: 12 }}>
            <Grid item xs={6} md={3}>
                <Autocomplete
                    value={selectGenre}
                    onChange={(e, newValue) => {  
                        changeSelect(newValue)
                    }}
                  disablePortal
                  id="combo-box-demo"
                  disableClearable
                  getOptionLabel={(option: any ) => `${option.name}` }
                  options={genres.length ? genres : []}
                  sx={{ width: 300 }}
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  renderInput={(params) => <TextField onChange={alert} {...params} label="Genre" />}
            />
            </Grid>
            <Grid item xs={6} md={3}>
                <Autocomplete
                    value={selectAlbum}
                    onChange={(e, newValue) => {  
                        dispatch(selectHomeAlbum(newValue))
                    }}
                  disablePortal
                  id="combo-box-demo"
                  disableClearable
                  getOptionLabel={(option: any ) => `${option.name}` }
                  options={playlist.length ? playlist : []}
                  sx={{ width: 300 }}
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  renderInput={(params) => <TextField onChange={alert} {...params} label="Album" />}
            />
            </Grid>
            {!flag && <div style={{opacity: '.5'}}>данная функция не работает на территории вашей страны</div> }
      </Grid>
    </div>
  )
}

export default SelectHome
