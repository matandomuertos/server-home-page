import { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import PlayIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import RestartIcon from '@mui/icons-material/RestartAlt'
import StopIcon from '@mui/icons-material/Stop'
import container from './../features/container'

// Divide this in different components

function ManageDocker({app, containerName}) {

  const [loading, setLoading] = useState(false)

  const pauseCont = () => {
    setLoading(true)
    container.pauseContainer(containerName).then(() => {
      setLoading(false)
      window.location.reload(false)
    })
  }

  const startCont = () => {
    setLoading(true)
    container.startContainer(containerName).then(() => {
      setLoading(false)
      window.location.reload(false)
    })
  }

  const restartCont = () => {
    setLoading(true)
    container.restartContainer(containerName).then(() => {
      setLoading(false)
      window.location.reload(false)
    })
  }

  const stopCont = () => {
    setLoading(true)
    container.stopContainer(containerName).then(() => {
      setLoading(false)
      window.location.reload(false)
    })
  }

  const pauseStartButton = () => {
    if (app.State === 'running'){
      return(
        <IconButton aria-label="play/pause" onClick={pauseCont}>
          <PauseIcon sx={{ height: 30, width: 30 }} />
        </IconButton>
      )
    }
    else if (app.State === 'paused'){
      return(
        <IconButton aria-label="play/pause" onClick={startCont}>
          <PlayIcon sx={{ height: 30, width: 30 }} />
        </IconButton>
      )
    }
    else{
      return(
        <IconButton aria-label="play/pause" disabled>
          <PlayIcon sx={{ height: 30, width: 30 }} />
        </IconButton>
      )
    }
  }

  const restartButton = () => {
    if (app.State === 'running' || app.State === 'paused'){
      return(
        <IconButton aria-label="play/pause" onClick={restartCont}>
          <RestartIcon sx={{ height: 30, width: 30 }} />
        </IconButton>
      )
    }
    else{
      return(
        <IconButton aria-label="play/pause" disabled>
          <RestartIcon sx={{ height: 30, width: 30 }} />
        </IconButton>
      )
    }
  }

  const stopButton = () => {
    if (app.State === 'running' || app.State === 'paused'){
      return(
        <IconButton aria-label="play/pause" onClick={handleOpen}>
          <StopIcon sx={{ height: 30, width: 30 }} />
        </IconButton>
      )
    }
    else{
      return(
        <IconButton aria-label="play/pause" disabled>
          <StopIcon sx={{ height: 30, width: 30 }} />
        </IconButton>
      )
    }
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pt: 2 }}>
      {pauseStartButton()}
      {restartButton()}
      {stopButton()}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Are you sure?
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            If you stop this container, you will have to use docker cli to start it again
          </Typography>
          <Stack spacing={2} justifyContent="center" direction="row" sx={{ mt: 2 }}>
            <Button variant="contained" onClick={stopCont}>Accept</Button>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>

  )
}

export default ManageDocker