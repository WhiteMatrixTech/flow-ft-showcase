import FungibleToken from 0x9a0766d93b6608b7
//TODO: 更改成你部署RedCoin合约的账户地址
import RedCoin from 0xae8b87df71d454cb

/// This transaction is what the minter Account uses to mint new tokens
/// They provide the recipient address and amount to mint, and the tokens
/// are transferred to the address after minting
// TODO: RedCoin的部署者（也即管理员）才可以执行该合约，mint指定amount数量的Token到recipient（前提是recipient已经执行过setup_account脚本）
transaction(recipient: Address, amount: UFix64) {

    /// Reference to the RedCoin Token Admin Resource object
    let tokenAdmin: &RedCoin.Administrator

    /// Reference to the Fungible Token Receiver of the recipient
    let tokenReceiver: &{FungibleToken.Receiver}

    /// The total supply of tokens before the burn
    let supplyBefore: UFix64

    prepare(signer: AuthAccount) {
        self.supplyBefore = RedCoin.totalSupply

        // Borrow a reference to the admin object
        self.tokenAdmin = signer.borrow<&RedCoin.Administrator>(from: RedCoin.AdminStoragePath)
            ?? panic("Signer is not the token admin")

        // Get the account of the recipient and borrow a reference to their receiver
        self.tokenReceiver = getAccount(recipient)
            .getCapability(RedCoin.ReceiverPublicPath)
            .borrow<&{FungibleToken.Receiver}>()
            ?? panic("Unable to borrow receiver reference")
    }

    execute {

        // Create a minter and mint tokens
        let minter <- self.tokenAdmin.createNewMinter()
        let mintedVault <- minter.mintTokens(amount: amount)

        // Deposit them to the receiever
        self.tokenReceiver.deposit(from: <-mintedVault)

        destroy minter
    }

    post {
        RedCoin.totalSupply == self.supplyBefore + amount: "The total supply must be increased by the amount"
    }
}