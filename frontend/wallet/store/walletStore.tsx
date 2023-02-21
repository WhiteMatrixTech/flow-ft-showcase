import * as fcl from "@onflow/fcl";
import React, { ReactNode, useCallback, useEffect, useState } from "react";

import { ContractInfo } from "../../config";
import { flowService } from "../services";

interface IWalletContext {
  user: CurrentUserObject | undefined;
  fusdBalance: number | undefined;
  flowBalance: number | undefined;
  ftBalance: number | undefined;
  isRefreshingBalance: boolean;
  isGettingAmount: boolean;
  totalAmount: number | undefined;
  leftAmount: number | undefined;
  isGettingMetadata: boolean;
  metadata: IMetaData | undefined;
  price: number | undefined;
  getMetadata: () => void;
  refreshBalance: () => void;
  logOut: () => void;
  logIn: () => void;
  refreshAmount: () => void;
}

export const WalletContext = React.createContext<IWalletContext>({
  isRefreshingBalance: false,
} as IWalletContext);

export const ContextProvider = (props: { children: ReactNode }) => {
  const [user, setUser] = useState<CurrentUserObject>();
  const [fusdBalance, setFusdBalance] = useState<number>();
  const [flowBalance, setFlowBalance] = useState<number>();
  const [ftBalance, setFTBalance] = useState<number>();
  const [isRefreshingBalance, setRefreshingBalance] = useState(false);
  const [isGettingAmount, setGettingAmount] = useState(false);
  const [totalAmount, setTotalAmount] = useState<number>();
  const [leftAmount, setLeftAmount] = useState<number>();
  const [isGettingMetadata, setGettingMetadata] = useState(false);
  const [metadata, setMetadata] = useState<IMetaData>();
  const [price, setPrice] = useState<number>();

  const refreshBalance = useCallback(() => {
    if (user?.addr) {
      setRefreshingBalance(true);
      flowService
        .getBalance(user.addr)
        .then((v) => {
          setFusdBalance(v.fusdBalance);
          setFlowBalance(v.flowBalance);
          setFTBalance(v.ftBalance);
        })
        .finally(() => {
          setRefreshingBalance(false);
        });
    }
  }, [user?.addr]);

  const refreshAmount = useCallback(() => {
    if (!user?.addr) return;
    setGettingAmount(true);
    flowService
      .getAmount()
      .then((v) => {
        setTotalAmount(v.total);
        setLeftAmount(v.left);
        setPrice(v.price);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setGettingAmount(false);
      });
  }, [user?.addr]);

  const getMetadata = useCallback(() => {
    setGettingMetadata(true);
    // deployer already init FT valut when deploy contract
    flowService
      .getMetadata(ContractInfo.deployer)
      .then(setMetadata)
      .catch(console.error)
      .finally(() => {
        setGettingMetadata(false);
      });
  }, []);

  useEffect(() => {
    if (user?.addr) {
      refreshBalance();
      refreshAmount();
      getMetadata();
    }
  }, [getMetadata, refreshAmount, refreshBalance, user?.addr]);

  const logIn = useCallback(() => {
    flowService.login();
    fcl.currentUser.subscribe(setUser);
  }, []);

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
        ftBalance,
        isRefreshingBalance,
        isGettingAmount,
        totalAmount,
        leftAmount,
        isGettingMetadata,
        metadata,
        price,
        getMetadata,
        refreshBalance,
        logIn,
        logOut,
        refreshAmount,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};
