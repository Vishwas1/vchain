const ChainUtil = require('../util/chain-util.js')

class Transation {
    constructor(){
        this.id = ChainUtil.id();
        this.input = null;
        this.output = []; // 
    }

    static newTransaction(senderWallet, recipient, amount){
        const trasaction = new this();
        if(amount > senderWallet.balance){
            console.log(`Amount ${amount} exceeds balance`)
            return;
        }

        trasaction.output.push(...[
            {amount  : senderWallet.balance - amount ,  address : senderWallet.publicKey},
            {amount  : amount ,  address : recipient}
        ])
    }
}

module.exports = Transation;