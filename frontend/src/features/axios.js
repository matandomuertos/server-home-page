import axios from 'axios'
const API_URI_DOMAIN = process.env.REACT_APP_URI_DOMAIN || 'http://localhost:8000'

export default axios.create({
	baseURL: API_URI_DOMAIN
})