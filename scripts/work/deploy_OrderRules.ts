import fs from "fs";
import {ethers} from 'ethers';
import "dotenv/config";

import { deploy_OrderRules } from "./deploy/OrderRules";

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER!);
    const admin = new ethers.Wallet(process.env.ADMIN_KEY!,provider);


    const OrderRulesCA = await deploy_OrderRules(admin)

    let address = { OrderRulesCA }
    fs.writeFileSync('contracts.json',JSON.stringify(address,null,4));
}

(() => {
    main();
})()