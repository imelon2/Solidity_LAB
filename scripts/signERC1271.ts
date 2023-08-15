import {ethers} from 'ethers';
import { SignatureLike } from '@ethersproject/bytes';
import "dotenv/config";

async function main() {
    const signer = new ethers.Wallet(process.env.ADMIN_KEY!);
    console.log(`signer address : ${signer.address}`);

    let MSG = "This is MSG for EIP-1271"
    let _hash = ethers.utils.toUtf8Bytes(MSG);
    let hash = ethers.utils.keccak256(_hash)
    console.log(`hash : ${hash}`);

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