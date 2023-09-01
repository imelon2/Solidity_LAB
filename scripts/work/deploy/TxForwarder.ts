import {ethers} from "ethers";
import  {abi,bytecode} from "../../../artifacts/contracts/work/TxForwarder.sol/TxForwarder.json";
import dotenv from "dotenv";
dotenv.config();

export async function deploy_TxForwarder(signer) {
    console.log(`TxForwarder Contract Deploy 진행 ....`);
    const _txForwarder = new ethers.ContractFactory(abi,bytecode,signer);
    const txForwarder = await _txForwarder.connect(signer).deploy();
    await txForwarder.deployed()
    console.log(`txForwarder Address : ${txForwarder.address}`);

    return txForwarder.address;

}
