const { HttpAgent, Actor } = require("@dfinity/agent");
const initIdentity = require('../onchain/identity');
const idlFactory = require('./idlFactory');

const Wallet = async () => {
    const canisterId = 'rgwjw-3aaaa-aaaal-qbcma-cai';
    // Local rrkah-fqaaa-aaaaa-aaaaq-cai
    // Mainnet rgwjw-3aaaa-aaaal-qbcma-cai
    const identity = initIdentity();

    const agent = new HttpAgent({identity, fetch, host: "https://mainnet.dfinity.network" });
    //Local http://127.0.0.1:8000
    //Mainnet https://mainnet.dfinity.network
    await agent.fetchRootKey();

    return Actor.createActor(idlFactory, {
        agent,
        canisterId
    });
}

module.exports = Wallet();
