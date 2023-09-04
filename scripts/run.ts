import { ethers } from "ethers";
import {abi} from "../artifacts/contracts/ERC20/ERC20.sol/MyToken.json";

const GOERLI_RPC = "https://rpc.ankr.com/eth_goerli";
const ADDRESS = "0xBEF286d726a9B9f12091A8B3D6a4d6Ed33825144"
const PK = ""
const user1 = "0x9E7c0F4B7C2299298159B4Fd3dF186A709938b1E"

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC);
    const user = new ethers.Wallet(PK,provider);

    const ERC20 = new ethers.Contract(ADDRESS,abi,user);
    // const balance = await ERC20.balanceOf(user.address);
    // console.log(balance);
    console.log("RUN ERC20 APPROVE");
    let startTime = performance.now()
    // const balance = await ERC20.approve(user1,"1000000000000000000",{gasLimit:21800,gasPrice:100000000}); // 1gwei
    const balance = await user.sendTransaction({
        from:user.address,
        to:user.address,
        value:"10000000000000000000",
        gasLimit:21800,
    })
    console.log(balance);
    
    const result = await balance.wait()
    console.log(result);

    let endTime = performance.now()
    console.log(endTime - startTime);
}

(() => {
    main()
})()