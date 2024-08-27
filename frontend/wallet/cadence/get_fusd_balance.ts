export const getFusdBalanceScript = `
import FUSD from 0xFUSD_ADDRESS
import FungibleToken from 0xFUNGIBLE_TOKEN_ADDRESS
import FungibleTokenMetadataViews from 0xFUNGIBLE_TOKEN_ADDRESS

access(all) fun main(address: Address): UFix64 {
    let vaultData = FUSD.resolveContractView(resourceType: nil, viewType: Type<FungibleTokenMetadataViews.FTVaultData>()) as! FungibleTokenMetadataViews.FTVaultData?
        ?? panic("Could not get vault data view for the contract")

    return getAccount(address).capabilities.borrow<&{FungibleToken.Balance}>(
            vaultData.metadataPath
        )?.balance
        ?? panic("Could not borrow Balance reference to the Vault")
}
`;
