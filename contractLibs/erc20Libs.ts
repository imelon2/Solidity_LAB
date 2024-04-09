import { JsonRpcProvider, Interface } from '../types';
import { Contract, Wallet, ethers } from 'ethers';
import abi from '../artifacts/contracts/ERC20/ERC20.sol/MyToken.json';

export class ERC20Libs {
  private provider: JsonRpcProvider;
  private abi: any;
  private contract: Contract;
  private interface: Interface;
  public ca: string;

  constructor(provider: JsonRpcProvider, ca: string) {
    this.provider = provider;
    this.ca = ca;
    this.abi = abi.abi;
    this.contract = new Contract(this.ca, this.abi, this.provider);
    this.interface = this.contract.interface;
  }

  async deploy(signer:Wallet) {
    const factory = new ethers.ContractFactory(abi.abi,abi.bytecode,signer);
    const contract = await factory.deploy();
    await contract.deployed()
    this.ca = contract.address
    return contract
  }

  async totalSupply() {
    try {
      return await this.contract.totalSupply();
    } catch (error) {
      throw error
    }
  }

  async balanceOf(userAddress: string) {
    try {
      return await this.contract.balanceOf(userAddress);
    } catch (error) {
      throw error
    }
  }

  async allowance(owner: string, spender: string) {
    try {
      return await this.contract.allowance(owner, spender);
    } catch (error) {
      throw error
    }
  }

  encodeTransfer(userAddress: string, balance: string) {
    return this.interface.encodeFunctionData('transfer', [userAddress, balance]);
  }

  encodeApprove(spender: string, amount: string): string {
    return this.interface.encodeFunctionData('approve', [spender, amount]);
  }
}
