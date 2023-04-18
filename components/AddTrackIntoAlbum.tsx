import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Autocomplete, TextField } from '@mui/material';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { selectAddTrack } from '../store/actions-creators/album';
import axios from 'axios';
import styles from '../styles/Component.module.scss';
import { SERVER_URL } from '../http'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.5)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const AddTrackIntoAlbum = ({album, setAlbum}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()
    const { tracksForOptionAlbums} = useTypedSelector(state => state.track)
    const {selectTrack} = useTypedSelector(state => state.album)

    const createTrack = async () => {
        const response = await axios.post(`${SERVER_URL}album/tracks`, {
            trackId: selectTrack._id,
            albumId:  album._id
        })
        setAlbum({...album, tracks: [...album.tracks, response.data]})
        setOpen(false)
    }
    return (
      <div>
        <Button className={styles.addTrack} onClick={handleOpen}>Добавить трек</Button>
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
              <Autocomplete
                value={selectTrack.name ? selectTrack : tracksForOptionAlbums[0]}
                onChange={(e, newValue) => {  
                    dispatch(selectAddTrack(newValue))
                }}
                disableClearable
                options={tracksForOptionAlbums}
                getOptionLabel={(option: any ) => `${option.name}` }
                renderOption={(props, option: any) => (
                <Box component="li" {...props}>
                  <span>{option.name}</span>
                </Box>
                )}
                isOptionEqualToValue={(option: any, value: any) => option.name == value.name}
                renderInput={(params) => (
                <TextField
                  {...params}
                  label='track'
                />
                )}
              /> 
              <Button className={styles.addTrackModule} onClick={createTrack}>Добавить</Button>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
}

export default AddTrackIntoAlbum

