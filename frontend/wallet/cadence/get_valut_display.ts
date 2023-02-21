export const getValutDisplayScript = `
import 0xFT_NAME from 0xFT_ADDRESS
import FungibleTokenMetadataViews from 0xFUNGIBLE_TOKEN_ADDRESS
import MetadataViews from 0xMETADATA_VIEWS_ADDRESS
pub fun main(address: Address): FungibleTokenMetadataViews.FTDisplay{
  let account = getAccount(address)

  let vaultRef = account
    .getCapability(0xFT_NAME.VaultPublicPath)
    .borrow<&{MetadataViews.Resolver}>()
    ?? panic("Could not borrow a reference to the vault resolver")

  let ftDisplay = FungibleTokenMetadataViews.getFTDisplay(vaultRef)
    ?? panic("Token does not implement FTDisplay view")

  return ftDisplay

}`;
