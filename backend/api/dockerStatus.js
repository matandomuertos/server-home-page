import dockerode from 'dockerode'

const docker = new dockerode()

async function dockerPS(req, res){
    const container = await docker.listContainers({ filters: { name: [`^/${req.query.containerName}$`]}})
    if (container.length != 0){
        res.status(200).json({ container })
    }
    else{
        res.status(500).json({ error: `Container "${req.query.containerName}" not found`})
    }
}

async function dockerPause(req, res){
    const container = await docker.listContainers({ filters: { name: [`^/${req.body.containerName}$`]}})
    if (container.length != 0){
        if (container[0].State === 'running'){
            await docker.getContainer(container[0].Id).pause()
            if (checkIfPaused(container[0].Id)){
                res.status(200).json({ message: "paused"})
            }
            else{
                res.status(500).json({ error: "container not paused"})
            }
        }
        else{
            res.status(500).json({ error: "Container not running"})
        }
    }
    else{
        res.status(500).json({ error: `Container "${req.body.containerName}" not found`})
    }
}

async function dockerUnpause(req, res){
    const container = await docker.listContainers({ filters: { name: [`^/${req.body.containerName}$`]}})
    if (container.length != 0){
        if (container[0].State != 'running'){
            await docker.getContainer(container[0].Id).unpause()
            if (checkIfRunning(container[0].Id)){
                res.status(200).json({ message: "unpause"})
            }
            else{
                res.status(500).json({ error: "container not started"})
            }
        }
        else{
            res.status(500).json({ error: "Container not running"})
        }
    }
    else{
        res.status(500).json({ error: `Container "${req.body.containerName}" not found`})
    }
}

async function dockerRestart(req, res){
    const container = await docker.listContainers({ filters: { name: [`^/${req.body.containerName}$`]}})
    if (container.length != 0){
        if (container[0].State === 'running' || container[0].State === 'paused'){
            await docker.getContainer(container[0].Id).restart()
            if (checkIfRunning(container[0].Id)){
                res.status(200).json({ message: "restarted"})
            }
            else{
                res.status(500).json({ error: "container not started"})
            }
        }
        else{
            res.status(500).json({ error: "Container not running"})
        }
    }
    else{
        res.status(500).json({ error: `Container "${req.body.containerName}" not found`})
    }
}

async function dockerStop(req, res){
    const container = await docker.listContainers({ filters: { name: [`^/${req.body.containerName}$`]}})
    if (container.length != 0){
        if (container[0].State === 'running'){
            await docker.getContainer(container[0].Id).stop()
            if (checkIfStopped(container[0].Id)){
                res.status(200).json({ message: "stopped"})
            }
            else{
                res.status(500).json({ error: "container not paused"})
            }
        }
        else{
            res.status(500).json({ error: "Container not running"})
        }
    }
    else{
        res.status(500).json({ error: `Container "${req.body.containerName}" not found`})
    }
}

async function checkIfPaused(id){
    const container = await docker.listContainers({ filters: { name: [id] }})
    if (container.State === 'paused'){
        return true
    }
    else{
        return false
    }
}

async function checkIfRunning(id){
    const container = await docker.listContainers({ filters: { name: [id] }})
    if (container.State === 'running'){
        return true
    }
    else{
        return false
    }
}

async function checkIfStopped(id){
    const container = await docker.listContainers({ filters: { name: [id] }})
    if (container.State === 'stopped'){
        return true
    }
    else{
        return false
    }
}

export { dockerPS, dockerPause, dockerUnpause, dockerRestart, dockerStop }

//I didn't use it:
    // await exec(req.query.command, (error, results) => {
    //     if (error) {
    //         res.status(400).send(error)
    //     }
    //     else {
    //         console.log(results)
    //         res.status(200).json({ results })
    //     }
    // })


    // var output
    // if(!req.query.dockerImage){
    //     console.error('Query command not found')
    //     res.status(400).send('Query command not found')
    // }
    // else{
    //     const command = spawn("docker", ["ps", "--format", "{{.Status}}", "-f", `name=${req.query.dockerImage}`])

    //     command.on('close', (code) => {
    //         console.log("Exit code:", code)
    //     })

    //     command.stdout.on('data', (data) => {
    //         output = data.toString()
    //         res.status(200).send(output)
    //     })
    // }