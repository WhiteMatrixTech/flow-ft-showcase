// TODO: change to your account address which deploy TestCoin contract & TestCoinMinter contract
import TestCoin from 0x3f0e550d481207e3
import TestCoinMinter from 0x3f0e550d481207e3
pub fun main(): UFix64 {
    let left = TestCoinMinter.maxSupply - TestCoin.totalSupply
    return left
}