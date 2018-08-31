const WebSocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;

// peers (basically a comma separated string) will contain list of web sockets addresses to which this web socket will connects to as peer
const peers =  process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer{
    constructor(blockchain){
        this.blockchain = blockchain;
        this.sockets = [];
        
    }

    /**
     * 1. Creating a websocket server
     */
    listen() {
        const server = new WebSocket.Server({port : P2P_PORT});
        server.on('connection',(socket)=>this.connectSocket(socket));
        this.connectToPeers();
        console.log(`Listening to peer-to-peer connection on : ${P2P_PORT}`);
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        console.log('Socket Connected.')
        this.messageHandler(socket);
        this.sendChain(socket)
    }

    /**
     * 2. Connect to original instance 
     */
    connectToPeers(){
        peers.forEach(peer => {
            //peer : ws://localhost:5001
            const socket = new WebSocket(peer);
            socket.on('open', ()=>{
                this.connectSocket(socket);
            })
        })
    }

    /**
     * To get sockets to communicate 
     */
    messageHandler(socket) {
        socket.on('message', (message)=>{
            const data = JSON.parse(message);
            this.blockchain.replaceChain(data);
        })
    }


    sendChain(socket){
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    /**
     * syncing data across the chain
     * send the updated blockchain to all of peers
     */
    syncChains(){
        this.sockets.forEach((socket) =>{
            this.sendChain(socket);
        })
    }


}

module.exports = P2pServer;


