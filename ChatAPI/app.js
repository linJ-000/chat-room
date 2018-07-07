const http = require('http')
const WebSocketServer = require('websocket').server

const httpServer = http.createServer((req, res) => {
	console.log('[' + new Date + '] Received request for ' + request.url)
    response.writeHead(404)
    response.end()
})

const wsServer = new WebSocketServer({
	httpServer,
	autoAcceptConnections: true
})

wsServer.on('connect', connection => {
	connection.on('message', message => {
        if (message.type === 'utf8') {
        	var data = JSON.parse(message.utf8Data)
        	if(data.state == 0){
        		console.log(data.msg + '[' + new Date() + ']')
        	}else{
        		console.log(data)
        		connection.sendUTF(message.utf8Data)
        	}  
        }
    }).on('close', (reasonCode, description) => {
        console.log('[' + new Date() + '] Peer ' + connection.remoteAddress + ' disconnected.')
    })
})

httpServer.listen(8080, () => {
    console.log('[' + new Date() + '] Serveris listening on port 8080')
})