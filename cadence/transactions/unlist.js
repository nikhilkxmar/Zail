export const unlistNftTx = `
import Zail from 0x332ad228e7812d80

transaction(id: UInt64) {

  prepare(sender: AuthAccount) {
    let saleCollection = sender.borrow<&Zail.SaleCollection>(from: /storage/ZailSaleCollection)
        ?? panic("sale collection doesnt exist")
    saleCollection.unlistFromSale(id: id)
  }

  execute {
    log("User unlisted a Nft from Sale")
  }
}

`