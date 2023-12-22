import {ethers} from 'ethers';
import { metaTx, signMetaTx } from '../../libs/signMetaTransaction.lib';
import _forwarder from "../../artifacts/contracts/MetaTransaction/forwarder.sol/Forwarder.json";
import _erc20 from "../../artifacts/contracts/MetaTransaction/MyToken.sol/MyToken.json";
import { etherToWei } from '../../libs/utils.lib';

async function sign() {
    const USER_PK = "" // remix address 1
    const DELEGATOR__PK = "" // remix address 2
    const ForwarderCA = ""
    const destination = ""

    const provider = new ethers.providers.JsonRpcProvider("http:/\/127.0.0.1:8545");
    const Forwarder = new ethers.Contract(ForwarderCA,_forwarder.abi,provider)
    const Erc20 = new ethers.Contract(destination,_erc20.abi,provider)
    
    const user = new ethers.Wallet(USER_PK,provider);
    const delegator = new ethers.Wallet(DELEGATOR__PK,provider);

    const nonce = await Forwarder.getNonce(user.address);
    const calldata = Erc20.interface.encodeFunctionData("transfer",[delegator.address,etherToWei("1")])
    console.log("Call Data : "+calldata);
    
    const metaData:metaTx = {
        from:user.address,
        to:destination,
        value:0,
        gas:150_000,
        nonce:0,
        data:calldata
    }

    const sign = await signMetaTx(ForwarderCA,metaData,user)

    console.log(sign);
    
}


(() => {
    sign()
})()