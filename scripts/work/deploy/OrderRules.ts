import {ethers} from "ethers";
import { deployLogic, deployProxy } from "./initialize";
import logic from '../../../artifacts/contracts/work/OrderRules.sol/OrderRules.json';
import proxy from '../../../artifacts/@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol/ERC1967Proxy.json';


export async function deploy_OrderRules(signer) {
    console.log(`OrderRules Contract Deploy 진행 ....`);
    const logicCA = await deployLogic(signer,logic.abi,logic.bytecode);

    const LogicFactory = new ethers.ContractFactory(logic.abi,logic.bytecode,signer);
    let data = LogicFactory.interface.encodeFunctionData("initialize",[]);
    const proxyCA = await deployProxy(signer,proxy.abi,proxy.bytecode,logicCA,data)
    
    console.log(`OrderRules Proxy Contract : ${proxyCA}`);
    return proxyCA;
}

