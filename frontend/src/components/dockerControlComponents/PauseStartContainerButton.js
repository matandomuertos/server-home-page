import IconButton from '@mui/material/IconButton'
import PauseIcon from '@mui/icons-material/Pause'
import PlayIcon from '@mui/icons-material/PlayArrow'
import Container from './../../features/container'

function PauseStartContainerButton({app, containerName, setLoading}) {

  function startCont(){
    setLoading(true)
    Container.startContainer(containerName).then(() => {
      setLoading(false)
      window.location.reload(false)
    })
  }

  function pauseCont(){
    setLoading(true)
    Container.pauseContainer(containerName).then(() => {
      setLoading(false)
      window.location.reload(false)
    })
  }

  function pauseStartButton(){
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

	return (
		<>
      {pauseStartButton()}
		</>
	)
}

export default PauseStartContainerButton