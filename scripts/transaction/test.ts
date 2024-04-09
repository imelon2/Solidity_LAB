import {
  BytesLike,
  RLP,
  TransactionTypes,
  UnsignedTransaction,
  keccak256,
  serializeTransaction,
  splitSignature,
  stripZeros,
} from "ethers/lib/utils";
import {
  abi,
  bytecode,
} from "../../artifacts/contracts/ERC20/ERC20.sol/MyToken.json";
import { BigNumber, ethers } from "ethers";
import "dotenv/config";
import { ERC20Libs } from "../../contractLibs/erc20Libs";
import { etherToWei } from "../../libs/utils.lib";

type TransactionRequest = ethers.providers.TransactionRequest;
const erc20 = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

/// npx hardhat run scripts/transaction/test.ts
async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER!);
  const a = (await provider.getNetwork()).chainId;
  console.log(a);

  const ERC20 = new ERC20Libs(provider, erc20);
  const signer = new ethers.Wallet(process.env.ADMIN_KEY!, provider);
  const user = new ethers.Wallet(process.env.USER_KEY!, provider);

  console.log(`signer address : ${signer.address}`);
  console.log(`user address : ${user.address}`);

  const rawData = ERC20.encodeTransfer(user.address, etherToWei("1"));
  const tx: TransactionRequest = {
    to: erc20,
    value:BigNumber.from(1),
    gasLimit: 40000,
    data: rawData,
    type: 0,
  };
  const populateTx = await signer.populateTransaction(tx);
  console.log(populateTx);
  delete populateTx["from"];
  const d = ethers.utils.serializeTransaction(<UnsignedTransaction>populateTx)
  
  const sig = await signer.signMessage(keccak256(
    ethers.utils.serializeTransaction(<UnsignedTransaction>populateTx)
  ))
  const as = splitSignature(sig)
  // const sig = await signer.signTransaction(populateTx)
  console.log(as);
  // console.log(sig1);
  // const b = stripZeros(BigNumber.from("1").toHexString())

  // console.log(RLP.decode(sig as unknown as BytesLike));
}

main();


