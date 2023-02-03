export const checkCollectionInitScript = `
import NonFungibleToken from 0xNON_FUNGIBLE_TOKEN_ADDRESS
import 0xNFT_NAME from 0xNFT_ADDRESS

pub fun main(addr: Address): Bool {
    let ref = getAccount(addr).getCapability<&{NonFungibleToken.CollectionPublic}>(0xNFT_NAME.CollectionPublicPath).check()
    return ref
}`;
