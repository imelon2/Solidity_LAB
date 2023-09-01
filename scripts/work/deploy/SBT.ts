import {ethers} from "ethers";
import  {abi,bytecode} from "../../../artifacts/contracts/work/SBT/SBT.sol/SBT.json";
import dotenv from "dotenv";
dotenv.config();

export async function deploy_SBT(SBTMinterCA,signer) {
    console.log(`SBT Contract Deploy 진행 ....`);
    const _sbt = new ethers.ContractFactory(abi,bytecode,signer);
    const sbt = await _sbt.connect(signer).deploy(SBTMinterCA);
    console.log("SBT contract: " + sbt.address);

    return sbt.address;

}


