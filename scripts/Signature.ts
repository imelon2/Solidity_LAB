import {ethers} from 'ethers';
import { SignatureLike } from '@ethersproject/bytes';
import "dotenv/config";

// reference : https://minebuu.github.io/smart/contract/2022/11/14/Signature.html

let MSG = "---- MSG ----"
const signer = new ethers.Wallet(process.env.ADMIN_KEY!);
console.log(`🙋🏻signer address : ${signer.address}`);

async function eth_sign() {
    // @dev 문자열 데이터를 Bytes32로 변환하기 위함
    let hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(MSG))

    // @ Bytes32 변환 불필요시 Bytes로 서명
    // let hash = ethers.utils.toUtf8Bytes(MSG);
    console.log(`✎ hash : ${hash}`);

    let signature = signer._signingKey().signDigest(hash)
    console.log("✎ sig.v:" + signature.v);
    console.log("✎ sig.r: " + signature.r);
    console.log("✎ sig.s: " + signature.s);

    let data:SignatureLike = {
        r:signature.r,
        s:signature.s,
        v:signature.v
    }

   let _signature = ethers.utils.joinSignature(data);
   console.log(`📝 Signature : ${_signature}`);
}

async function personal_sign() {
    // \x19Ethereum Signed Message:\n 포함된 HASH(EIP-191)
    let hash = ethers.utils.hashMessage(MSG); 
    let signature:any = await signer.signMessage(hash);
    console.log(`📝 Signature : ${signature}`);

    signature = ethers.utils.splitSignature(signature)
    console.log("✎ sig.v:" + signature.v);
    console.log("✎ sig.r: " + signature.r);
    console.log("✎ sig.s: " + signature.s);
    
}

(async () => {
    await personal_sign();
})();