import Alert from '@mui/material/Alert'

function DockerStatus({app}) {

  return (
    <>
      {
        app.State === 'running' ? (
          <Alert elevation={10} severity="success">
            {app.Status.substring(0, 13)}
          </Alert>
        ) : (
        app.State === 'paused' ? (
          <Alert elevation={10} severity="warning">
            {app.Status.substring(0, 13)}
          </Alert>
        ) : (
          <Alert elevation={10} severity="error">
            Container error
          </Alert>
        ))
      }
    </>
  )
}

export default DockerStatus