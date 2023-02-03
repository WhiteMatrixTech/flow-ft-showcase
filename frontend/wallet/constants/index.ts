enum FclNetworkEnv {
  Local = "local",
  Canarynet = "canarynet",
  Testnet = "testnet",
  Mainnet = "mainnet",
}

enum CADENCE_CODE_TYPE {
  CONTRACT = "contract",
  TRANSACTION = "transaction",
  SCRIPT = "script",
  UNKNOWN = "unknown",
}

const FlowNetScan = {
  [FclNetworkEnv.Mainnet]: "https://flowscan.org/",
  [FclNetworkEnv.Testnet]: "https://testnet.flowscan.org/",
  [FclNetworkEnv.Canarynet]: "",
  [FclNetworkEnv.Local]: "",
};

export { CADENCE_CODE_TYPE, FclNetworkEnv, FlowNetScan };
