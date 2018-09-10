class TransactionPool {
    constructor(){
        this.transactions = [];
    }

    updateOrAddTranction(transaction){
        let txwithId = this.transactions.find(tx => tx.id === transaction.id);

        if(txwithId){
            // if it already exisits : update the tx
            this.transactions[this.transactions.indexOf(txwithId)] = transaction;
        }else{
            // if it does not exisits : add the tx
            this.transactions.push(transaction);
        }
    }

    existingTrasaction(address){
        return this.transactions.find(t => t.input.address == address);
    }
}

module.exports = TransactionPool;