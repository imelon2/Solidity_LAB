import fs from "fs";
import {ethers} from 'ethers';
import "dotenv/config";
import {deploy_TxForwarder} from "./deploy/TxForwarder";
import { deploy_OrderRules } from "./deploy/OrderRules";
import { deploy_Order } from "./deploy/Order";
import { deploy_SBTMinter } from "./deploy/SBTMinter";
import { deploy_SBT } from "./deploy/SBT";
import { deploy_Treasury } from "./deploy/Treasury";
import { encodeSBTTokenURL, initUpgradeCarrierRules, initUpgradeShipperRules } from "./setSBTURI/setSbtUri";

import {abi,bytecode} from '../../artifacts/contracts/work/DKA.sol/DKA.json'
import _OrderRules from '../../artifacts/contracts/work/OrderRules.sol/OrderRules.json'


async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER!);
    const shipper = new ethers.Wallet(process.env.SHIPPER_KEY!,provider);
    const carrier = new ethers.Wallet(process.env.CARRIER_KEY!,provider);
    const admin = new ethers.Wallet(process.env.ADMIN_KEY!,provider);
    
    console.log(`----------------------------------------------------`);
    console.log('시작하기 전 잔금 확인 ....');
    console.log(`....Admin: [${await provider.getBalance(admin.address)}]`);
    console.log(`....Shipper: [${await provider.getBalance(shipper.address)}]`);
    console.log(`....Carrier: [${await provider.getBalance(carrier.address)}]`);
    console.log(`----------------------------------------------------\n`);

    const TxForwarderCA = await deploy_TxForwarder(admin);
    const OrderRulesCA = await deploy_OrderRules(admin)
    const OrderCA = await deploy_Order(1,OrderRulesCA,TxForwarderCA,admin);
    const SBTMinterCA = await deploy_SBTMinter(OrderRulesCA,admin);
    /** --------------------- set SBT Token URI ---------------------*/    
    let TOKENURI = encodeSBTTokenURL("DEV","Carrier");
    await initUpgradeCarrierRules(SBTMinterCA,admin,TOKENURI);
    TOKENURI = encodeSBTTokenURL("DEV","Shipper");
    await initUpgradeShipperRules(SBTMinterCA,admin,TOKENURI);
    /** -------------------------------------------------------------*/    
    const SBTShipperCA = await deploy_SBT(SBTMinterCA,admin)
    const SBTCarrierCA = await deploy_SBT(SBTMinterCA,admin)
    // const DefaultSBTCA = await deploy_DefaultSBT(admin);

    /** --------------------- fxDKA 배포 파트 ---------------------*/    
    const DKA = new ethers.ContractFactory(abi,bytecode,admin);
    const dka = await DKA.connect(admin).deploy(TxForwarderCA,OrderRulesCA);
    // await dka.connect(admin).transfer(shipper.address,ethers.utils.parseEther('20000'))
    await dka.connect(admin).transfer(carrier.address,ethers.utils.parseEther('20000'))
    console.log(`DKA Contract : ${dka.address}`)
    console.log('DKA 잔금 확인 ....');
    console.log(`....Shipper: [${await dka.balanceOf(shipper.address)}]`);
    console.log(`....Carrier: [${await dka.balanceOf(carrier.address)}]`);
    const TOKENADDRESS = dka.address;
    /** ---------------------------------------------------------*/    

    const TreasuryCA = await deploy_Treasury(TOKENADDRESS,admin);
    let address = { TxForwarderCA, OrderRulesCA, OrderCA, SBTMinterCA, TreasuryCA, SBTShipperCA, SBTCarrierCA,DKA:TOKENADDRESS }
    fs.writeFileSync('contracts.json',JSON.stringify(address,null,4));
    
    const OrderRules = new ethers.Contract(OrderRulesCA,_OrderRules.abi,admin)
    await OrderRules.setDKATokenAddress(dka.address);
    await OrderRules.setOrderAddress(OrderCA);
    await OrderRules.setTreasuryAddress(TreasuryCA);
    await OrderRules.setSBTMinterAddress(SBTMinterCA);
    await OrderRules.setShipperSBTAddress(SBTShipperCA);
    await OrderRules.setCarrierSBTAddress(SBTCarrierCA);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});