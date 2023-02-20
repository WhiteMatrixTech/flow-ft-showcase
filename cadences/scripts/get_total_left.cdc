// TODO: change to your account address which deploy TestCoin contract & TestCoinMinter contract
import TestCoin from 0xa7a5232f79c086a5
import TestCoinMinter from 0xa7a5232f79c086a5
pub fun main(): UFix64 {
    let left = TestCoinMinter.maxSupply - TestCoin.totalSupply
    return left
}