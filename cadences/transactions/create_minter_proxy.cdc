//TODO: 更改成你部署RedCoin合约的账户地址
import RedCoin from 0xae8b87df71d454cb

transaction {

    prepare(adminAccount: AuthAccount) {

        let minter_proxy <- RedCoin.createMinterProxy()
        adminAccount.save(<- minter_proxy, to: RedCoin.MinterProxyStoragePath)

        adminAccount.link<&RedCoin.MinterProxy{RedCoin.MinterProxyPublic}>(
            RedCoin.MinterProxyPublicPath,
            target: RedCoin.MinterProxyStoragePath
        ) ?? panic("Could not link minter proxy")
    }
}