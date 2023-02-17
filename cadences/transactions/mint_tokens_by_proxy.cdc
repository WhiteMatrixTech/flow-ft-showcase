import FungibleToken from 0x9a0766d93b6608b7
//TODO: 更改成你部署RedCoin合约的账户地址
import RedCoin from 0xae8b87df71d454cb

transaction(recipientAddress: Address, amount: UFix64) {
    let tokenMinter: &RedCoin.MinterProxy
    let tokenReceiver: &{FungibleToken.Receiver}

    prepare(minterAccount: AuthAccount) {
        self.tokenMinter = minterAccount
            .borrow<&RedCoin.MinterProxy>(from: RedCoin.MinterProxyStoragePath)
            ?? panic("No minter available")

        self.tokenReceiver = getAccount(recipientAddress)
            .getCapability(/public/redCoinReceiver)!
            .borrow<&{FungibleToken.Receiver}>()
            ?? panic("Unable to borrow receiver reference")
    }

    execute {
        let mintedVault <- self.tokenMinter.mintTokens(amount: amount)

        self.tokenReceiver.deposit(from: <-mintedVault)
    }
}