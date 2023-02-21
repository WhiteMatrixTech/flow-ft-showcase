// This script reads the balance field of an account's TestCoin Balance

// TODO: change to your account address which deploy TestCoin contract
import TestCoin from 0xa7a5232f79c086a5
import FungibleToken from 0x9a0766d93b6608b7

pub fun main(account: Address): UFix64 {
    let acct = getAccount(account)
    let vaultRef = acct.getCapability(TestCoin.VaultPublicPath)
        .borrow<&TestCoin.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}
