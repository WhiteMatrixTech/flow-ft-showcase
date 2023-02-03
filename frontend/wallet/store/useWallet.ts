import { useContext } from "react";

import { WalletContext } from "./walletStore";

export function useWallet() {
  return useContext(WalletContext);
}
