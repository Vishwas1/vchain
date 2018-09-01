1. We will create a Block
    - Timestamp : when the block is created
    - Previous HASH : Hash of previous block
    - HASH : Hash of this block
    - Data : Transactions inside this block

2. We need to think of creating Genesis block 
    - First block
    - Hardcoded block
    
3. Now we gonna add MineBlock(lastBlock, data) function

4. For SHA256 hash, we gonna use, crypto-js npm module.

5. Now create Blockchain class
    - array of blocks
    - first element will be the genesis block
    - add a block into the blockchain

6. Now multiple contibutor need to add a record into the blockchain - consensus
    - Multiple contributor
    - Miner will have thier own version
    - When one miner submits a block, that block needs to be accepted by all other miners
    - Every one gets the updated copy 
    - Inorder to updated the mined block, there had to be some sort of validation, so that other miners will validate and add that block into the ledger.

7. Chain Validations
    - Longer Chain Rule
        - 
    - Hash Validation
        - Blockchain receieves new chain, it will regenerate the hash once again on it own
        - This is to ensure that the data was not tampered
        - Then blockchain will decide whether to accept the new block or not.

8. Next : The app will allow a uesr to interact the blochain via http request : 
    - API using express
    - /blocks api
    - /mine api

9. On top of that, we have to built a Network so that multiple users/miners can update the chain.
    - P2P server
    - Websocket for P2P server
    - It allows to csetup a virtually real time connection
    - It will open up a port where it will listen to web socket connection
    - As other node fire up the application, they will setup their own web socket connection too
    - But they now conenct to original server throught that open webssocket port and likewise the original server can detect that new instances have attempted to open a web socket connection.
    - Overall these peers will have the ablitiy to broadcast data to all the connected peers. 
    
10. So P2P is basically 2 steps process
    - 1st, one server will fire up the websocket connection.and will wait for other connections
    - 2nd, other servers will fire up their own connection and will connect to the original server.

11. Work on Sockets receiving/sending messages amoung each other

12. Synchronizing blocks acoss peers.
    - Whenever a new peer gets added -> in syncChain() -> replace the chain with new chain(of course if it is longer and other validation is passed)
    - when ever /mine api gets called -> call for syncChain() method.

13. Till now fair enough. But we are allowing any one to add any block. Which means that any one can add any invalid data (as of now we are just giving some random text in data parameter but ideally that will be transactions)
    - Which mean we have to make use of DIFFICULTY and NOUNCE
    - Miners must spent bit of computation power to add a block
    - We can set DIFFICULTY as "generated hash should have 4 leading zeros"
    - We will set NOUNCE = 0 initially and keep procuding hash and will keep checking if it met DIFICULTY or not
    - If not we will keep on increasing NOUNCE by 1 and then regenerate hash
    - We also have to make sure that this DIFFICULTY should adjust time to time 
    - This is nothing but POW : proof of work
    
14. Now we want our blockchain to : *Dynamically change the DIFFICULTY*
    - based on how frequently we generate a block
    - Currently its static value set in config file as 4. it would take roughly same amount of time to mine each block
    - As more peers added to the network, blocks will be discovered at faster rate... which means that there will higher chance for 1 miner to add the block (which leads to centralization again).
    - So the difficulty should be dynamically adjusting as new miners are added to the blockchain
    - Which means the blocks are mined in certain rate (say every 5 sec or 1 min or even 10 min like Bitcoin does)
    
15. How we achieve the *Dynamic Difficulty*
    - We add `difficulty` attribute to each block
    - Also we will add time value , `mine rate` : which represents rate at which each block will get mined
    - Will check timestamp of newly mined block and compare the timestamp of previously mined block
    - If difference between both timestamp is lower than `mine rate` -> `difficulty` was easy -> raise it by 1
    - If difference between both timestamp is greated than `mine rate` -> `difficulty` was hard -> lower it by 1
    - In this weas we keed adjusting the `difficulty` as blocks are added.


## Tech Used
- Jest : for testing 

## Key words to learn
- ws protocol
- web socket with node js
- builging peer to peer chat app

## Commands
1. npm run dev
2. HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
3. HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev

## References 

https://docs.google.com/document/d/1h8Ow3OHdHyHjgK0MtMryCrgR5stb51bPmaIhIAi54Q0/
