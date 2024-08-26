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

export { CADENCE_CODE_TYPE, FclNetworkEnv };
