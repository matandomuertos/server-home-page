import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import data from './routes/data.route.js'
dotenv.config()

const port = process.env.PORT || 8000

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1', data)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

app.listen(port, () => console.log(`Server Running on http://localhost:${port}`))