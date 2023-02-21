export const mintNftTransaction = `
import 0xFT_NAME from 0xFT_ADDRESS
import 0xFT_MINTER_NAME from 0xFT_ADDRESS
import FungibleToken from 0xFUNGIBLE_TOKEN_ADDRESS
import MetadataViews from 0xMETADATA_VIEWS_ADDRESS

transaction(amount: UFix64) {
  prepare(signer: AuthAccount) {
      // check if the account already stores a 0xFT_NAME Vault
      if signer.borrow<&0xFT_NAME.Vault>(from: 0xFT_NAME.VaultStoragePath) != nil {
          0xFT_MINTER_NAME.paymentMint(signer, amount:amount)
          return
      }
      // Create a new 0xFT_NAME Vault and put it in storage
      signer.save(
          <-0xFT_NAME.createEmptyVault(),
          to: 0xFT_NAME.VaultStoragePath
      )
      // Create a public capability to the Vault that only exposes
      // the deposit function through the Receiver interface
      signer.link<&0xFT_NAME.Vault{FungibleToken.Receiver}>(
          0xFT_NAME.ReceiverPublicPath,
          target: 0xFT_NAME.VaultStoragePath
      )
      // Create a public capability to the Vault that exposes the Balance and Resolver interfaces
      signer.link<&0xFT_NAME.Vault{FungibleToken.Balance, MetadataViews.Resolver}>(
          0xFT_NAME.VaultPublicPath,
          target: 0xFT_NAME.VaultStoragePath
      )
      0xFT_MINTER_NAME.paymentMint(signer, amount:amount)
  }
}`;
