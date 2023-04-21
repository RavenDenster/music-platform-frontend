import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useInput } from '../hooks/useInput';
import FileUpload from './FileUpload';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { albumsAdd } from '../store/actions-creators/album';
import { NextThunkDispatch } from '../store';
import CheckIcon from '@mui/icons-material/Check';
import styles from '../styles/Component.module.scss'
import { SERVER_URL } from '../http'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(0, 0, 0, 0.5)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CreateAlbum = () => {
    const [open, setOpen] = React.useState(false);
    const name = useInput('')
    const [picture, setPicture] = React.useState(null)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const router = useRouter()
    const { user, dataUser } = useTypedSelector(state => state.auth) 
    const {albums} = useTypedSelector(state => state.album)
    const dispatch = useDispatch() as NextThunkDispatch

    const createAlbum = async () => {
      if (picture && name.value) {
        const formData = new FormData()
        formData.append('name', name.value)
        formData.append('picture', picture)
        const res = await axios.post(`${SERVER_URL}album`, formData)
        const response = await axios.post(`${SERVER_URL}users/albums`, {
          albumId: res.data._id, 
          userId: user
        })
        await dispatch(albumsAdd(albums.push(response.data)))
        setOpen(false)
      } else {
        alert('нужно указать название и загрузить обложку!')
      }
    }

    const logout = () => {
      localStorage.removeItem('token')
      router.push('/albums')
    }
       
    return (
      <div>
        <div className={styles.createModule}>
          <Button className={styles.white} onClick={handleOpen}>Добавить альбом</Button>
          <Button className={styles.logout} onClick={logout}>выйти</Button>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <TextField
                {...name}
                sx={{input: {color: 'rgba(255, 255, 255, 0.87)'}, border: '1px solid white', borderRadius: '5px'}}
                InputLabelProps={{style: {color: 'rgba(255, 255, 255, 0.87)'}}}
                label= 'название альбома'
                rows={3}
              />
              <Box sx={{margin: '10px 0 40px 0'}}>
                <FileUpload setFile={setPicture} accept='image/*'>
                  <Button className={styles.white} >Загрузить изображение</Button>
                  {picture && <CheckIcon className={styles.green}/>}
                </FileUpload>
              </Box>
              <Button className={styles.white} onClick={createAlbum}>Создать</Button>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
}

export default CreateAlbum
