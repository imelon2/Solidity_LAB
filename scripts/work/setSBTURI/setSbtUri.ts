import {ethers} from "ethers";
import {abi} from '../../../artifacts/contracts/work/SBTMinter.sol/SBTMinter.json';

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

/**
 * 
 * @param {DEV,STAG} envir 
 * @param {Carrier, Shipper} subject 
 */
export const encodeSBTTokenURL = (envir,subject) => {
    const NFTMetaData = {
        "description": "This is Dkargo SBT token",
        "external_url" : "https://dkargo.io/",
        "image" : LODIS_SBT_IMAGE_URL[envir][subject],
        "name" : `Dkargo ${subject} SBT`
    }

    let _NFTMetaData:any = JSON.stringify(NFTMetaData);
    _NFTMetaData = ethers.utils.toUtf8Bytes(_NFTMetaData)
    _NFTMetaData = "data:application/json;base64," + ethers.utils.base64.encode(_NFTMetaData)
    return _NFTMetaData;
}

export const decodeSBTTokenURL = (url) => {
    url = url.replace("data:application/json;base64,","");
    let NFTMetaData :any = ethers.utils.base64.decode(url)
    NFTMetaData = ethers.utils.toUtf8String(NFTMetaData)
    NFTMetaData = JSON.parse(NFTMetaData);
    return {
        description : NFTMetaData.description,
        external_url : NFTMetaData.external_url,
        image : NFTMetaData.image,
        name : NFTMetaData.name
    };
}

export const initUpgradeShipperRules = async (CA,signer,tokenUri) => {
    const rule = {
        tier: 0, // 최초 발행 티어 = 0
        requirement: 1, //  발행 조건 : CompleteOrder 1회
        uri: tokenUri
    }

    const SBTMinter = new ethers.Contract(CA,abi,signer);
    const tx = await SBTMinter.upgradeShipperRules(rule);
    await tx.wait();
}

export const initUpgradeCarrierRules = async (CA,signer,tokenUri) => {
    const rule = {
        tier: 0, // 최초 발행 티어 = 0
        requirement: 1, //  발행 조건 : CompleteOrder 1회
        uri: tokenUri
    }
    const SBTMinter = new ethers.Contract(CA,abi,signer);
    const tx = await SBTMinter.upgradeCarrierRules(rule);
    await tx.wait()
}

