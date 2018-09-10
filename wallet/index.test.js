const TransactionPool = require('./transaction-pool')
const Transaction = require('./transaction')
const Wallet = require('.')

describe('TransactionPool', ()=>{
  let senderWallet, transactionPool 
  
  beforeEach(()=>{
    senderWallet = new Wallet();  
    transactionPool = new TransactionPool();
  })


  describe('Creating a trasaction', ()=> {
    let tx, amount, receipent

    beforeEach(()=>{
        amount = 50;
        receipent = 'Some random recepient address'
        tx = senderWallet.createTransaction(receipent, amount, transactionPool)
        tx = senderWallet.createTransaction(receipent, amount, transactionPool)
    })

    it('should double the amount', () => {
        expect(tx.outputs.find(op => op.address == senderWallet.publicKey).amount)
        .toEqual(senderWallet.balance - (amount * 2));
    })

    //it('')
    
  })
  
  
//   it('It updates a tranctions into the pool', ()=>{
    
//     expect(transactionPool.transactions.find(tx = tx.id))
//     .toEqual(transaction)
//   })
  
})