import {ethers} from 'ethers';
import "dotenv/config";
import { SignatureLike } from '@ethersproject/bytes';

async function main() {
    const signer = new ethers.Wallet(process.env.ADMIN_KEY!);
    console.log(`signer address : ${signer.address}`);

    // ethers.utils.hashMessage(); \x19Ethereum Signed Message:\n 포함된 HASH(EIP-191)
    let MSG = "This is MSG for EIP-1271"
    let _hash = ethers.utils.toUtf8Bytes(MSG);
    let hash = ethers.utils.keccak256(_hash)
    console.log(`hash : ${hash}`);

    let _signature_ = await signer.signMessage(hash); // \x19Ethereum Signed Message:\n 포함된 서명(EIP-191)
    console.log(`signature : ${_signature_}`);

    let signature = signer._signingKey().signDigest(hash)
    console.log("sig.v:" + signature.v);
    console.log("sig.r: " + signature.r.toString());
    console.log("sig.s: " + signature.s.toString());

    let data:SignatureLike = {
        r:signature.r,
        s:signature.s,
        v:signature.v
    }

   let _signature = ethers.utils.joinSignature(data);
   console.log(`_signature : ${_signature}`);
   
}

main();


//0x54686973206973204d534720666f72204549502d313237310000000000000000
//0x54686973206973204d534720666f72204549502d313237310000000000000000