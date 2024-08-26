export const getValutDisplayScript = `
import 0xFT_NAME from 0xFT_ADDRESS
import FungibleTokenMetadataViews from 0xFUNGIBLE_TOKEN_ADDRESS
access(all) fun main(): AnyStruct{
  return 0xFT_NAME.resolveContractView(resourceType: nil, viewType: Type<FungibleTokenMetadataViews.FTDisplay>()) ?? panic("Could not resolve contract view")
}
`;
