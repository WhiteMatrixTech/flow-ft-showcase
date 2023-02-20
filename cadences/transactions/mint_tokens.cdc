// TODO: change to your account address which deploy TestCoin contract & TestCoinMinter contract
import TestCoin from 0xa7a5232f79c086a5
import TestCoinMinter from 0xa7a5232f79c086a5
import FungibleToken from 0x9a0766d93b6608b7
import MetadataViews from 0x631e88ae7f1d7c20

transaction(amount: UFix64) {
  prepare(signer: AuthAccount) {
      // check if the account already stores a TestCoin Vault
      if signer.borrow<&TestCoin.Vault>(from: TestCoin.VaultStoragePath) != nil {
          TestCoinMinter.paymentMint(signer, amount:amount)
          return
      }
      // Create a new TestCoin Vault and put it in storage
      signer.save(
          <-TestCoin.createEmptyVault(),
          to: TestCoin.VaultStoragePath
      )
      // Create a public capability to the Vault that only exposes
      // the deposit function through the Receiver interface
      signer.link<&TestCoin.Vault{FungibleToken.Receiver}>(
          TestCoin.ReceiverPublicPath,
          target: TestCoin.VaultStoragePath
      )
      // Create a public capability to the Vault that exposes the Balance and Resolver interfaces
      signer.link<&TestCoin.Vault{FungibleToken.Balance, MetadataViews.Resolver}>(
          TestCoin.VaultPublicPath,
          target: TestCoin.VaultStoragePath
      )
      TestCoinMinter.paymentMint(signer, amount:amount)
  }
}