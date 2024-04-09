import { BigNumber, ethers } from "ethers";
import "dotenv/config";
import {
  RLP,
  UnsignedTransaction,
  arrayify,
  hexlify,
  keccak256,
  splitSignature,
  stripZeros,
} from "ethers/lib/utils";
import { lagacyTransactionFields } from "./field";

/// npx hardhat run scripts/transaction/lagacy.ts
async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER!);
  const signer = new ethers.Wallet(process.env.ADMIN_KEY!, provider);
  const user = new ethers.Wallet(process.env.USER_KEY!, provider);
    
  const nonce = await provider.getTransactionCount(signer.address,"pending")
  console.log(nonce);
  
  let payalod = {
    nonce: await provider.getTransactionCount(signer.address,"pending"),
    gasPrice: await provider.getGasPrice(),
    gasLimit: 40000,
    to: user.address,
    value: BigNumber.from(1).mul(BigNumber.from(10).pow(18)), // 1 ether
    data: "0x",
  };
  
  /**
   * @description v,r,s가 없는 payalod를 나열한 후, RLP-Encode 한다.
   * @requires hexlify 필드 값의 hex 형태 필수
   * @alternative := ethers.utils.serializeTransaction(<UnsignedTransaction>payalod)
   */
  const raw: Array<string | Uint8Array> = [];

  lagacyTransactionFields.forEach((field) => {
    let value = payalod[field.name];
    const options: any = {};
    if (field.numeric) {
      options.hexPad = "left";
    }
    value = arrayify(hexlify(value, options));

    if (field.maxLength) {
        value = stripZeros(value);
    }

    raw.push(hexlify(value));
  });

  /// add EIP-155
  const chainId = (await provider.getNetwork()).chainId;
  raw.push(hexlify(chainId));
  raw.push("0x");
  raw.push("0x");

  const encoded = RLP.encode(raw);

  /**
   * @description RLP-Encode를 서명 후, payload에 r, s, v를 추가한다.
   */
  const { r, s, v } = signer._signingKey().signDigest(keccak256(encoded));

  /// remove EIP-155
  raw.pop();
  raw.pop();
  raw.pop();


  /// calculate EIP-155 v := {0,1} + chainid * 2 + 35
  raw.push(hexlify(v + chainId * 2 + 8));
  // raw.push(hexlify(1 + chainId * 2 + 35));
  raw.push(arrayify(r));
  raw.push(arrayify(s));

  
  const serializeTransaction = RLP.encode(raw);
  const decoded = RLP.decode(serializeTransaction);

  console.log(decoded);
  
  const rpc = {
      "id": 1,
      "jsonrpc": "2.0",
      "params": [
        serializeTransaction
      ],
      "method": "eth_sendRawTransaction"
    }
    
    const response = await provider.send("eth_sendRawTransaction", rpc.params);
    console.log(response);
    
    //   const response = await provider.sendTransaction(serializeTransaction);
      const result = await provider.waitForTransaction(response)
    
      console.log(result);
}
    
    
    main();
    

    