const ChainUtil = require('../util/chain-util.js')

class Transation {
    constructor(){
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = []; // 2 o/ps. 1. How much sender wants to send 2. How much he will have after tx is complete
    }

    static newTransaction(senderWallet, recipient, amount){
        const trasaction = new this();
        if(amount > senderWallet.balance){
            console.log(`Amount ${amount} exceeds balance`)
            return;
        }

        // '....' represents ES6 spread opeartor
        trasaction.outputs.push(...[
            {amount  : senderWallet.balance - amount ,  address : senderWallet.publicKey},
            {amount  : amount ,  address : recipient}
        ])

        Transation.signTransaction(trasaction, senderWallet);

        return trasaction;
    }

    static signTransaction(trasaction, senderWallet){
        trasaction.input = {
            timestamp : Date.now(),
            amount : senderWallet.balance,
            address : senderWallet.publicKey,
            signature : senderWallet.sign(ChainUtil.hash(trasaction.outputs))
        }
    }

    static verifyTranasction(transaction){
        return ChainUtil.verifySignature(
            transaction.input.address,
            transaction.input.signature, 
            ChainUtil.hash(transaction.outputs)
        );
    }
}

module.exports = Transation;