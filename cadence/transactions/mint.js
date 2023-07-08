export const mint = `
import Zail from 0x332ad228e7812d80

transaction(_category: String, _title: String, _description: String, _thumbnail: String, _author: String, _narrator: String, _restrictedAudio: String, _completeAudio: String) {

  prepare(sender: AuthAccount) {
    let collection = sender.borrow<&Zail.Collection>(from: /storage/ZailNftCollection)
                            ?? panic("This collection doesnt exists")
    let nft <- Zail.createToken(_category: _category, 
                                        _title: _title, 
                                        _summary: _description, 
                                        _thumbnail: _thumbnail, 
                                        _author: _author,
                                         _authorAddress: sender.address,
                                        _narrator: _narrator,
                                        _restrictedAudio: _restrictedAudio,
                                        _completeAudio: _completeAudio,
                                        _list: true) 
    collection.deposit(token: <- nft)
  }

  execute {
    log("Nft Minted")
  }
}
`