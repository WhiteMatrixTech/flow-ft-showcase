import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import question from "../assets/images/question.svg";
import { flowService } from "../wallet/services";
import { useWallet } from "../wallet/store/useWallet";
import { ChainsArea } from "./ChainsArea";

export function Content() {
  const [amount, setAmount] = useState(1);
  const { user } = useWallet();
  const [isCollectionInit, setCollectionInit] = useState(false);

  useEffect(() => {
    if (user?.addr) {
      flowService
        .checkCollectionInit(user?.addr)
        .then(setCollectionInit)
        .catch(console.error);
    }
  }, [user?.addr]);

  const handleMint = useCallback(async () => {
    if (!user?.addr) return;
    if (!isCollectionInit) {
      try {
        // init collection
        const tx = await flowService.initCollection();
        setCollectionInit(true);
        // TODO: 执行mint
      } catch (e) {
        console.error(e);
        toast.error("Mint failed!");
      }
    } else {
      // TODO: 执行mint
    }
  }, [isCollectionInit, user?.addr]);

  const plusAmount = () => {
    setAmount(amount + 1);
  };

  function minusAmount() {
    if (amount === 1) {
      return;
    }
    setAmount(amount - 1);
  }
  return (
    <div className="absolute h-[70%] xl:h-[65%] 3xl:h-[60%] w-full top-[20%] xl:top-[23%] 3xl:top-[25%]">
      <div className="flex justify-center items-center relative mx-auto my-2 h-[calc(100%_-_16px)] aspect-[1.68] bg-primaryWhite rounded-2xl shadow-[0px_2px_20px_rgba(197,197,197,0.2)]">
        <h1 className="absolute w-full text-center top-[5%] text-[32px] leading-[39px] text-[#666] font-bold">{`Test Coin(TC)`}</h1>

        {/* content left */}
        <div className="w-[46.1%] mt-[10%] h-[69%] flex flex-col justify-center">
          <p className="text-sm xl:text-base leading-5 xl:leading-6 font-normal">
            ChainIDE is a cloud-based IDE for creating decentralized
            applications to deploy on blockchains such as{" "}
          </p>
          <ChainsArea className="my-[8.6%]" />
          <p className="text-sm xl:text-base leading-5 xl:leading-6 font-normal">
            Here, you have the chance to acquire{" "}
            <span className="text-[#F0B90B] font-bold">TestCoin</span>.
          </p>
        </div>
        {/* split line */}
        <div className="w-[1px] mt-[10%] h-[69%] bg-[rgba(0,0,0,0.06)] ml-[3.2%] mr-[5.2%]"></div>
        {/* content right */}
        <div className="w-[28.2%] mt-[10%] h-[69%] flex flex-col justify-center">
          {/* question image */}
          <Image alt="question" src={question} className="w-[60%] ml-[20%]" />
          {/* price area */}
          <div className="text-[12px] xl:text-sm leading-[18px] w-[100%]">
            <div className="flex items-center justify-between p-1 rounded-lg mt-2">
              <span>PRICE</span>
              <div className="bg-secondaryWhite rounded-lg flex items-center justify-center w-[60%] h-[26px]">
                1 FLOW
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
                999/1000
              </div>
            </div>
          </div>
          {/* mint button */}
          <button
            onClick={handleMint}
            className="w-[100%] py-[10px] mt-[10%] flex items-center rounded-lg text-[20px] font-bold bg-themeColor justify-center text-primaryWhite"
          >
            BUT TC
          </button>
        </div>
      </div>
    </div>
  );
}
