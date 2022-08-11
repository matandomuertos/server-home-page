import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import AppsIconOk from '@mui/icons-material/Apps'
import AppsIconError from '@mui/icons-material/AppsOutage'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Link from '@mui/material/Link'
import container from './../features/container'
import DockerStatus from './DockerStatus'
import ManageDocker from './ManageDocker'

function Apps({containerName, image, title, url}) {

  const [app, setApp] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    retrieveContainers()
  }, [])

  function retrieveContainers(){
    setLoading(true)
    container.getContainer(containerName).then(response => { 
      setLoading(false)
      renderCont(response.data.container)
    })
  }

  function renderCont(contData){
    contData.map((data) => ( setApp(data) ))
  }

  function isLoading(){
    if(loading){
      return (
        <Box sx={{ display: 'flex', pt: 5, justifyContent: 'center' }}>
          <CircularProgress color="inherit" />
        </Box>
      )
    }
    else{
      return(
        <>
          <DockerStatus app={app}/>
          <ManageDocker app={app} containerName={containerName}/>
        </>
      )
    }
  }

  return (
      <Grid item>
        <Card sx={{ width: 200, height: 300 }}>
          <CardActionArea>
            <Link href={url} target="_blank" underline="none" color="inherit">
              <Grid container spacing={1} justifyContent="center" display="flex">
                <Grid item>
                  { app.State === 'running' ? <AppsIconOk sx={{ fontSize: 50 }}/> : app.State === 'paused' ? <AppsIconError color="warning" sx={{ fontSize: 50 }}/> : <AppsIconError color="error" sx={{ fontSize: 50 }}/> }
                </Grid>
                <Grid item>
                  <Typography variant="h4" align="center">
                    {title.substring(0, 9)}
                  </Typography>
                </Grid>
              </Grid>
              <CardMedia
                component="img"
                height="100"
                image={image}
                alt={title}
              />
            </Link>
          </CardActionArea>
          <CardContent>
              {isLoading()}
          </CardContent>
        </Card>
      </Grid>
  )
}

export default Apps