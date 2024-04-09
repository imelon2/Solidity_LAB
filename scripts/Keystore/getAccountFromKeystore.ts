import { scrypt } from '@noble/hashes/scrypt';
import { arrayify, hexlify, keccak256, concat, computeAddress } from 'ethers/lib/utils';
import { _decrypt } from '../../libs/hash';

/**
 * 
 * @cli ts-node scripts/Keystore/getAccountFromKeystore.ts 
 */
async function main() {
    const keystore = ``
    const _password = ""

    const json = JSON.parse(keystore)
        
    const params = json.crypto.kdfparams
    params.dklen = 62

    const { n, r, p, salt, dklen } = params
    const opt = { N:n, r, p, dklen }

    
    const key = scrypt(
        Buffer.from(_password),
        Buffer.from(salt, 'hex'),
        opt
        )
    
    const ciphertext = arrayify("0x" + json.crypto.ciphertext)
    const computedMAC = hexlify(keccak256(concat([key.slice(16, 32), ciphertext]))).substring(2);

    
    if (computedMAC !== json.crypto.mac.toLowerCase()) {
        throw new Error("invalid keystore password")
    }
    
    const privateKey = _decrypt(json, key.slice(0, 16), ciphertext)

    if (privateKey == null) {
        throw new Error("Private key null due to invalid keystore")
    }

    const address = computeAddress(privateKey)
    console.log("address: " +address );
    console.log("privateKey: " +privateKey );
    
    return { address, privateKey }
}

main()