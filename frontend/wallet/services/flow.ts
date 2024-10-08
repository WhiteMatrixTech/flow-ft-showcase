import * as fcl from "@onflow/fcl";

import { ContractInfo } from "../../config";
import { getAmountScript } from "../cadence/get_amount";
import { getFTBalance } from "../cadence/get_ft_balance";
import { getFusdBalanceScript } from "../cadence/get_fusd_balance";
import { getValutDisplayScript } from "../cadence/get_valut_display";
import { mintNftTransaction } from "../cadence/mint_nfts";
import { FclNetworkEnv } from "../constants";
import { handleInteractData } from "../utils/codeHelper";

export class FlowService {
  constructor() {
    fcl.config({
      env: FclNetworkEnv.Testnet, //Mainnet: FclNetworkEnv.Mainnet
      "accessNode.api": "https://rest-testnet.onflow.org", // Mainnet: "https://rest-mainnet.onflow.org"
      "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Mainnet: "https://fcl-discovery.onflow.org/authn"
      "app.detail.title": "Flow NFT ShowCase",
      "app.detail.icon": "https://developers.flow.com/favicon.ico",
      "0xFUNGIBLE_TOKEN_ADDRESS": "0x9a0766d93b6608b7", // Mainnet: "0xf233dcee88fe0abe"
      "0xFUSD_ADDRESS": "0xe223d8a629e49c68", // Mainnet: "0x3c5959b568896393"
      "0xFLOW_TOKEN_ADDRESS": "0x7e60df042a9c0868", // Mainnet: "0x1654653399040a61"
      "0xMETADATA_VIEWS_ADDRESS": "0x631e88ae7f1d7c20", // Mainnet: "0x1d7e57aa55817448"
      "0xFT_ADDRESS": ContractInfo.deployer,
      "0xFT_NAME": ContractInfo.name,
      "0xFT_MINTER_NAME": ContractInfo.minterName,
    });
  }

  login() {
    return fcl.authenticate();
  }

  logout() {
    return fcl.unauthenticate();
  }

  getBalance = async (
    address: string
  ): Promise<{
    fusdBalance?: number;
    flowBalance?: number;
    ftBalance?: number;
  }> => {
    return new Promise((resolve) => {
      Promise.allSettled([
        this.getFusdBalance(address),
        this.getFlowBalance(address),
        this.scriptInteract(getFTBalance, [address]),
      ]).then((v) => {
        const fusdBalance =
          v[0].status === "fulfilled" ? Number(v[0].value) : undefined;
        const flowBalance =
          v[1].status === "fulfilled" ? Number(v[1].value) : undefined;
        const ftBalance =
          v[2].status === "fulfilled" ? Number(v[2].value) : undefined;
        resolve({ fusdBalance, flowBalance, ftBalance });
      });
    });
  };

  getAmount = async (): Promise<{
    total?: number;
    left?: number;
    price?: number;
  }> => {
    return new Promise((resolve, reject) => {
      this.scriptInteract(getAmountScript, [])
        .then((v) => {
          resolve(v);
        })
        .catch(reject);
    });
  };

  getMetadata = async (address: string): Promise<IMetaData> => {
    return await this.scriptInteract(getValutDisplayScript, []);
  };

  getAccount = async (address: string): Promise<AccountObject> => {
    const account = await fcl.send([fcl.getAccount(address)]).then(fcl.decode);
    account.balance = account.balance / 1e8;
    account.address = address;
    return account;
  };

  scriptInteract = async (script: string, args: unknown[]) => {
    const { fclArgs } = await handleInteractData(script, args);
    const response = await fcl
      .send([fcl.script(script), fcl.args(fclArgs)])
      .then(fcl.decode);
    return response;
  };

  transactionInteract = async (script: string, args: unknown[]) => {
    const { fclArgs } = await handleInteractData(script, args, true);
    const response = await fcl.send([
      fcl.transaction(script),
      fcl.args(fclArgs),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.payer(fcl.authz),
      fcl.limit(1000),
    ]);

    if (!response) {
      return;
    }

    const executedTransaction = await fcl.tx(response).onceSealed();
    const transactionReceipt = {
      ...executedTransaction,
      transactionId: response.transactionId,
    };

    return transactionReceipt;
  };

  mintFT = async (amount: number) => {
    return this.transactionInteract(mintNftTransaction, [amount]);
  };

  private getFusdBalance = async (address: string) => {
    return this.scriptInteract(getFusdBalanceScript, [address]);
  };

  private getFlowBalance = async (address: string) => {
    return (await this.getAccount(address)).balance;
  };
}
