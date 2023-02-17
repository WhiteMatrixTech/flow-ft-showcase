// This transaction is a template for a transaction to allow 
// anyone to add a Vault resource to their account so that 
// they can use the exampleToken
// TODO: 想要mint token的人的钱包地址需要执行这个transaction来初始化 ExampleToken的存储
import FungibleToken from 0x9a0766d93b6608b7
import RedCoin from 0xae8b87df71d454cb
import MetadataViews from 0x631e88ae7f1d7c20

transaction () {

    prepare(signer: AuthAccount) {

        // Return early if the account already stores a RedCoin Vault
        if signer.borrow<&RedCoin.Vault>(from: RedCoin.VaultStoragePath) != nil {
            return
        }

        // Create a new RedCoin Vault and put it in storage
        signer.save(
            <-RedCoin.createEmptyVault(),
            to: RedCoin.VaultStoragePath
        )

        // Create a public capability to the Vault that only exposes
        // the deposit function through the Receiver interface
        signer.link<&RedCoin.Vault{FungibleToken.Receiver}>(
            RedCoin.ReceiverPublicPath,
            target: RedCoin.VaultStoragePath
        )

        // Create a public capability to the Vault that exposes the Balance and Resolver interfaces
        signer.link<&RedCoin.Vault{FungibleToken.Balance, MetadataViews.Resolver}>(
            RedCoin.VaultPublicPath,
            target: RedCoin.VaultStoragePath
        )
    }
}
