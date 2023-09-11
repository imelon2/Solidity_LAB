import { Signer, ethers } from 'ethers';
import 'dotenv/config'
import { SBTInfo, SBTMinterLib } from "../../../libs/work/SBTMinter";
import CA from '../../../contracts.json'

const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER);
const admin = new ethers.Wallet(process.env.ADMIN_KEY,provider)
const SBTMinter = new SBTMinterLib(CA.SBTMinterCA, provider)

/********** View METHOD **********/
const owner = async () => await SBTMinter.owner()
    .then(res => {
        console.log("SBTMinter.owner : ")
        console.log(res);
    })
    .catch(res => console.error("ERR SBTMinter.owner : " + res.reason));

const getShipperRules = async () => await SBTMinter.getShipperRules()
    .then(res => {
        console.log("SBTMinter.getShipperRules : ")
        console.log(res);
    })
    .catch(res => console.error("ERR SBTMinter.getShipperRules : " + (res.reason || res.errorName)));

const getCarrierRules = async () => await SBTMinter.getCarrierRules()
    .then(res => {
        console.log("SBTMinter.getCarrierRules : ")
        console.log(res);
    })
    .catch(res => console.error("ERR SBTMinter.getCarrierRules : " + (res.reason || res.errorName)));

const getShipperRuleByTier = async (tier: number) => await SBTMinter.getShipperRuleByTier(tier)
    .then(res => {
        console.log("SBTMinter.getShipperRuleByTier : ")
        console.log(res);
    })
    .catch(res => console.error("ERR SBTMinter.getShipperRuleByTier : " + (res.reason || res.errorName)));

    const getCarrierRuleByTier = async (tier: number) => await SBTMinter.getCarrierRuleByTier(tier)
    .then(res => {
        console.log("SBTMinter.getCarrierRuleByTier : ")
        console.log(res);
    })
    .catch(res => console.error("ERR SBTMinter.getCarrierRuleByTier : " + (res.reason || res.errorName)));


/********** Set METHOD **********/
const upgradeShipperRules = async (_rule:SBTInfo) => {
    await SBTMinter.upgradeShipperRules(_rule, admin)
        .then(res => {
            console.log("SBTMinter.upgradeShipperRules : ")
            console.log(res);
        })
        .catch(res => console.error("ERR SBTMinter.upgradeShipperRules : " + (res.reason || res.errorName)));
}

const upgradeCarrierRules = async (_rule:SBTInfo) => {
    await SBTMinter.upgradeCarrierRules(_rule, admin)
        .then(res => {
            console.log("SBTMinter.upgradeCarrierRules : ")
            console.log(res);
        })
        .catch(res => console.error("ERR SBTMinter.upgradeCarrierRules : " + (res.reason || res.errorName)));
}

const upgradeBulkShipperRules = async (_rules:SBTInfo[]) => {
    await SBTMinter.upgradeBulkShipperRules(_rules, admin)
        .then(res => {
            console.log("SBTMinter.upgradeBulkShipperRules : ")
            console.log(res);
        })
        .catch(res => console.error("ERR SBTMinter.upgradeBulkShipperRules : " + (res.reason || res.errorName)));
}

const upgradeBulkCarrierRules = async (_rules:SBTInfo[]) => {
    await SBTMinter.upgradeBulkCarrierRules(_rules, admin)
        .then(res => {
            console.log("SBTMinter.upgradeBulkCarrierRules : ")
            console.log(res);
        })
        .catch(res => console.error("ERR SBTMinter.upgradeBulkCarrierRules : " + (res.reason || res.errorName)));
}

const LODIS_SBT_IMAGE_URL = {
    DEV : {
        Carrier : "https://dev-lodis.s3.ap-northeast-2.amazonaws.com/lodiscan/sbt/first-delivery.png",
        Shipper : "https://dev-lodis.s3.ap-northeast-2.amazonaws.com/lodiscan/sbt/speed-delivery.png"
    },
    STAG : {
        Carrier : "https://stg-lodis.s3.ap-northeast-2.amazonaws.com/lodiscan/sbt/first-delivery.png",
        Shipper : "https://stg-lodis.s3.ap-northeast-2.amazonaws.com/lodiscan/sbt/speed-delivery.png"
    }
}
// 더미데이터
let NFTMetaData = {
    "description": "This is Dkargo SBT token",
    "external_url" : "https://dkargo.io/",
    "image" : LODIS_SBT_IMAGE_URL['DEV']['Carrier'],
    "name" : `Dkargo Carrier SBT`
}

let _NFTMetaData = JSON.stringify(NFTMetaData);
let NFTMetaData_Base64 = "data:application/json;base64," + Buffer.from(_NFTMetaData).toString("base64");

// 단일 티어 설정 시
const rule: SBTInfo = {
    tier: 0,
    requirement: 5,
    uri: NFTMetaData_Base64 + "123"
};

// 대량(BULK) 티어 설정 시
const rules:SBTInfo[] = [
    // {
    //     tier: 0,
    //     requirement: 1,
    //     uri: NFTMetaData_Base64
    // },
    // {
    //     tier: 1,
    //     requirement: 10,
    //     uri: NFTMetaData_Base64
    // },
    // {
    //     tier: 2,
    //     requirement: 15,
    //     uri: NFTMetaData_Base64
    // },
    // {
    //     tier: 3,
    //     requirement: 20,
    //     uri: NFTMetaData_Base64
    // }
    {
        tier: 4,
        requirement: 25,
        uri: NFTMetaData_Base64
    }
];

(async () => {
    // await upgradeShipperRules(rule) // Shipper SBT Rule 설정
    await upgradeCarrierRules(rule); // Carrier SBT Rule 설정
    // await upgradeBulkShipperRules(rules)// Shipper SBT Rules 대량(Bulk) 설정
    // await upgradeBulkCarrierRules(rules)// Carrier SBT Rules 대량(Bulk) 설정
    // await owner(); // SBTMinter Contract Admin 주소(EOA) 호출
    // await getShipperRules(); // 현재 설정된 모든 Shipper SBT Rule
    // await getCarrierRules(); // 현재 설정된 모든 Carrier SBT Rule
    // await getCarrierRuleByTier(0) // 현재 설정된 특정 티어의 Shipper SBT Rule
    // await getShipperRuleByTier(0); // 현재 설정된 특정 티어의 Carrier SBT Rule
})()