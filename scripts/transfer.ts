import { BigNumber, ethers } from "ethers";
import { etherToWei } from "../libs/utils.lib";
import { hexlify } from "ethers/lib/utils";

/**
 * @command ts-node scripts/transfer.ts 
 */
async function main() {
    const PROVIDER_URL = "http://141.164.51.128:9545"
    const PK1 = ""
    const user = "0x50C16D5bBf8123d5c7Bf1Bf655726ED4AEf5f84A"
    const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
    const signer1 = new ethers.Wallet(PK1,provider);

    let balance1 = await signer1.getBalance()
    let balance2 = await provider.getBalance(user)

    console.log(BigNumber.from(balance1).toString());
    console.log(BigNumber.from(balance2).toString());
    
    
    const _tx : ethers.providers.TransactionRequest = {
        to:user,
        value:BigNumber.from(10000).mul(BigNumber.from(10).pow(18)),
        gasLimit:22000
    }
    const tx = await signer1.populateTransaction(_tx)

    console.log(tx);
    
    const res = await signer1.sendTransaction(tx)
    console.log("Send Tx .... 🚀");
    
    const receipt = await provider.waitForTransaction(res.hash)

    console.log(receipt);
    
    balance1 = await signer1.getBalance()
    balance2 = await provider.getBalance(user)
    console.log(BigNumber.from(balance1).toString());
    console.log(BigNumber.from(balance2).toString());

}

main();