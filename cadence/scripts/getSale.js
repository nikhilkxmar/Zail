export const getSaleNfts = `
import Zail from 0x332ad228e7812d80
import NonFungibleToken from 0x631e88ae7f1d7c20


pub fun main(account: Address): {UInt64: Zail.SaleItem} {
    let saleCollection = getAccount(account).getCapability(/public/ZailSaleCollection)
                        .borrow<&Zail.SaleCollection{Zail.SaleCollectionPublic}>()
                        ?? panic("Could not borrow the user's SaleCollection")

    let collection =  getAccount(account).getCapability(/public/ZailNftCollection) 
                      .borrow<&Zail.Collection{NonFungibleToken.CollectionPublic, Zail.CollectionPublic}>()
                      ?? panic("Can't get the User's collection.")

    let saleIds = saleCollection.getIds()

    let returnVals: {UInt64: Zail.SaleItem} = {}

    for saleID in saleIds {
        let price = saleCollection.getPrice(id: saleID)
        let nftRef = collection.borrowRestrictedNft(id: saleID)
        returnVals.insert(key: nftRef.id, Zail.SaleItem(_price: price, _ref: nftRef))
    }

    return returnVals
}
`