import cn from "classnames";

import chainAptosLogo from "../assets/images/chains/aptos.svg";
import chainBinanceLogo from "../assets/images/chains/binance.png";
import chainConfluxLogo from "../assets/images/chains/conflux.png";
import chainDfinityLogo from "../assets/images/chains/dfinity.png";
import chainEthereumLogo from "../assets/images/chains/ethereum.png";
import chainFlowLogo from "../assets/images/chains/flow.png";
import chainNervosLogo from "../assets/images/chains/nervos.png";
import chainPolygonLogo from "../assets/images/chains/polygon.svg";
import { ChainButton, IChain } from "./ChainButton";

const chains: IChain[] = [
  {
    name: "Ethereum",
    link: "https://chainide.com/s/createTempProject/ethereum",
    icon: chainEthereumLogo,
  },
  {
    name: "BNB Chain",
    link: "https://chainide.com/s/createTempProject/binance",
    icon: chainBinanceLogo,
  },
  {
    name: "Polygon",
    link: "https://chainide.com/s/createTempProject/polygon",
    icon: chainPolygonLogo,
  },
  {
    name: "Conflux",
    link: "https://chainide.com/s/createTempProject/conflux",
    icon: chainConfluxLogo,
  },
  {
    name: "Nervos",
    link: "https://chainide.com/s/createTempProject/nervos",
    icon: chainNervosLogo,
  },
  {
    name: "Dfinity",
    link: "https://chainide.com/s/createTempProject/dfinity",
    icon: chainDfinityLogo,
  },
  {
    name: "Flow",
    link: "https://chainide.com/s/createTempProject/flow",
    icon: chainFlowLogo,
  },
  {
    name: "Aptos",
    link: "https://chainide.com/s/createTempProject/aptos",
    icon: chainAptosLogo,
  },
];

interface IChainAreaProps {
  className?: string;
}
export function ChainsArea(props: IChainAreaProps) {
  const { className } = props;
  return (
    <div className={cn(className, "flex gap-[10px] flex-wrap")}>
      {chains.map((item) => (
        <ChainButton key={item.name} {...item} />
      ))}
    </div>
  );
}
