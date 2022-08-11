import { useState } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
import StopContainerButton from './dockerControlComponents/StopContainerButton'
import PauseStartContainerButton from './dockerControlComponents/PauseStartContainerButton'
import RestartContainerButton from './dockerControlComponents/RestartContainerButton'

function ManageDocker({app, containerName}) {

  const [loading, setLoading] = useState(false)

  function isLoading(){
    if(loading){
      return (
          <CircularProgress color="inherit" />
      )
    }
    else{
      return(
        <>
          <RestartContainerButton app={app} containerName={containerName} setLoading={setLoading} />
          <PauseStartContainerButton app={app} containerName={containerName} setLoading={setLoading} />
          <StopContainerButton app={app} containerName={containerName} setLoading={setLoading} />
        </>
      )
    }
  }

  return (
    <Box sx={{ display: 'flex', pt: 2, justifyContent: 'center' }}>
      {isLoading()}
    </Box>

  )
}

export default ManageDocker


      // <Backdrop
      //   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      //   open={loading} >
      //   <CircularProgress color="inherit" />
      // </Backdrop>