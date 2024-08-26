// TODO: change to your account address which deploy TestCoin contract & TestCoinMinter contract
import TestCoin from 0x3f0e550d481207e3
import TestCoinMinter from 0x3f0e550d481207e3

transaction(amount: UFix64) {
  prepare(signer: auth(BorrowValue, IssueStorageCapabilityController, PublishCapability, SaveValue) &Account) {

  // check if the account already stores a 0xFT_NAME Vault
    if signer.storage.borrow<&TestCoin.Vault>(from: TestCoin.VaultStoragePath) != nil {
        TestCoinMinter.paymentMint(signer:signer, amount:amount)
        return
    }

    let vault <- TestCoin.createEmptyVault(vaultType: Type<@TestCoin.Vault>())
    // Create a new FooToken Vault and put it in storage
    signer.storage.save(<-vault, to: TestCoin.VaultStoragePath)

    // Create a public capability to the Vault that exposes the Vault interfaces
    let vaultCap = signer.capabilities.storage.issue<&TestCoin.Vault>(
        TestCoin.VaultStoragePath
    )
    signer.capabilities.publish(vaultCap, at: TestCoin.VaultPublicPath)

    TestCoinMinter.paymentMint(signer:signer, amount: amount)
  }
}