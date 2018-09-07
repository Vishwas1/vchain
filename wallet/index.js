const { INITIAL_BALANCE } = require('../config.js')
const ChainUtil = require('../util/chain-util.js')

class Wallet {
    constructor(){
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publiKey = this.keyPair.getPublic().encode('hex');
    }

    toString(){
        return `Wallet - 
            publicKey : ${this.publiKey.toString()}
            balance   : ${this.balance}`
    }
}

module.exports = Wallet;