const Block = require("./block.js")

describe('Block', ()=>{
    let data, lastBlock, block;
    beforeEach(() => {
        // will gets executed before of all its.
        const data = "New data";
        const lastBlock = Block.genesis();
        const block = Block.mineBlock(lastBlock, data);
    })

    it('set `lasthash` to the hash of last block', ()=>{
        
    })

    it('set `lasthash` to the hash of last block', ()=>{

    })
})