import axios from './axios'
const APP_URL = '/api/v1/'

function errorPrinter(err){
		if(err.response){
      console.log(err.response.data)
      console.log(err.response.status)
		}
		else{
			console.log(`Error: ${err.message}`)
		}
}

async function getContainer(name){
	try{
		const response = await axios.get(APP_URL, { params: { containerName: name }})
		return response
	} 
	catch(err){
		errorPrinter(err)
	}
}

async function pauseContainer(name){
	try{
		const response = await axios.post('/api/v1/pause', { containerName: name })
		return response
	} 
	catch(err){
		errorPrinter(err)
	}
}

async function startContainer(name){
	try{
		console.log(name)
		const response = await axios.post('/api/v1/start', { containerName: name })
		return response
	} 
	catch(err){
		errorPrinter(err)
	}
}

async function restartContainer(name){
	try{
		const response = await axios.post('/api/v1/restart', { containerName: name })
		return response
	} 
	catch(err){
		errorPrinter(err)
	}
}

async function stopContainer(name){
	try{
		const response = await axios.post('/api/v1/stop', { containerName: name })
		return response
	} 
	catch(err){
		errorPrinter(err)
	}
}

const containerGatherer = {
  getContainer, pauseContainer, startContainer, restartContainer, stopContainer
}

export default containerGatherer