import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import container from './../../features/container'

function StopConfirmation({containerName, setLoading, open, setOpen}) {

  function stopCont(){
    setLoading(true)
    container.stopContainer(containerName).then(() => {
      setLoading(false)
      window.location.reload(false)
    })
  }

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
  }

	return (
		<>
     <Modal open={open}>
       <Box sx={style}>
         <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
           Are you sure you want to stop it?
         </Typography>
         <Stack spacing={2} justifyContent="center" direction="row" sx={{ mt: 2 }}>
           <Button variant="contained" onClick={stopCont}>Accept</Button>
           <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
         </Stack>
       </Box>
     </Modal>
		</>
	)
}

export default StopConfirmation