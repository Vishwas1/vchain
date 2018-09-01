const SHA256  = require('crypto-js/sha256');
const DIFFICULTY = require('../config')

class Block {
    constructor(timestamp, lasthash, hash, data, nounce){
        this.timestamp = timestamp;
        this.lasthash = lasthash;
        this.hash = hash;
        this.data = data;
        this.nounce = nounce; 
    }

    toString() {    
        // using ES6 template string.
        return `Block -
            TimeStamp : ${this.timestamp}
            Last Hash : ${this.lasthash}
            Hash      : ${this.hash}
            Data      : ${this.data}
            Nounce    : ${this.nounce}
        `;
    }

    static genesis (){
        //return new this('Genesis time','----','f1r57',[])
        const timestamp = 'Some timestamp';
        const lasthash = '';
        const data = [];
        return new this(timestamp,lasthash,Block.hash(timestamp,lasthash, data, 0),data,0)
    }

    static mineBlock(lastBlock, data){
        let difficulty = DIFFICULTY.DIFFICULTY;
        let timestamp =  Date.now();
        const lasthash = lastBlock.hash;
        let nounce = 0;
        let hash = ''; //Block.hash(timestamp, lasthash, data, nounce);
        do{
            timestamp = Date.now();
            nounce++;
            hash =  Block.hash(timestamp, lasthash, data, nounce);
            
        }
        while(hash.substring(0, difficulty) !== '0'.repeat(difficulty))
        return new this(timestamp, lasthash, hash, data, nounce); 

    }

    static hash(timestamp, lastHash, data, nounce){
        return SHA256(`${timestamp}${lastHash}${data}${nounce}`).toString();
    }

    static blockHash(block){
        const { timestamp ,  lasthash, data, nounce} = block;
        return Block.hash(timestamp, lasthash, data, nounce);
    }
}

module.exports = Block; 