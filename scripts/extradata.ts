import { hexlify } from "ethers/lib/utils";

/**
 * @command : ts-node scripts/extradata.ts
 */
const CONCAT_ZERO_PADDING_BYTES = 32
const FURTHER_ZERO_PADDING_BYTES = 65
const NIBBLE = 2;

const address = ["0x4aa02e3Ca4764d73D8dbbAd0F31698bD25F9ff81"]
const signers = address.reduce((acc,cur) => acc + (cur.startsWith("0x") ? cur.substring(2) : cur ),"")
const extradata = "0x" + '0'.repeat(CONCAT_ZERO_PADDING_BYTES*NIBBLE) + signers + '0'.repeat(FURTHER_ZERO_PADDING_BYTES*NIBBLE)
console.log(extradata);

const config = {
  config: {
    chainId: 4693,
    homesteadBlock: 0,
    eip150Block: 0,
    eip155Block: 0,
    byzantiumBlock: 0,
    constantinopleBlock: 0,
    petersburgBlock: 0,
    istanbulBlock: 0,
    berlinBlock: 0,
    londonBlock: 0,
    clique: {
      period: 5,
      epoch: 30000,
    },
  },
  alloc: {
    "0x0000000000000000000000000000000000000000": {
      balance: "1",
    },
    "0xa86037bf69e9438293a0ecb189505070e821dfb5": {
      balance: "500000000000000000000",
    },
    "0x3df06c76015c4687db19ac560287860524b3738a": {
      balance: "500000000000000000000000",
    },
  },
  coinbase: "0x0000000000000000000000000000000000000000",
  difficulty: "0x01",
  extraData: "",
  gasLimit: "0xE4E1C0",
};