export const initCollectionTx = `
import NonFungibleToken from 0xNON_FUNGIBLE_TOKEN_ADDRESS
import 0xNFT_NAME from 0xNFT_ADDRESS
import FungibleToken from 0xFUNGIBLE_TOKEN_ADDRESS
import FlowToken from 0xFLOW_TOKEN_ADDRESS
import MetadataViews from 0xMETADATA_VIEWS_ADDRESS

// Setup storage for signer account
transaction {
    prepare(acct: AuthAccount) {
        acct.link<&FungibleToken.Vault{FungibleToken.Receiver, FungibleToken.Balance}>
             (/public/flowTokenReceiver, target: /storage/flowTokenVault)
        if acct.borrow<&0xNFT_NAME.Collection>(from: 0xNFT_NAME.CollectionStoragePath) == nil {
            let collection <- 0xNFT_NAME.createEmptyCollection() as! @0xNFT_NAME.Collection
            acct.save(<-collection, to: 0xNFT_NAME.CollectionStoragePath)
            acct.link<&{0xNFT_NAME.0xNFT_NAMECollectionPublic, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(0xNFT_NAME.CollectionPublicPath, target: 0xNFT_NAME.CollectionStoragePath)
        }
    }
}`;
