import express from 'express'
import { dockerPS, dockerPause, dockerUnpause, dockerRestart, dockerStop } from '../api/dockerStatus.js'

const router = express.Router()

router.get('/', dockerPS).post('/pause', dockerPause).post('/start', dockerUnpause).post('/restart', dockerRestart).post('/stop', dockerStop)

export default router