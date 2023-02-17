// This script reads the total supply field
// of the ExampleToken smart contract
// TODO: 改成自己部署了RedCoin合约的钱包地址
//TODO: RedCoin的supply总量不是固定的，只是在RedCoin合约里初始化为0，mint的越多，这个值越大
import RedCoin from 0xae8b87df71d454cb
pub fun main(): UFix64 {
    let supply = RedCoin.totalSupply
    log(supply)
    return supply
}