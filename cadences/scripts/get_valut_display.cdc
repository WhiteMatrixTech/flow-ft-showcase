// TODO: change to your account address which deploy TestCoin contract
import TestCoin from 0x3f0e550d481207e3
import FungibleTokenMetadataViews from 0x9a0766d93b6608b7 //Mainnet address: 0xf233dcee88fe0abe
access(all) fun main(): AnyStruct{
  return TestCoin.resolveContractView(resourceType: nil, viewType: Type<FungibleTokenMetadataViews.FTDisplay>()) ?? panic("Could not resolve contract view")
}