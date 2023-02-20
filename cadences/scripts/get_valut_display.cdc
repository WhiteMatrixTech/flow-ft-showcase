// TODO: change to your account address which deploy TestCoin contract
import TestCoin from 0xa7a5232f79c086a5
import FungibleTokenMetadataViews from 0x9a0766d93b6608b7
import MetadataViews from 0x631e88ae7f1d7c20
pub fun main(address: Address): FungibleTokenMetadataViews.FTDisplay{
  let account = getAccount(address)

  let vaultRef = account
    .getCapability(TestCoin.VaultPublicPath)
    .borrow<&{MetadataViews.Resolver}>()
    ?? panic("Could not borrow a reference to the vault resolver")

  let ftDisplay = FungibleTokenMetadataViews.getFTDisplay(vaultRef)
    ?? panic("Token does not implement FTDisplay view")

  return ftDisplay

}