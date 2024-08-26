export const getAmountScript = `
import 0xFT_NAME from 0xFT_ADDRESS
import 0xFT_MINTER_NAME from 0xFT_ADDRESS
access(all) fun main(): {String: AnyStruct} {
    return {
        "left": 0xFT_MINTER_NAME.maxSupply - 0xFT_NAME.totalSupply,
        "total": 0xFT_MINTER_NAME.maxSupply,
        "price": 0xFT_MINTER_NAME.price
    }
}`;
