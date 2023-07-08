export const setupTx = `
import Zail from 0x332ad228e7812d80
import NonFungibleToken from 0x631e88ae7f1d7c20
import FlowToken from 0x7e60df042a9c0868
import FungibleToken from 0x9a0766d93b6608b7

transaction {

  prepare(sender: AuthAccount) {
    sender.save(<- Zail.createEmptyCollection(), to: /storage/ZailNftCollection)
    sender.link<&Zail.Collection{Zail.CollectionPublic, NonFungibleToken.CollectionPublic}>(/public/ZailNftCollection, target: /storage/ZailNftCollection)
    sender.link<&Zail.Collection>(/private/ZailNftCollection, target: /storage/ZailNftCollection)

    let ZailNftCollection = sender.getCapability<&Zail.Collection>(/private/ZailNftCollection)
    let FlowTokenVault = sender.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)

    sender.save(<- Zail.createSaleCollection(MyNftCollection: ZailNftCollection, FlowTokenVault: FlowTokenVault), to: /storage/ZailSaleCollection)
    sender.link<&Zail.SaleCollection{Zail.SaleCollectionPublic}>(/public/ZailSaleCollection, target: /storage/ZailSaleCollection)
  }

  execute {
    log("User stored a collection")
  }
}
`