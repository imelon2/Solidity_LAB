import {ethers} from "ethers";

export async function deployLogic(signer,abi,bytecode) {
    const LogicFactory = new ethers.ContractFactory(abi,bytecode,signer);
    const LogicContract = await LogicFactory.deploy();
    await LogicContract.deployed();

    return LogicContract.address;
}

export async function deployProxy(signer,abi,bytecode,logicCA,data) {
    const ProxyFactory = new ethers.ContractFactory(abi,bytecode,signer);
    const ProxyContract = await ProxyFactory.deploy(logicCA,data);
    await ProxyContract.deployed();

    return ProxyContract.address;
}

