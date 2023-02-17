import RedCoin from 0xae8b87df71d454cb

transaction(newMinterAccount: Address) {

    let resourceStoragePath: StoragePath
    let capabilityPrivatePath: CapabilityPath
    let minterCapability: Capability<&RedCoin.Minter>

    prepare(adminAccount: AuthAccount) {

        // These paths must be unique within the RedCoin contract account's storage
        self.resourceStoragePath = /storage/minter_01
        self.capabilityPrivatePath = /private/minter_01

        // Create a reference to the admin resource in storage.
        let tokenAdmin = adminAccount.borrow<&RedCoin.Administrator>(from: RedCoin.AdminStoragePath)
            ?? panic("Could not borrow a reference to the admin resource")

        // Create a new minter resource and a private link to a capability for it in the admin's storage.
        let minter <- tokenAdmin.createNewMinter()
        adminAccount.save(<- minter, to: self.resourceStoragePath)
        self.minterCapability = adminAccount.link<&RedCoin.Minter>(
            self.capabilityPrivatePath,
            target: self.resourceStoragePath
        ) ?? panic("Could not link minter")

    }

    execute {

        // This is the account that the capability will be given to
        let minterAccount = getAccount(newMinterAccount)

        let capabilityReceiver = minterAccount.getCapability
            <&RedCoin.MinterProxy{RedCoin.MinterProxyPublic}>
            (RedCoin.MinterProxyPublicPath)!
            .borrow() ?? panic("Could not borrow capability receiver reference")

        capabilityReceiver.setMinterCapability(cap: self.minterCapability)

    }

}