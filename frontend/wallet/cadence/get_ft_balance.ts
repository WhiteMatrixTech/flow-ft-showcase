export const getFTBalance = `
import 0xFT_NAME from 0xFT_ADDRESS
import FungibleToken from 0xFUNGIBLE_TOKEN_ADDRESS

pub fun main(account: Address): UFix64 {
    let acct = getAccount(account)
    let vaultRef = acct.getCapability(0xFT_NAME.VaultPublicPath)
        .borrow<&0xFT_NAME.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}
`;
