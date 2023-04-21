import React, { useState } from 'react'
import StepWrapper from '../../components/StepWrapper'
import MainLayout from '../../layouts/MainLayout'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import FileUpload from '../../components/FileUpload';
import { useInput } from '../../hooks/useInput';
import { useRouter } from 'next/router';
import axios from 'axios' 
import styles from '../../styles/TrackPage.module.scss'
import CheckIcon from '@mui/icons-material/Check';
import { SERVER_URL } from '../../http'

const Create = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [picture, setPicture] = useState(null)
  const [audio, setAudio] = useState(null)
  const name = useInput('')
  const artist = useInput('')
  const text = useInput('')
  const router = useRouter()

  const next = () => {
    if (activeStep !== 2) {
        setActiveStep(prev => prev + 1)
    } else {
        if (name.value && text.value && artist.value && picture && audio) {
          const formData = new FormData()
        formData.append('name', name.value)
        formData.append('text', text.value)
        formData.append('artist', artist.value)
        formData.append('picture', picture)
        formData.append('audio', audio)
        axios.post(`${SERVER_URL}tracks`, formData)
            .then(resp => router.push('/tracks'))
            .catch(e => console.log(e))
        } else {
          alert('не указана необходимая информация!')
        }
    }
    }

  const back = () => {
    setActiveStep(prev => prev - 1)
  }

  return (
    <MainLayout>
     <StepWrapper activeStep={activeStep}>
        {activeStep == 0 &&
          <Grid container direction='column' style={{padding: 20}}>
            <TextField
              {...name}
              style={{marginTop: 10}}
              sx={{input: {color: 'rgba(255, 255, 255, 0.87)'}}}
              InputLabelProps={{style: {color: 'rgba(255, 255, 255, 0.87)'}}}
              label= 'Название трека'
            />
             <TextField
              {...artist}
              style={{marginTop: 10}}
              sx={{input: {color: 'rgba(255, 255, 255, 0.87)'}}}
              InputLabelProps={{style: {color: 'rgba(255, 255, 255, 0.87)'}}}
              label={'Имя исполнителя'}
            />
             <TextField
              {...text}
              style={{marginTop: 10}}
              sx={{textarea: {color: 'rgba(255, 255, 255, 0.87)'}}}
              InputLabelProps={{style: {color: 'rgba(255, 255, 255, 0.87)'}}}
              label= 'Слова к треку'
              multiline
              rows={3}
            />
          </Grid>
        }
        {activeStep == 1 &&
          <FileUpload setFile={setPicture} accept='image/*'>
            <Button className={styles.white}>Загрузить изображение</Button>
            {picture && <CheckIcon className={styles.green}/>}
          </FileUpload>
        }
        {activeStep == 2 &&
          <FileUpload setFile={setAudio} accept='audio/*'>
           <Button className={styles.white}>Загрузить аудио</Button>
           {audio && <CheckIcon className={styles.green}/>}
          </FileUpload>
        }
     </StepWrapper>
     <Grid container justifyContent='space-between'>
        <Button className={styles.white} disabled={activeStep === 0} onClick={back}>Назад</Button>
        <Button className={styles.white} onClick={next}>Далее</Button>
     </Grid>
    </MainLayout>
  )
}

export default Create
