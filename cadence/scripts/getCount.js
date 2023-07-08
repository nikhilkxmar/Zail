export const getCount = `
import Zail from 0x332ad228e7812d80

pub fun main(id: UInt64): [UInt64] {
    let count = Zail.getMintCount(id: id)
    return count
}
`