import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import StopIcon from '@mui/icons-material/Stop'
import Container from './../../features/container'
import StopConfirmation from './StopConfirmation'

function StopContainerButton({app, containerName, setLoading}) {

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  function stopButton(){
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

	return (
		<>
		 {stopButton()}
     <StopConfirmation containerName={containerName} setLoading={setLoading} open={open} setOpen={setOpen} />
		</>
	)
}

export default StopContainerButton