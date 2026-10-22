// keys.ts
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";

// 1. Generate a random wallet keypair
const wallet = await Keypair.generate();
console.log("Public key:", wallet.publicKey.toBase58());

// Never print or share wallet.secretKey in real applications.

// 2. Create a message
const message = new TextEncoder().encode(
    "I authorize this demo message"
);

// 3. Sign the message using the private key
const signature = nacl.sign.detached(
    message,
    wallet.secretKey
);

console.log("Signature:", bs58.encode(signature));

// 4. Verify using only the public key
const isValid = nacl.sign.detached.verify(
    message,
    signature,
    wallet.publicKey.toBytes()
);

console.log("Signature valid:", isValid);

// 5. Change the message and try again
const alteredMessage = new TextEncoder().encode(
    "I authorize a different message"
);

const alteredIsValid = nacl.sign.detached.verify(
    alteredMessage,
    signature,
    wallet.publicKey.toBytes()
);

console.log("Altered message valid:", alteredIsValid);