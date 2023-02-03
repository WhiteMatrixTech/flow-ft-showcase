class FlowAddressUtils {
  sansPrefix(address: string) {
    if (!address) return "";
    return address.replace(/^0x/, "").replace(/^Fx/, "");
  }

  withPrefix(address: string) {
    if (!address) return "";
    return "0x" + this.sansPrefix(address);
  }

  isAddress(address: string) {
    if (!address) return false;
    const prefixAddr = this.withPrefix(address);
    if (prefixAddr.length !== 18) {
      return false;
    }
    try {
      BigInt(prefixAddr);
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  abbrAddress(address: string) {
    const prefixAddress = this.withPrefix(address);
    if (prefixAddress.length < 10) {
      return address;
    } else {
      return prefixAddress.substring(0, 6) + "..." + prefixAddress.slice(-4);
    }
  }

  getMatrixMarketNFTLink(contractAddress: string, tokenId: number) {
    return `https://alpha-testnet--flow-market.netlify.app/collection/testnet_flow-${contractAddress}/${tokenId}`;
  }

  getMatrixMarketProfileLink(address: string) {
    return `https://alpha-testnet--flow-market.netlify.app/account/testnet_flow-${address}`;
  }
}

export const flowAddressUtils = new FlowAddressUtils();
