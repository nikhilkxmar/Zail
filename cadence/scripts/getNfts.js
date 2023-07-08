export const getNfts = `
import Zail from 0x332ad228e7812d80
import NonFungibleToken from 0x631e88ae7f1d7c20

pub fun main(account: Address, currentAccount: Address): [AnyStruct] {
  let accountCollection = getAccount(account).getCapability(/public/ZailNftCollection)
                        .borrow<&Zail.Collection{NonFungibleToken.CollectionPublic, Zail.CollectionPublic}>()
                        ?? panic("cant get the user collection")

  let currentCollection = getAccount(currentAccount).getCapability(/public/ZailNftCollection)
                        .borrow<&Zail.Collection{NonFungibleToken.CollectionPublic, Zail.CollectionPublic}>()
                        ?? panic("cant get the current user collection")

  let returnVals: [AnyStruct] = []

  let ids = accountCollection.getIDs()
  let currentIds = currentCollection.getIDs()

  for id in ids {
    if currentIds!.contains(id) {
      returnVals.append(accountCollection.borrowEntireNft(id: id))
    } else {
      returnVals.append(accountCollection.borrowRestrictedNft(id: id))
    }
  }

  return  returnVals
}
`