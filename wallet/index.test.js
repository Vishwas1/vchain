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
    })
    
    it('Adds a tranctions into the pool', ()=>{
        
        expect(transactionPool.transactions.find(tx => tx.id == transaction.id))
        .toEqual(transaction)
      })
  })
  
  
//   it('It updates a tranctions into the pool', ()=>{
    
//     expect(transactionPool.transactions.find(tx = tx.id))
//     .toEqual(transaction)
//   })
  
})