import cn from "classnames";
import { useCallback, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

import { ContractInfo } from "../config";
import { flowService } from "../wallet/services";
import { useWallet } from "../wallet/store/useWallet";
import { flowAddressUtils } from "../wallet/utils/flowAddressUtils";
import { ChainsArea } from "./ChainsArea";

export function Content() {
  const [amount, setAmount] = useState(1);
  const { user } = useWallet();
  const [isMinting, setMinting] = useState(false);
  const {
    refreshBalance,
    leftAmount,
    totalAmount,
    refreshAmount,
    flowBalance,
    metadata,
    isGettingMetadata,
    logIn,
    price,
  } = useWallet();

  const handleMint = useCallback(async () => {
    if (
      !user?.addr ||
      isMinting ||
      price === undefined ||
      flowBalance === undefined
    )
      return;
    if (Number(price) * amount > flowBalance) {
      toast.error("Insufficient balance!");
      return;
    }
    // do mint
    setMinting(true);
    flowService
      .mintFT(amount)
      .then((v) => {
        console.log(v);
        toast.success("Succeed!");
        void refreshBalance();
        void refreshAmount();
      })
      .catch((e) => {
        console.error(e);
        toast.error("Failed to mint!");
      })
      .finally(() => {
        setMinting(false);
      });
  }, [
    amount,
    flowBalance,
    isMinting,
    price,
    refreshAmount,
    refreshBalance,
    user?.addr,
  ]);

  const plusAmount = () => {
    setAmount(amount + 1);
  };

  function minusAmount() {
    if (amount === 1) {
      return;
    }
    setAmount(amount - 1);
  }

  const renderTitleHeader = useCallback(() => {
    if (isGettingMetadata) {
      return (
        <Skeleton
          className="absolute left-[50%] -translate-x-[50%] w-60 top-[5%] leading-[39px]"
          count={1}
        />
      );
    }
    if (!metadata?.name) {
      return <></>;
    }
    if (!metadata.symbol) {
      return (
        <h1 className="absolute w-full text-center top-[5%] text-[32px] leading-[39px] text-[#666] font-bold">{`${metadata?.name}`}</h1>
      );
    }
    return (
      <h1 className="absolute w-full text-center top-[5%] text-[32px] leading-[39px] text-[#666] font-bold">{`${metadata?.name}(${metadata?.symbol})`}</h1>
    );
  }, [isGettingMetadata, metadata?.name, metadata?.symbol]);

  if (!user?.addr) {
    return (
      <div className="text-2xl w-full h-full flex items-center justify-center">
        <span>Please</span>&nbsp;
        <div onClick={logIn} className="text-[#F0B90B] block cursor-pointer">
          login
        </div>
      </div>
    );
  }

  return (
    <div className="absolute h-[70%] xl:h-[65%] 3xl:h-[60%] w-full top-[20%] xl:top-[23%] 3xl:top-[25%]">
      <div className="flex justify-center items-center relative mx-auto my-2 h-[calc(100%_-_16px)] aspect-[1.68] bg-primaryWhite rounded-2xl shadow-[0px_2px_20px_rgba(197,197,197,0.2)]">
        {renderTitleHeader()}

        {/* content left */}
        <div className="w-[46.1%] mt-[10%] h-[69%] flex flex-col justify-center">
          <p className="text-sm xl:text-base leading-5 xl:leading-6 font-normal">
            ChainIDE is a cloud-based IDE for creating decentralized
            applications to deploy on blockchains such as{" "}
          </p>
          <ChainsArea className="my-[8.6%]" />
          <p
            className={cn(
              "w-full text-sm xl:text-base leading-5 xl:leading-6 font-normal"
            )}
          >
            Here, you have the chance to acquire
            <span
              className="text-[#F0B90B] font-bold cursor-pointer"
              onClick={() => {
                window.open(
                  `https://testnet.flowdiver.io/contract/A.${flowAddressUtils.sansPrefix(
                    ContractInfo.deployer
                  )}.${ContractInfo.name}`,
                  "_blank"
                );
              }}
            >
              &nbsp;{metadata?.name}
            </span>
            .
          </p>
        </div>
        {/* split line */}
        <div className="w-[1px] mt-[10%] h-[69%] bg-[rgba(0,0,0,0.06)] ml-[3.2%] mr-[5.2%]"></div>
        {/* content right */}
        <div className="w-[28.2%] mt-[10%] h-[69%] flex flex-col justify-center">
          {/* question image */}
          {/* <Image alt="question" src={question} className="w-[60%] ml-[20%]" /> */}
          <div
            className="w-[60%] ml-[20%] aspect-square bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage: `url(${metadata?.logos.items[0]?.file.url})`,
            }}
          />
          {/* price area */}
          <div className="text-[12px] xl:text-sm leading-[18px] w-[100%]">
            <div className="flex items-center justify-between p-1 rounded-lg mt-2">
              <span>PRICE</span>
              <div className="bg-secondaryWhite rounded-lg flex items-center justify-center w-[60%] h-[26px]">
                {price !== undefined ? `${Number(price).toFixed(2)} FLOW` : ""}
              </div>
            </div>
            <div className="flex items-center justify-between p-1 rounded-lg mt-2">
              <span>Amount</span>
              <div className="bg-secondaryWhite rounded-lg flex items-center justify-center w-[60%] h-[26px]">
                <button
                  className="w-[18px] h-[18px] rounded border-[2px] border-solid border-themeColor text-themeColor text-[30px] flex items-center justify-center"
                  onClick={minusAmount}
                >
                  -
                </button>
                <input
                  className="w-[60%] overflow-hidden text-center outline-none focus:outline-none bg-secondaryWhite"
                  value={amount}
                  disabled={false}
                  onChange={(e) => {
                    const input = parseInt(e.target.value);
                    if (Number.isNaN(input)) {
                      return;
                    } else {
                      setAmount(input);
                    }
                  }}
                />
                <button
                  className="pb-[2px] w-[18px] h-[18px] rounded bg-themeColor text-secondaryWhite text-[20px] flex items-center justify-center"
                  onClick={plusAmount}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between p-1 rounded-lg mt-2">
              <span>LEFT</span>
              <div className="bg-secondaryWhite rounded-lg flex items-center justify-center w-[60%] h-[26px]">
                {leftAmount !== undefined && totalAmount !== undefined ? (
                  <span>
                    {Number(leftAmount)}/{Number(totalAmount)}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {/* mint button */}
          <button
            onClick={handleMint}
            className={cn(
              "w-[100%] py-[10px] mt-[10%] flex items-center rounded-lg text-[20px] font-bold bg-themeColor justify-center text-primaryWhite",
              isMinting && "opacity-50 cursor-not-allowed"
            )}
          >
            BUY {metadata?.symbol}
          </button>
        </div>
      </div>
    </div>
  );
}
