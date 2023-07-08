export const getPurchased = `
import Zail from 0x332ad228e7812d80
import NonFungibleToken from 0x631e88ae7f1d7c20

pub fun main(account: Address, nft: UInt64): Bool {
    let accountCollection = getAccount(account).getCapability(/public/ZailNftCollection)
                        .borrow<&Zail.Collection{NonFungibleToken.CollectionPublic, Zail.CollectionPublic}>()
                        ?? panic("cant get the user collection")

    let ids = accountCollection.getIDs()
    var buy: Bool = false
    
    for id in ids {
        if Zail2.getMintCount(id: nft)!.contains(id) { buy = true } 
    }

    return buy
}
`