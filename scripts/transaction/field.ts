export const lagacyTransactionFields = [
    { name: "nonce",    maxLength: 32, numeric: true },
    { name: "gasPrice", maxLength: 32, numeric: true },
    { name: "gasLimit", maxLength: 32, numeric: true },
    { name: "to",          length: 20 },
    { name: "value",    maxLength: 32, numeric: true },
    { name: "data" },
];