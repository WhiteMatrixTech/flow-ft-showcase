import * as fcl from "@onflow/fcl";
import React, { ReactNode, useCallback, useEffect, useState } from "react";

import { flowService } from "../services";

interface IWalletContext {
  user: CurrentUserObject | undefined;
  fusdBalance: number | undefined;
  flowBalance: number | undefined;
  isRefreshingBalance: boolean;
  refreshBalance: () => void;
  logOut: () => void;
  logIn: () => void;
}

export const WalletContext = React.createContext<IWalletContext>({
  isRefreshingBalance: false,
} as IWalletContext);

export const ContextProvider = (props: { children: ReactNode }) => {
  const [user, setUser] = useState<CurrentUserObject>();
  const [fusdBalance, setFusdBalance] = useState<number>();
  const [flowBalance, setFlowBalance] = useState<number>();
  const [isRefreshingBalance, setRefreshingBalance] = useState(false);

  const refreshBalance = useCallback(() => {
    if (user?.addr) {
      setRefreshingBalance(true);
      flowService
        .getBalance(user.addr)
        .then((v) => {
          setFusdBalance(v.fusdBalance);
          setFlowBalance(v.flowBalance);
        })
        .finally(() => {
          setRefreshingBalance(false);
        });
    }
  }, [user?.addr]);

  const logIn = useCallback(() => {
    flowService.login();
    refreshBalance();
    fcl.currentUser.subscribe(setUser);
  }, [refreshBalance]);

  const logOut = useCallback(() => {
    flowService.logout();
    location.reload();
  }, []);

  useEffect(() => {
    logIn();
  }, [logIn]);

  return (
    <WalletContext.Provider
      value={{
        user,
        fusdBalance,
        flowBalance,
        isRefreshingBalance,
        refreshBalance,
        logIn,
        logOut,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};
