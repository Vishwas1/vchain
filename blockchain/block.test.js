const Block = require("./block.js")

describe('Block', ()=>{
    let data, lastBlock, block;
    beforeEach(() => {
        // will gets executed before of all its.
        data = "New data";
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    })

    it('set `data` to match the input', ()=>{
        expect(block.data).toEqual(data);
        
    })

    it('set `lasthash` to match the hash of last block', ()=>{
        expect(block.lasthash).toEqual(lastBlock.hash);
    })
})