// This script reads the total supply field
// of the ExampleToken smart contract
//TODO: 更改成你部署ExampleToken合约的账户地址
//TODO: ExampleToken的supply总量不是固定的，只是在ExampleToken合约里初始化为1000，mint的越多，这个值越大
import RedCoin from 0xae8b87df71d454cb
pub fun main(): UFix64 {
    let supply = RedCoin.totalSupply
    log(supply)
    return supply
}