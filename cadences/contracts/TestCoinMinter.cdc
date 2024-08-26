// TODO: change to your wallet which deploy TestCoin contract
import TestCoin from 0x3f0e550d481207e3 
import FungibleToken from 0x9a0766d93b6608b7 //Mainnet Address: 0xf233dcee88fe0abe

access(all) contract TestCoinMinter {
    // max supply of TestCoin
    access(all) var maxSupply: UFix64
    // price of each TestCoin(unit:FLOW)
    access(all) var price: UFix64

    init() {
        self.maxSupply = 10000.0
        self.price = 2.0
    }

    access(all) fun paymentMint(
        signer:  auth(BorrowValue, IssueStorageCapabilityController, PublishCapability, SaveValue) &Account,
        amount: UFix64
    ){
        // step1: qantity judgment
        if(TestCoin.totalSupply + amount > self.maxSupply) {
            panic("Reached the max supply")
        }

        // step2: pay
        // check payer flow valut init
        var flowTokenStoragePath = /storage/flowTokenVault
        let flowVault = signer.storage.borrow<auth(FungibleToken.Withdraw) &{FungibleToken.Vault}>(from: flowTokenStoragePath)
            ?? panic("Cannot borrow vault from signer storage")
        // check receiver flow valut init
        var flowTokenReceiverPath = /public/flowTokenReceiver
        let flowReceiver = self.account.capabilities.get<&{FungibleToken.Receiver}>(flowTokenReceiverPath).borrow()
            ?? panic("Cannot borrow FungibleToken receiver")
        // create flow valut and do withdraw ==> deposit
        let flowPayment <- flowVault.withdraw(amount: self.price * amount)
        flowReceiver.deposit(from: <- flowPayment)

        // step:3 mint
        // borrow TestCoin admin
        let tokenAdmin = self.account.storage.borrow<&TestCoin.Administrator>(from: TestCoin.AdminStoragePath)
            ?? panic("Deployer is not the token admin")
        // check receivers TestCoin valut init
        let tokenReceiver = signer.capabilities.borrow<&{FungibleToken.Receiver}>(TestCoin.VaultPublicPath) ?? panic("Unable to borrow receiver reference")
        // Create a minter and mint tokens
        let minter <- tokenAdmin.createNewMinter(allowedAmount: amount)
        let mintedVault <- minter.mintTokens(amount: amount)
        // Deposit them to the receiever
        tokenReceiver.deposit(from: <-mintedVault)
        destroy minter
    }
}
