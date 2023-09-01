import {ethers} from 'ethers';
import "dotenv/config";
import { decodeRevert, decodeCustomRevert, IS_REVERT, IS_CUSTOM_REVERT } from '../libs/parseRevert.lib';

const ExcuteABI =  require("../artifacts/contracts/Error/EIP838.sol/ExcuteContract.json");
const ErrorABI = require("../artifacts/contracts/Error/EIP838.sol/ErrorContract.json");

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER!);
    const admin = new ethers.Wallet(process.env.ADMIN_KEY!,provider);
    const user = new ethers.Wallet(process.env.USER_KEY!,provider);
    const ExcuteFactory = new ethers.ContractFactory(ExcuteABI.abi,ExcuteABI.bytecode,admin);
    const ErrorFactory = new ethers.ContractFactory(ErrorABI.abi,ErrorABI.bytecode,admin);
    const ErrorContract = await ErrorFactory.deploy();
    const ExcuteContract = await ExcuteFactory.deploy(ErrorContract.address);

    const case1 = ErrorFactory.interface.encodeFunctionData('ping',[0]) // require("Require Case 0")
    const case2 = ErrorFactory.interface.encodeFunctionData('ping',[1]) // revert("Require Case 1")
    const case3 = ErrorFactory.interface.encodeFunctionData('ping',[2]) // revert RevertCase2(2,"Custom Error Case 3")
    const case4 = ErrorFactory.interface.encodeFunctionData('ping',[3]) // SUCCESS CASE
    
    // Revert tx와 Success tx 구분 물어보기
    try {
        const _tx = await ExcuteContract.connect(admin).execute(case1,true,{gasLimit:21800000});
        await _tx.wait();
        console.log("SUCCESS");
    } catch (error: any) {
        /** ---------- SYSTEM ERROR MESSAGE----------  */
        const {data} : {data:string} = error.error.data;
        if(!data || data === '0x') {
            console.log(error);
            return error;

        /** ---------- EIP838 ERROR MESSAGE----------  */
        } else {
            // CONTRACT ERROR
            if(IS_REVERT(data)) {
                const errorMsg = decodeRevert(data);
                console.log(errorMsg[0]);
                return errorMsg;

            // INTERNAL TRANSACTION ERROR
            } else if (IS_CUSTOM_REVERT(data,"0xea7e1b0b")) {
                const _errorMsg = decodeCustomRevert(data,ExcuteABI.abi)
                if(!IS_REVERT(_errorMsg[0])) {
                    const errorMsg = decodeCustomRevert(_errorMsg[0],ErrorABI.abi);
                    console.log(errorMsg);
                    return;
                }
                const errorMsg = decodeRevert(_errorMsg[0]);
                console.log(errorMsg);
            } else {
                console.log(error);
                return error;
            }
        }
    }
}

main();