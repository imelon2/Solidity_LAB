import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    version:"0.8.20",
    settings: {
        optimizer: {
        enabled: true,
      }
    },
  },
  networks: {
    hardhat: {
      chainId:1337
    },
    // mumbai: {
    //   url:`https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
    //   accounts:[process.env.PRI_KEY!]
    // }
  },
};

export default config;