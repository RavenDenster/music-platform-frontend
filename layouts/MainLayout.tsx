import React from 'react'
import Navbar from '../components/Navbar'
import Player from '../components/Player';
import Head from 'next/head'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from '../styles/Common.module.scss'
import { Box, Container } from '@mui/material';

interface MainLayoutProps {
    children: React.ReactNode;
    title?: string
    description?: string
    keywords?: string
}

const MainLayout: React.FC<MainLayoutProps> = ({children, title, description, keywords}) => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
        <Head>
          <title>{title || 'Музыкальная площадка'}</title>
          <meta name='description' content={'Музыкальная площадка. Здесь каждый может оставить свой трек и стать знаменитым.' + description}/>
          <meta name='robots' content='index, follow'/>
          <meta name='keywords' content={keywords || "музыка, треки, артисты"}/>
          <meta name='viewport' content='width=device-width, initial=scale=1'/>
        </Head>
        <Navbar/>
          <Box className={matches ? styles.container : styles.containerMin}>
            {children} 
          </Box>
        {/* <Player/> */}
        <style jsx>
          {`
            .root-style {
              background: red;
            }
          `}
        </style>
    </>
  )
}

export default MainLayout
