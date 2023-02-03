import cn from "classnames";
import copy from "copy-to-clipboard";
import Image from "next/image";
import { useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import { useClickAway } from "react-use";

import copyImg from "../assets/images/copy.svg";
import logoutImg from "../assets/images/log_out.svg";
import refresh from "../assets/images/refresh.svg";
import userLogo from "../assets/images/user.svg";
import { useWallet } from "../wallet/store/useWallet";
import { flowAddressUtils } from "../wallet/utils/flowAddressUtils";

export function Header() {
  const [showAccountDetail, setShowAccountDetail] = useState(false);
  const {
    user,
    fusdBalance,
    flowBalance,
    isRefreshingBalance,
    refreshBalance,
    logOut,
    logIn,
  } = useWallet();

  const accountRef = useRef(null);
  useClickAway(accountRef, () => {
    setShowAccountDetail(false);
  });

  function handleCopy() {
    if (copy(user?.addr || "")) {
      toast.success("Copied!");
    }
  }

  function handleRefresh() {
    if (isRefreshingBalance) {
      return;
    }
    refreshBalance();
  }

  return (
    <div className="absolute right-[5%] top-5 z-10" ref={accountRef}>
      {/* account logo */}
      <Image
        alt="user"
        src={userLogo}
        className="w-[21px] cursor-pointer"
        onMouseEnter={() => {
          if (user?.addr) {
            setShowAccountDetail(true);
          }
        }}
        onClick={() => {
          if (!user?.addr) {
            logIn();
          } else {
            setShowAccountDetail(!showAccountDetail);
          }
        }}
      />
      {/* account detail */}
      {showAccountDetail && (
        <div className="shadow-lg px-2 py-[10px] absolute w-[222px] h-[260px] rounded-2xl bg-themeColor -right-2 top-[39px]">
          {/* address */}
          <div className="flex items-center justify-between text-secondaryWhite text-[13px] leading-4 font-bold">
            <span className="uppercase">
              {flowAddressUtils.abbrAddress(user?.addr || "")}
            </span>
            <Image
              src={copyImg}
              alt="copy"
              width={12}
              className="cursor-pointer"
              onClick={handleCopy}
            />
          </div>
          {/* balance */}
          <div className="mt-2 bg-primaryWhite h-[190px] rounded-2xl flex flex-col justify-center items-center px-4 py-[10px]">
            <div className="w-full flex items-center justify-between">
              <span>Balance</span>
              <Image
                src={refresh}
                alt="refresh balance"
                width={11}
                onClick={handleRefresh}
                className={cn(
                  "cursor-pointer",
                  isRefreshingBalance && "animate-spin"
                )}
              />
            </div>
            {/* flow balance */}
            <div className="w-full flex items-center justify-between mt-4 mb-[10px]">
              <span className="text-[#232323] text-sm leading-[21px]">
                Flow
              </span>
              {isRefreshingBalance ? (
                <Skeleton className="w-20 h-5" count={1} />
              ) : (
                <span className="text-[20px] leading-[23px] font-bold">
                  {flowBalance === undefined ? "" : flowBalance.toFixed(2)}
                </span>
              )}
            </div>
            {/* fusd balance */}
            <div className="w-full flex items-center justify-between mb-[10px]">
              <span className="text-[#232323] text-sm leading-[21px]">
                Fusd
              </span>
              {isRefreshingBalance ? (
                <Skeleton className="w-20 h-5" count={1} />
              ) : (
                <span className="text-[20px] leading-[23px] font-bold">
                  {fusdBalance === undefined ? "" : fusdBalance.toFixed(2)}
                </span>
              )}
            </div>
            {/* TC balance */}
            <div className="w-full flex items-center justify-between">
              <span className="text-[#232323] text-sm leading-[21px]">TC</span>
              {isRefreshingBalance ? (
                <Skeleton className="w-20 h-5" count={1} />
              ) : (
                <span className="text-[20px] leading-[23px] font-bold">
                  {fusdBalance === undefined ? "" : fusdBalance.toFixed(2)}
                </span>
              )}
            </div>
            {/* add funds */}
            <a
              href="https://testnet-faucet-v2.onflow.org/fund-account"
              target="_blank"
              className="block w-full"
              rel="noreferrer"
            >
              <button className="font-bold text-primaryWhite text-sm w-full h-[30px] rounded-lg leading-[21px] text-center bg-themeColor mt-[10px]">
                Add Funds
              </button>
            </a>
          </div>
          {/* sign out button */}
          <button
            className="w-full h-[15px] mt-[10px] flex items-center justify-center"
            onClick={logOut}
          >
            <Image alt="sign out" src={logoutImg} className="w-3 mr-[7px]" />
            <span className="text-primaryWhite text-[12px] leading-[15px] font-bold">
              Sign Out
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
