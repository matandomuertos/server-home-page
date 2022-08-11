import IconButton from '@mui/material/IconButton'
import RestartIcon from '@mui/icons-material/RestartAlt'
import Container from './../../features/container'

function RestartContainerButton({app, containerName, setLoading}) {

  function restartCont(){
    setLoading(true)
    Container.restartContainer(containerName).then(() => {
      setLoading(false)
      window.location.reload(false)
    })
  }

  function restartButton(){
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

	return (
		<>
      {restartButton()}
		</>
	)
}

export default RestartContainerButton