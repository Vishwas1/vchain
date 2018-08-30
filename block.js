const SHA256  = require('crypto-js/sha256');

class Block {
    constructor(timestamp, lasthash, hash, data){
        this.timestamp = timestamp;
        this.lasthash = lasthash;
        this.hash = hash;
        this.data = data;

    }

    toString() {
        // using ES6 template string.
        return `Block -
            TimeStamp : ${this.timestamp}
            Last Hash : ${this.lasthash}
            Hash : ${this.hash}
            Data : ${this.data}
        `;
    }

    static genesis (){
        //return new this('Genesis time','----','f1r57',[])
        const timestamp = Date.now();
        const lasthash = '';
        const data = [];
        return new this(timestamp,lasthash,Block.hash(timestamp,lasthash, data),data)
    }

    static mineBlock(lastBlock, data){
        const timestamp = Date.now();
        const lasthash = lastBlock.hash;
        const hash =  Block.hash(timestamp, lasthash, data);
        return new this(timestamp, lasthash, hash, data); 

    }

    static hash(timestamp, lastHash, data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
}

module.exports = Block; 