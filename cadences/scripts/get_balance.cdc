// This script reads the balance field of an account's ExampleToken Balance

import FungibleToken from 0x9a0766d93b6608b7
// TODO: 改成自己部署了RedCoin合约的钱包地址
import RedCoin from 0xae8b87df71d454cb

pub fun main(account: Address): UFix64 {
    let acct = getAccount(account)
    let vaultRef = acct.getCapability(RedCoin.VaultPublicPath)
        .borrow<&RedCoin.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}
