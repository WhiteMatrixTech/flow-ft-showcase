// https://github.com/onflow/fcl-js/blob/master/docs/reference/api.md
// https://github.com/onflow/flow-cadut/blob/main/docs/api.md
interface ArgumentObject {
  value: any;
  xform: any;
}

interface CommonConfigs {
  "accessNode.api": string;
  "discovery.wallet": string;
  "app.detail.title"?: string;
  "app.detail.icon"?: string;
  env?: "local" | "canarynet" | "testnet" | "mainnet";
  [key: string]: any;
}

interface CurrentUserObject {
  addr: string | null;
  cid: string | null;
  expiresAt: string | null;
  f_type: string;
  f_vsn: string;
  loggedIn: boolean | null;
  balance: string;
}

interface AccountObject {
  address: string;
  balance: number;
  code: string;
  contracts: {
    [contractName: string]: string;
  };
  keys: Array<{
    hashAlgo: number;
    index: number;
    publicKey: string;
    revoked: boolean;
    sequenceNumber: number;
    signAlgo: number;
    weight: number;
  }>;
}

interface AuthorizationObject {
  addr: string;
  signingFunction: function;
  keyId: number;
  sequenceNum: number;
}

enum TransactionStatuses {
  Unknown = 0,
  Pending = 1, // Transaction Pending - Awaiting Finalization
  Finalized = 2, // Transaction Finalized - Awaiting Execution
  Executed = 3, // Transaction Executed - Awaiting Sealing
  Sealed = 4, // Transaction Sealed - Transaction Complete. At this point the transaction result has been committed to the blockchain.
  Expired = 5, // Transaction Expired
}

interface TransactionState {
  errorMessage: string;
  status: TransactionStatuses;
  statusCode: number;
  events: Array<{
    eventIndex: number;
    transactionId: string;
    transactionIndex: number;
    type: string | "flow.AccountContractAdded" | "flow.AccountContractUpdated";
    data?: {
      address: string;
    };
  }>;
}

interface DecodedCadenceCode {
  code: string;
  argPairList: Array<{
    key: string;
    type: string;
  }>;
  type: CADENCE_CODE_TYPE;
  signers: number | undefined;
  contractName: string | undefined;
}

declare module "@onflow/fcl" {
  const authz: AuthorizationObject;

  const currentUser = {
    authorization: AuthorizationObject,
    subscribe: (callback: Function) => any,
    snapshot: () => CurrentUserObject,
  };
  interface config {
    put: (key: string, value: unknown) => config;
    get: (key: keyof CommonConfigs, value?: T) => Promise<any>;
  }

  function config(configs?: CommonConfigs): config;

  function authenticate<T>(): Promise<T>;
  function unauthenticate<T>(): Promise<T>;
  function getAccount(address: string): Promise<AccountObject>;
  function arg(value: unknown, xform: injectType): ArgumentObject;
  function args(args: ArgumentObject[]): any;
  function limit(limit: number): any;
  function send(builders: any[]): Promise<any>;
  function decode(response: any): Promise<any>;
  function tx(transactionId: string): {
    onceFinalized(): Promise<TransactionState>;
    onceExecuted(): Promise<TransactionState>;
    onceSealed(): Promise<TransactionState>;
  };

  function transaction(code: string): any;
  function script(code: string): any;
  function proposer(author: AuthorizationObject): any;
  function authorizations(authors: AuthorizationObject[]): any;
  function payer(code: author): AuthorizationObject;
}

declare module "@onflow/types" {
  interface injectType {
    label: string;
    asArgument: (v) => {
      type: string;
      value: string;
    };
    asInjection: (v) => v;
  }

  const String: injectType;
}

declare module "@onflow/flow-cadut" {
  enum CADENCE_CODE_TYPE {
    CONTRACT = "contract",
    TRANSACTION = "transaction",
    SCRIPT = "script",
    UNKNOWN = "unknown",
  }
  function splitArgs(args: string): string[];

  function getTemplateInfo(code: string): {
    type: CADENCE_CODE_TYPE;
    args: string | string[];
    signers?: number;
    contractName?: string;
  };
  function extractScriptArguments(code: string): string[];
  function extractTransactionArguments(code: string): string[];

  function mapArgument(rawType: string, rawValue: any): Promise<ArgumentObject>;

  function mapArguments(
    schema: string[],
    values: any[]
  ): Promise<ArgumentObject[]>;
}
