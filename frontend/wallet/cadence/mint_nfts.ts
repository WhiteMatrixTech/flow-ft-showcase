export const mintNftTransaction = `
import 0xFT_NAME from 0xFT_ADDRESS
import 0xFT_MINTER_NAME from 0xFT_ADDRESS

transaction(amount: UFix64) {
  prepare(signer: auth(BorrowValue, IssueStorageCapabilityController, PublishCapability, SaveValue) &Account) {
      // check if the account already stores a 0xFT_NAME Vault
      if signer.storage.borrow<&0xFT_NAME.Vault>(from: 0xFT_NAME.VaultStoragePath) != nil {
          0xFT_MINTER_NAME.paymentMint(signer:signer, amount:amount)
          return
      }
     
      let vault <- 0xFT_NAME.createEmptyVault(vaultType: Type<@0xFT_NAME.Vault>())
      // Create a new 0xFT_NAME Vault and put it in storage
      signer.storage.save(<-vault, to: 0xFT_NAME.VaultStoragePath)

      // Create a public capability to the Vault that exposes the Vault interfaces
      let vaultCap = signer.capabilities.storage.issue<&0xFT_NAME.Vault>(
          0xFT_NAME.VaultStoragePath
      )
      signer.capabilities.publish(vaultCap, at: 0xFT_NAME.VaultPublicPath)
     
      0xFT_MINTER_NAME.paymentMint(signer:signer, amount: amount)
  }
}
`;

