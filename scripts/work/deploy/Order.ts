import {ethers} from "ethers";
import  {abi,bytecode} from "../../../artifacts/contracts/work/Order.sol/Order.json";
import dotenv from "dotenv";
dotenv.config();

export async function deploy_Order(orderid,OrderRulesCA,TxForwarderCA,signer) {
    console.log(`Order Contract Deploy 진행 ....`);
    const _order = new ethers.ContractFactory(abi,bytecode,signer);
    const order = await _order.connect(signer).deploy(orderid,OrderRulesCA, TxForwarderCA);
    await order.deployed();
    console.log("Order contract: " + order.address);
    return order.address;
}

