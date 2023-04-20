import { Box, Button } from '@mui/material'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AlbumHome from '../components/AlbumHome'
import AlbumLogin from '../components/AlbumLogin'
import HomePlayer from '../components/HomePlayer'
import Navbar from '../components/Navbar'
import SelectHome from '../components/SelectHome'
import { useTypedSelector } from '../hooks/useTypedSelector'
import MainLayout from '../layouts/MainLayout'
import { NextThunkDispatch, wrapper } from '../store'
import { fetchToken, fetchGenre, fetchPlaylistByGenre, fetchHomeTrack } from '../store/actions-creators/musicHome'
import styles from '../styles/Common.module.scss'

const Index = () => {
 
  return (
    <>
       {/* <MainLayout>        */}
              <SelectHome/>
              {/* <AlbumHome/>
              <Box className={styles.flex}>
                <HomePlayer/>
              </Box> */}
        {/* </MainLayout> */}
    </>
  )
}

export default Index

export const getServerSideProps = wrapper.getServerSideProps(
  store => async () =>
  {
      const dispatch = store.dispatch as NextThunkDispatch;
      const token = await dispatch(fetchToken())
      await dispatch(await fetchGenre(token))

      return { props: {} }
  }
);
