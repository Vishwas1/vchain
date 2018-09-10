const { INITIAL_BALANCE } = require('../config.js')
const ChainUtil = require('../util/chain-util.js')
const Transaction =  require('./transaction')

class Wallet {
    constructor(){
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString(){
        return `Wallet - 
            publicKey : ${this.publicKey.toString()}
            balance   : ${this.balance}`
    }

    sign(dataHash){
        return this.keyPair.sign(dataHash);
    }

    createTransaction(recepient, amount, transactionPool){
        if(amount > this.balance){
            console.log(`Insufficient balance. ${amount} is less than ${this.balance}`)
            return
        }

        let tranasactionInPool =  transactionPool.existingTrasaction(this.publicKey);
        if(tranasactionInPool){
            //update the transction - exisint tx
        }else{
            //add tx into the pool - new tx
            tranasactionInPool =  Transaction.newTransaction(this,recepient,amount)
            transactionPool.updateOrAddTranction(tranasactionInPool);

        }
        return tranasactionInPool;
    }
}

module.exports = Wallet;