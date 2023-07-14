export const getSetup = `
import Zail from 0x332ad228e7812d80
import NonFungibleToken from 0x631e88ae7f1d7c20

pub fun main(account: Address): [AnyStruct] {
  let accountCollection = getAccount(account).getCapability(/public/ZailNftCollection)
                        .borrow<&Zail.Collection{NonFungibleToken.CollectionPublic, Zail.CollectionPublic}>()
                        ?? panic("cant get the user collection")
  
  let returnVals: [AnyStruct] = []
  return returnVals
}
`