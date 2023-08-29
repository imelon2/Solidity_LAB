import {Transaction, errors, ethers} from 'ethers';
import "dotenv/config";
import { AbiCoder } from 'ethers/lib/utils';

const ExcuteABI =  require("../artifacts/contracts/Error/EIP838.sol/ExcuteContract.json");
const ErrorABI = require("../artifacts/contracts/Error/EIP838.sol/ErrorContract.json");

async function main() {
    const abiCoder = new AbiCoder()
    const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER!);
    const admin = new ethers.Wallet(process.env.ADMIN_KEY!,provider);
    const user = new ethers.Wallet(process.env.USER_KEY!,provider);
    console.log(`Balance : ${await user.getBalance()}`);
    
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
        const _tx = await ExcuteContract.connect(user).execute(case2,true,{gasLimit:21800});
        const tx = await _tx.wait();
        console.log(tx);
        
        console.log("SUCCESS");
    } catch (error: any) {
        // console.log(error);
        /** ---------- PARSING ERROR ---------- */
        console.log(error.error.data.data);
        console.log(error.error.data.message);
        
        // const tx = error.transaction;
        // // const code = error.error.data.data;
        // // console.log(tx);
        // const tx = await provider.getTransaction(error.transactionHash)
        // const code = await provider.call({
        //     data: tx.data,
        //     to: tx.to,
        //   });

        // console.log(code);
        // const decode = abiCoder.decode(["bytes"],"0x" + code.replace('0xea7e1b0b',""))
        // console.log(decode[0]) // ERROR MSG
        // const decode1 = abiCoder.decode(["string"],"0x" + decode[0].replace('0x08c379a0',""))
        // console.log(decode1[0]) // ERROR MSG
        // const IExcuteContract = new ethers.utils.Interface(ExcuteABI.abi);
        // // const IErrorContract = new ethers.utils.Interface(ErrorABI.abi);
        // const decode = IExcuteContract.decodeErrorResult("Error(string)",code)
        // const decode = IExcuteContract.decodeErrorResult('Error(string)',code)
        // console.log(decode) // ERROR MSG
        // const decodeCustom = IErrorContract.decodeErrorResult('RevertCase2',decode.args[0])
        // console.log(decodeCustom) // CUSTOM ERROR MSG
        /** ----------------------------------- */

        // console.log(IErrorContract.errors);
        
    }
    
}

main();