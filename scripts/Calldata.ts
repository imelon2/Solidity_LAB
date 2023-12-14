import {ethers} from 'ethers';
import "dotenv/config";
import {abi,bytecode} from "../artifacts/contracts/Hack/Thirdweb/Context.sol/Context.json";

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER!);
    const admin = new ethers.Wallet(process.env.ADMIN_KEY!,provider);
    const Factory = new ethers.ContractFactory(abi,bytecode,admin);
    
    const data = ethers.utils.concat([Factory.interface.encodeFunctionData("msgSender"),"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"])
    // const data = Factory.interface.encodeFunctionData("msgSender",[])
    console.log(data);
    
}

main()