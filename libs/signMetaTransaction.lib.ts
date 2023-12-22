import { ethers } from 'ethers';

export type metaTx = { 
    from:string,
    to:string,
    value:string|number,
    gas:string|number,
    nonce:number,
    data:string
 }

export const forwardRequest_domain = (chainId,address) => {
    return {
        name : "MinimalForwarder",
        version : "0.0.1",
        chainId: chainId,
        verifyingContract : address
    };
}


export const forwardRequest_types =  () => {
    return{
        ForwardRequest: [
            { name: 'from', type: 'address' },
            { name: 'to', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'gas', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'data', type: 'bytes' },
        ]
    }   
}

export const signMetaTx = async (forwarderCA:string,req:metaTx,signer:ethers.Wallet):Promise<string> => {
    const network = await signer.provider.getNetwork();
    // const domain = forwardRequest_domain(network.chainId,forwarderCA);
    const domain = forwardRequest_domain(1,forwarderCA);
    const types = forwardRequest_types();
    return signer._signTypedData(domain,types,req);
}