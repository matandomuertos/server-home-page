# Finally I didn't use python

import docker
import datetime
import sys

def main():
	args = {}
	setVar(args)
	checkArgv(args)
	docker_client = loadDockerConf()
	container = checkIfContainerExists(docker_client, args['containerName'])
	print (datetime.datetime.now())
	uptime = checkUptime(container)
	print(uptime)



# Var functions
def setVar(args):
	try:
		args['action'] = sys.argv[1]
		args['containerName'] = sys.argv[2]
	except IndexError:
		args['action'] = ''
		args['containerName'] = ''

def checkArgv(args):
	if args['action'] == '' or args['containerName'] == '':
		printHelp()
		exit(1)

def printHelp():
	print("""Usage: checkDocker.py action containerName

Required arguments:
 action           asdf
 containerName    asdf
""")

# Docker functions

def loadDockerConf():
	docker_client = docker.from_env()
	return docker_client

def checkIfContainerExists(docker_client, containerName):
	try:
		return docker_client.containers.get(containerName)
	except docker.errors.NotFound as exc:
		print('Image not found')
		exit(2)

def checkUptime(docker_client):
	uptime = docker_client.attrs['State']['StartedAt']
	uptimeFormated = datetime.datetime.strptime(uptime[:26], "%Y-%m-%dT%H:%M:%S.%f")
	return uptimeFormated

main()