import {Wallet, ethers} from 'ethers';
import _myToken from "../../artifacts/contracts/MetaTransaction/MyToken.sol/MyToken.json"
import _forwarder from "../../artifacts/contracts/MetaTransaction/forwarder.sol/Forwarder.json"

async function main() {
    // Local Provider : npx hardhat node
    const provider = new ethers.providers.JsonRpcProvider("http:/\/127.0.0.1:8545");
    // 메타 트랜잭션 작성자
    const user = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",provider)
    // 가스비 대납자
    const delegater = new ethers.Wallet("0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",provider)
    console.log(`🙋🏻 user address : ${user.address}`);
    console.log(`🙋🏾 delegater address : ${delegater.address}`);

    const erc20Factory = new ethers.ContractFactory(_myToken.abi,_myToken.bytecode,user);
    const forwarderFactory = new ethers.ContractFactory(_forwarder.abi,_forwarder.bytecode,user);

    // Deploy Contract
    const erc20 = await erc20Factory.deploy();
    const forwarder = await forwarderFactory.deploy();
    console.log(`🔖 erc20 address : ${erc20.address}`);
    console.log(`🔖 forwarder address : ${forwarder.address}`);
    
    

}

(async () => {
    await main();
})();