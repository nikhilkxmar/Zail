export const buyTx = `
import NonFungibleToken from 0x631e88ae7f1d7c20
import Zail from 0x332ad228e7812d80
import FlowToken from 0x7e60df042a9c0868

transaction(account: Address, id: UInt64) {

    prepare(sender: AuthAccount) {
        let saleCollection = getAccount(account).getCapability(/public/ZailSaleCollection)
                            .borrow<&Zail.SaleCollection{Zail.SaleCollectionPublic}>()
                            ?? panic("Could not borrow the user's SaleCollection")    

        let recipientCollection = getAccount(sender.address).getCapability(/public/ZailNftCollection).borrow<&Zail.Collection{NonFungibleToken.CollectionPublic}>()
                        ?? panic("Can't get the User's collection.")

        let price = saleCollection.getPrice(id: id)

        let payment <- sender.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!.withdraw(amount: price) as! @FlowToken.Vault

        saleCollection.purchase(id: id, recipientCollection: recipientCollection, payment: <- payment)    
    }

    execute {
        log("Purchased Nft")
    }
}
`