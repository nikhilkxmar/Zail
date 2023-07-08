export const listTx = `
import FlowToken from 0x7e60df042a9c0868
import FungibleToken from 0x9a0766d93b6608b7
import Zail from 0x332ad228e7812d80

transaction(id: UInt64, price: UFix64) {

  prepare(sender: AuthAccount) {
    let saleCollection = sender.borrow<&Zail.SaleCollection>(from: /storage/ZailSaleCollection)
                            ?? panic("sale collection doesnt exist")
    saleCollection.listForSale(id: id, price: price)
  }

  execute {
    log("User stored a Sale collection")
  }
}
`