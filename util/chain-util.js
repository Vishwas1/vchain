//ECDSA
const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); // what curve based cryptography EC insance should use? - secp256k1 bitcoin uses
const uuidV1 = require('uuid/v1');

class ChainUtil{
    
    static genKeyPair(){
        return ec.genKeyPair();
    }

    static id(){
        return uuidV1();
    }

    

}

module.exports = ChainUtil;