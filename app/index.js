const express = require("express");
const bodyParser = require("body-parser");
const Blockchain = require("../blockchain");
const P2pServer = require("./p2p-server");


const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
// inorder to receive data in specific format(JSON), we use body parser 
// it either transform incoming data or outgoing response data.
app.use(bodyParser.json()); // allows us to receive json in post request

// creating instance of blockchain
const bc =  new Blockchain();
// creating instance of p2p server instance
const p2pServer =   new P2pServer(bc);

// get request for getting all the blocks
app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

// post request for mining a  block
app.post('/mine', (req,res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`A new block added : ${block.toString()}`);
    res.redirect('/blocks');
    p2pServer.syncChains();
})

app.listen(HTTP_PORT,()=>{
    console.log(`Listening on : ${HTTP_PORT}`);
});

p2pServer.listen();







