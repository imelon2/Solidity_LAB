import { Orderlibs } from "../../libs/work/Order";
import { dataGenerator } from "../../libs/work/dataGenerator";
import { TxForwarderLibs } from "../../libs/work/TxForwarder";
import { DKAlibs } from "../../libs/work/DKA";
import { BigNumber, ethers } from 'ethers';
import * as format from '../../libs/work/typedData';
import CA from '../../contracts.json'
import 'dotenv/config'
import { IS_REVERT, decodeRevert, IS_CUSTOM_REVERT, decodeCustomRevert } from "../../libs/parseRevert.lib";
import TxForwarder from "../../artifacts/contracts/work/TxForwarder.sol/TxForwarder.json"

const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER);
const sigMaker = new dataGenerator(provider);
const orderContract = new Orderlibs(CA.OrderCA, provider);
const forwarderContract = new TxForwarderLibs(CA.TxForwarderCA, provider);
const DKA = new DKAlibs(CA.DKA, provider);

const walletShipper = new ethers.Wallet(process.env.SHIPPER_KEY);
const walletCarrier = new ethers.Wallet(process.env.CARRIER_KEY);
const walletForwarder = new ethers.Wallet(process.env.ADMIN_KEY);

async function fwCreateOrder() {
    const createData = await orderContract.createOrder(
        // "0x0000000000000000000000000000000000000001", //shipper address 📌
        walletShipper.address, //shipper address
        1100000000, // 출발지 주소 (법정동 코드)
        1100000000, // 도작지 주소 (법정동 코드)
        100, // 물품 무게
        ethers.utils.parseEther('1000'), // 금액
        0, // 만료시간,
        false,
        false,
        '1' // 서버의 orderNo
    );
    const walletSigner = walletForwarder.connect(provider);
    //2770 data 생성
    const req = await sigMaker.forwardData(walletShipper.address, CA.OrderCA, createData)
    req.nonce =+ 1; // 📌


    //2770 data를 위임서비스이용자(원 Msg.sender)가 서명
    const sig = await forwarderContract.signMetaTx(req, walletShipper.connect(provider));
    return await forwarderContract.execute(req, sig, walletSigner);
}

async function fwSelectOrder(_orderId: number, reward: BigNumber) {
    // let orderId: number = +ethers.utils.hexValue(_orderId)
    let orderId: number = _orderId
    const orderData = await sigMaker.matchingData(orderId, walletCarrier.address, reward); // 캐리어의 주문 서명
    const permitDataCarrier = await sigMaker.permitCarrierData(orderId, walletCarrier.address); // 캐리어의 담보 서명
    const permitDataShipper = await sigMaker.permitShipperData(orderId, walletShipper.address, reward); // 화주의 보상 서명
    // const permitDataShipper = await sigMaker.permitShipperData(orderId, walletShipper.address, reward.add(1)); // 화주의 보상 서명 📌

    const selectData0 = await orderContract.selectOrder(
        orderId,
        orderData,
        await walletCarrier._signTypedData(format.order_domain((await provider.getNetwork()).chainId, CA.OrderCA), format.order_types(), orderData),
        permitDataCarrier,
        await walletCarrier._signTypedData(format.permit_domain((await provider.getNetwork()).chainId, CA.DKA), format.permit_types(), permitDataCarrier),
        permitDataShipper,
        await walletShipper._signTypedData(format.permit_domain((await provider.getNetwork()).chainId, CA.DKA), format.permit_types(), permitDataShipper)
    );

    //tx forwarder
    const walletSigner = walletForwarder.connect(provider);
    //2770 data 생성
    const req = await sigMaker.forwardData(walletShipper.address, CA.OrderCA, selectData0)
    //2770 data를 위임서비스이용자(원 Msg.sender)가 서명
    const sig = await forwarderContract.signMetaTx(req, walletShipper.connect(provider));
    await forwarderContract.execute(req, sig, walletSigner);

}

async function fwPickOrderWithOutSig(orderId: number) {
    const pickUpData = await orderContract.pickOrderWithOutSig(orderId);

    //tx forwarder
    const walletSigner = walletForwarder.connect(provider);
    //2770 data 생성
    const req = await sigMaker.forwardData(walletCarrier.address, CA.OrderCA, pickUpData)
    //2770 data를 위임서비스이용자(원 Msg.sender)가 서명
    const sig = await forwarderContract.signMetaTx(req, walletCarrier.connect(provider));
    await forwarderContract.execute(req, sig, walletSigner);
}

async function fwCompleteOrderWithOutSig(orderId: number) {
    const completeData = await orderContract.completeOrderWithOutSig(orderId);

    const walletSigner = walletForwarder.connect(provider);
    //2770 data 생성
    const req = await sigMaker.forwardData(walletCarrier.address, CA.OrderCA, completeData)
    //2770 data를 위임서비스이용자(원 Msg.sender)가 서명
    const sig = await forwarderContract.signMetaTx(req, walletCarrier.connect(provider));
    await forwarderContract.execute(req, sig, walletSigner);
}

//배송전 취소
async function fwCancelOrderBeforeMatch(orderId: number) {
    const cancelData = await orderContract.cancelOrderBeforeMatch(orderId);

    const walletSigner = walletForwarder.connect(provider);
    //2770 data 생성
    const req = await sigMaker.forwardData(walletShipper.address, CA.OrderCA, cancelData)
    //2770 data를 위임서비스이용자(원 Msg.sender)가 서명
    const sig = await forwarderContract.signMetaTx(req, walletShipper.connect(provider));
    await forwarderContract.execute(req, sig, walletSigner);
}

//배송후 취소 (캐리어도 가능)
async function fwCancelOrderBeforePickUp(orderId: number) {
    const cancelData = await orderContract.cancelOrderBeforePickUp(orderId);

    const walletSigner = walletForwarder.connect(provider);
    //2770 data 생성
    const req = await sigMaker.forwardData(walletShipper.address, CA.OrderCA, cancelData)
    //2770 data를 위임서비스이용자(원 Msg.sender)가 서명
    const sig = await forwarderContract.signMetaTx(req, walletShipper.connect(provider));
    await forwarderContract.execute(req, sig, walletSigner);
}

//픽업 후 임의 취소
//캐리어와 화주가 각각 1회씩 tx발행해야함
async function fwCancelOrderByFaultShipper(orderId: number) {
    //취소 당사자(화주)의 정보 + 서명
    const orderData = await orderContract.signatureData(orderId, walletShipper.address);
    const cancelSig = await walletShipper._signTypedData(format.order_domain((await provider.getNetwork()).chainId, CA.OrderCA), format.order_types(), orderData);

    const cancelData = await orderContract.cancelOrderByFault(orderId, walletShipper.address, cancelSig);

    const walletSigner = walletForwarder.connect(provider);
    //2770 data 생성
    const req = await sigMaker.forwardData(walletShipper.address, CA.OrderCA, cancelData)
    //2770 data를 위임서비스이용자(원 Msg.sender)가 서명
    const sig = await forwarderContract.signMetaTx(req, walletShipper.connect(provider));
    await forwarderContract.execute(req, sig, walletSigner);
}

async function fwCancelOrderByFaultCarrier(orderId: number) {
    //취소 당사자(캐리어)의 정보 + 서명
    const orderData = await orderContract.signatureData(orderId, walletCarrier.address);
    const cancelSig = await walletCarrier._signTypedData(format.order_domain((await provider.getNetwork()).chainId, CA.OrderCA), format.order_types(), orderData);

    const cancelData = await orderContract.cancelOrderByFault(orderId, walletCarrier.address, cancelSig);

    const walletSigner = walletForwarder.connect(provider);
    //2770 data 생성
    const req = await sigMaker.forwardData(walletShipper.address, CA.OrderCA, cancelData)
    //2770 data를 위임서비스이용자(원 Msg.sender)가 서명
    const sig = await forwarderContract.signMetaTx(req, walletShipper.connect(provider));
    await forwarderContract.execute(req, sig, walletSigner);
}

const Lodis_Parse_Revert = (error) => {
    /** ---------- SYSTEM ERROR MESSAGE----------  */
    const { data }: { data: string } = error.error.data;
    if (!data || data === '0x') {
        console.log(error);
        return error;

    /** ---------- EIP838 ERROR MESSAGE----------  */
    } else {
        // CONTRACT ERROR
        if (IS_REVERT(data)) {
            const errorMsg = decodeRevert(data);
            return errorMsg;
            // INTERNAL TRANSACTION ERROR
        } else if (IS_CUSTOM_REVERT(data, "ExternalError(bytes)")) {
            const _errorMsg = decodeCustomRevert(data, TxForwarder.abi);
            const errorMsg = decodeRevert(_errorMsg[0]);
            return errorMsg;
        } else {
            return error;
        }
    }
}

(async () => {
    let orderId = await orderContract.getOrderId();
    try {
        await fwCreateOrder();
        await fwSelectOrder(orderId, ethers.utils.parseEther('1000'))
    } catch (error) {
        const result = Lodis_Parse_Revert(error);
        console.log(result);
        
    }
})()