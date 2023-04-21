import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { NextThunkDispatch } from '../store'
import {login, registration} from '../store/actions-creators/auth'
import styles from '../styles/Component.module.scss'

const AlbumLogin = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch() as NextThunkDispatch
    const { error } = useTypedSelector(state => state.auth) 

    const log = async () => {
      await dispatch(await login(email, password))
      console.log(error, email.length)
    }

    const regist = async () => {
      await dispatch(await registration(email, password))
      console.log(error)
    }

    return (
      <>  
        <h2 className={styles.titleLogin}>Чтобы увидеть свои альбомы нужно зарегистрироваться/авторизоваться</h2>
        <Grid container direction='column' justifyContent='center' alignItems='center'>
          <Grid item>
            <TextField
                onChange={e => setEmail(e.target.value)}
                value={email}
                type='text'
                placeholder='Email'
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={e => setPassword(e.target.value)}
              value={password}
              type='password'
              sx={{margin: '20px 0 20px 0'}}
              placeholder='Пароль'
            />
          </Grid>
          <Grid item className={styles.gridLogin}>
            <Button sx={{color: 'white'}} onClick={log}>Логин</Button>
            <Button sx={{color: 'white'}} onClick={regist}>Регистрация</Button>
          </Grid>
          <Grid item sx={{color: 'red'}}>{error && error}</Grid>
        </Grid>
      </>
    )
  }
  export default AlbumLogin