// TODO: change to your account address which deploy TestCoin contract
import TestCoin from 0x3f0e550d481207e3
import FungibleToken from 0x9a0766d93b6608b7 //Mainnet Address: 0xf233dcee88fe0abe
import FungibleTokenMetadataViews from 0x9a0766d93b6608b7 //Mainnet address: 0xf233dcee88fe0abe

access(all) fun main(address: Address): UFix64 {
    let vaultData = TestCoin.resolveContractView(resourceType: nil, viewType: Type<FungibleTokenMetadataViews.FTVaultData>()) as! FungibleTokenMetadataViews.FTVaultData?
        ?? panic("Could not get vault data view for the contract")

    return getAccount(address).capabilities.borrow<&{FungibleToken.Balance}>(
            vaultData.metadataPath
        )?.balance
        ?? panic("Could not borrow Balance reference to the Vault")
}