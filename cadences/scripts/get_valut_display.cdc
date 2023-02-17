import FungibleTokenMetadataViews from 0x9a0766d93b6608b7
import MetadataViews from 0x631e88ae7f1d7c20
//TODO: 更改成你部署RedCoin合约的账户地址
import RedCoin from 0xae8b87df71d454cb
//TODO: 这里的address只能是mint RedCoin的人的账户地址，不是部署RedCoin合约的账户地址
pub fun main(address: Address): FungibleTokenMetadataViews.FTDisplay{
  let account = getAccount(address)

  let vaultRef = account
    .getCapability(RedCoin.VaultPublicPath)
    .borrow<&{MetadataViews.Resolver}>()
    ?? panic("Could not borrow a reference to the vault resolver")

  let ftDisplay = FungibleTokenMetadataViews.getFTDisplay(vaultRef)
    ?? panic("Token does not implement FTDisplay view")

  return ftDisplay

}