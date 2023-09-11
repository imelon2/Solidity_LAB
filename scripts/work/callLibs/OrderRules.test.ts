import { BigNumber, ethers } from 'ethers';
import 'dotenv/config'
import { OrderRulesLib } from "../../../libs/work/OrderRules";
import CA from '../../../contracts.json'
const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER);
const admin = new ethers.Wallet(process.env.ADMIN_KEY,provider)
const OrderRules = new OrderRulesLib(CA.OrderRulesCA,provider)


const owner = async() => {
    await OrderRules.owner()
    .then(res => {
        console.log("OrderRules.owner : ")
        console.log(res);
    })
    .catch(res => console.error("ERR OrderRules.owner : " + res.reason));
}

const getPlatformFee = async() => {
    await OrderRules.getPlatformFee()
    .then(res => {
        console.log("OrderRules.getPlatformFee : ")
        console.log(res.toString());
        
    })
    .catch(res => console.error("ERR OrderRules.getPlatformFee : " + res.reason));
}

const getShipperFee = async() => {
    await OrderRules.getShipperFee()
    .then(res => {
        console.log("OrderRules.getShipperFee : ")
        console.log(res.toString());
    })
    .catch(res => console.error("ERR OrderRules.getShipperFee : " + res.reason));
}

const getCarrierFee = async() => {
    await OrderRules.getCarrierFee()
    .then(res => {
        console.log("OrderRules.getCarrierFee : ")
        console.log(res.toString());
    })
    .catch(res => console.error("ERR OrderRules.getCarrierFee : " + res.reason));
}

const getTimeExpiredDelayedPick = async() => {
    await OrderRules.getTimeExpiredDelayedPick()
    .then(res => {
        console.log("OrderRules.getTimeExpiredDelayedPick : ")
        console.log(res.toString());
    })
    .catch(res => console.error("ERR OrderRules.getTimeExpiredDelayedPick : " + res.reason));
}

const getTimeExpiredDeliveryFault = async() => {
    await OrderRules.getTimeExpiredDeliveryFault()
    .then(res => {
        console.log("OrderRules.getTimeExpiredDeliveryFault : ")
        console.log(res.toString());
    })
    .catch(res => console.error("ERR OrderRules.getTimeExpiredDeliveryFault : " + res.reason));
}

const getTimeExpiredWaitMatching = async() => {
    await OrderRules.getTimeExpiredWaitMatching()
    .then(res => {
        console.log("OrderRules.getTimeExpiredWaitMatching : ")
        console.log(res.toString());
    })
    .catch(res => console.error("ERR OrderRules.getTimeExpiredWaitMatching : " + res.reason));
}

const setPlatformFee = async(platformFee:string|BigNumber) => {
    await OrderRules.setPlatformFee(platformFee,admin)
    .then(res => {
        console.log("OrderRules.setPlatformFee : ")
        console.log(res);
    })
    .catch(res => console.error("ERR OrderRules.setPlatformFee : " + res.reason));
}

const set = async(data:string) => {
    await OrderRules.setOrderAddress(data,admin)
    .then(res => {
        console.log(res);
    })
    .catch(res => console.error(res));
}


(async() => {
    // console.log(ethers.utils.parseEther("1"));
    
    // await setPlatformFee(ethers.utils.parseEther("40"));
    // await getPlatformFee();
    // await getShipperFee();
    // await getCarrierFee();
    // await getTimeExpiredDelayedPick();
    // await getTimeExpiredDeliveryFault();
    // await getTimeExpiredWaitMatching();
    // await owner();

    // await set('0x0000000000000000000000000000000000000000');
    // await set('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4');
    await set('0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB');
})()