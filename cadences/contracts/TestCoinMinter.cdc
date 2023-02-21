// TODO: change to your wallet which deploy TestCoin contract
import TestCoin from 0xa7a5232f79c086a5
import FungibleToken from 0x9a0766d93b6608b7

pub contract TestCoinMinter {
    // max supply of TestCoin
    pub var maxSupply: UFix64
    // price of each TestCoin(unit:FLOW)
    pub var price: UFix64

    init() {
        self.maxSupply = 10000.0
        self.price = 2.0
    }

    pub fun paymentMint(
        _ signer: AuthAccount,
        amount: UFix64
    ){
        // step1: qantity judgment
        if(TestCoin.totalSupply + amount > self.maxSupply) {
            panic("Reached the max supply")
        }


        // step2: pay
        // check payer flow valut init
        var flowTokenStoragePath = /storage/flowTokenVault
        let flowVault = signer.borrow<&FungibleToken.Vault>(from: flowTokenStoragePath)
            ?? panic("Cannot borrow vault from signer storage")
        // check receiver flow valut init
        var flowTokenReceiverPath = /public/flowTokenReceiver
        let flowReceiver = self.account.getCapability<&{FungibleToken.Receiver}>(flowTokenReceiverPath).borrow()
            ?? panic("Cannot borrow FungibleToken receiver")
        // create flow valut and do withdraw ==> deposit
        let flowPayment <- flowVault.withdraw(amount: self.price * amount)
        flowReceiver.deposit(from: <- flowPayment)

        // step:3 mint
        // borrow TestCoin admin
        let tokenAdmin = self.account.borrow<&TestCoin.Administrator>(from: TestCoin.AdminStoragePath)
            ?? panic("Deployer is not the token admin")
        // check receivers Test Coin valut init
        let tokenReceiver = signer.getCapability(TestCoin.ReceiverPublicPath).borrow<&{FungibleToken.Receiver}>()
            ?? panic("Unable to borrow receiver reference")
        // Create a minter and mint tokens
        let minter <- tokenAdmin.createNewMinter(allowedAmount: amount)
        let mintedVault <- minter.mintTokens(amount: amount)
        // Deposit them to the receiever
        tokenReceiver.deposit(from: <-mintedVault)
        destroy minter
    }
}