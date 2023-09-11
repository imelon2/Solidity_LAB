import fs from "fs";
import {ethers} from 'ethers';
import "dotenv/config";
import { deploy_SBTMinter } from "./deploy/SBTMinter";


async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER!);
    const admin = new ethers.Wallet(process.env.ADMIN_KEY!,provider);

    const SBTMinterCA = await deploy_SBTMinter("0xbFFD5Ad3Cac83765C5FD76E4810447BaCdA36677",admin)

    let address = { SBTMinterCA }
    fs.writeFileSync('contracts.json',JSON.stringify(address,null,4));
}

(() => {
    main();
})()