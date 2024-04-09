import { ethers } from "ethers";
import {abi,bytecode} from "../artifacts/contracts/ERC20/ERC20.sol/MyToken.json";

const GOERLI_RPC = "https://rpc.ankr.com/eth_goerli";
const MUMBAI_RPC = "https://rpc.ankr.com/polygon_mumbai";
const PK = ""

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(MUMBAI_RPC);
    const user = new ethers.Wallet(PK,provider);

    const ERC20 = new ethers.ContractFactory(abi,bytecode,user);
    // const balance = await ERC20.balanceOf(user.address);
    // console.log(balance);
    // console.log("RUN ERC20 APPROVE");
    let startTime = performance.now()
    let _ERC20 = await ERC20.deploy();
    console.log(_ERC20.address);
    
    // const balance = await ERC20.approve(user1,"1000000000000000000",{gasLimit:21800,gasPrice:100000000}); // 1gwei
    // const balance = await user.sendTransaction({
    //     from:user.address,
    //     to:user.address,
    //     value:"10000000000000000000",
    //     gasLimit:21800,
    // })
    // console.log(balance);
    
    // const result = await balance.wait()
    // console.log(result);

    let endTime = performance.now()
    console.log(endTime - startTime);
}

(() => {
    main()
})()