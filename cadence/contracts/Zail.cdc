import FlowToken from 0x7e60df042a9c0868
import FungibleToken from 0x9a0766d93b6608b7
import MetadataViews from 0x631e88ae7f1d7c20
import NonFungibleToken from 0x631e88ae7f1d7c20

pub contract Zail: NonFungibleToken {

  pub var totalSupply: UInt64
  pub var mintCount: {UInt64: [UInt64]}

  pub event ContractInitialized()
  pub event Withdraw(id: UInt64, from: Address?)
  pub event Deposit(id: UInt64, to: Address?)

  pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {
    pub let id: UInt64
    pub let category: String
    pub let title: String
    pub let summary: String
    pub let thumbnail: String
    pub let author: String
    pub let authorAddress: Address
    pub let narrator: String
    pub let restrictedAudio: String
    pub let completeAudio: String
    pub let publishDate: UFix64
    pub let list: Bool

    pub fun getViews(): [Type] {
      let supportedViews: [Type] = []
      return supportedViews
    }

    pub fun resolveView(_ view: Type): AnyStruct? {
      return nil
    }

    init(_category: String, _title: String, _summary: String, _thumbnail: String, _author: String, _authorAddress: Address, _narrator: String, _restrictedAudio: String, _completeAudio: String, _list: Bool) {
      self.id = Zail.totalSupply
      Zail.totalSupply = Zail.totalSupply + 1
      Zail.mintCount[self.id] = []
      self.category = _category
      self.title = _title
      self.summary = _summary
      self.thumbnail = _thumbnail
      self.author = _author
      self.authorAddress = _authorAddress
      self.narrator = _narrator
      self.restrictedAudio = _restrictedAudio
      self.completeAudio = _completeAudio
      self.publishDate = getCurrentBlock().timestamp
      self.list = _list
    }
  }

  pub struct Data {
    pub let id: UInt64
    pub let category: String
    pub let title: String
    pub let summary: String
    pub let thumbnail: String
    pub let author: String
    pub let authorAddress: Address
    pub let narrator: String
    pub let restrictedAudio: String
    pub let completeAudio: String
    pub let publishDate: UFix64
    pub let list: Bool

    init(_id: UInt64, _category: String, _title: String, _summary: String, _thumbnail: String, _author: String, _authorAddress: Address, _narrator: String, _restrictedAudio: String, _completeAudio: String, _publishDate: UFix64, _list: Bool) {
      self.id = _id
      self.category = _category
      self.title = _title
      self.summary = _summary
      self.thumbnail = _thumbnail
      self.author = _author
      self.authorAddress = _authorAddress
      self.narrator = _narrator
      self.restrictedAudio = _restrictedAudio
      self.completeAudio = _completeAudio
      self.publishDate = _publishDate
      self.list = _list
    }
  }

  pub struct RestrictedData {
    pub let id: UInt64
    pub let category: String
    pub let title: String
    pub let summary: String
    pub let thumbnail: String
    pub let author: String
    pub let authorAddress: Address
    pub let narrator: String
    pub let restrictedAudio: String
    pub let publishDate: UFix64
    pub let list: Bool

    init(_id: UInt64, _category: String, _title: String, _summary: String, _thumbnail: String, _author: String, _authorAddress: Address, _narrator: String, _restrictedAudio: String, _publishDate: UFix64, _list: Bool) {
      self.id = _id
      self.category = _category
      self.title = _title
      self.summary = _summary
      self.thumbnail = _thumbnail
      self.author = _author
      self.authorAddress = _authorAddress
      self.narrator = _narrator
      self.restrictedAudio = _restrictedAudio
      self.publishDate = _publishDate
      self.list = _list
    }
  }

  pub resource interface CollectionPublic {
    pub fun borrowEntireNft(id: UInt64): &Zail.NFT
    pub fun borrowRestrictedNft(id: UInt64): Zail.RestrictedData
  }

  pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, CollectionPublic {
      pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}
      pub var dataSets: {UInt64: Zail.Data}

      pub fun deposit(token: @NonFungibleToken.NFT) {
        let myToken <- token as! @Zail.NFT
        emit Deposit(id: myToken.id, to: self.owner?.address)
        self.dataSets[myToken.id] = Zail.Data(_id: myToken.id, 
                                              _category: myToken.category, 
                                              _title: myToken.title, 
                                              _summary: myToken.summary, 
                                              _thumbnail: myToken.thumbnail, 
                                              _author: myToken.author,
                                              _authorAddress: myToken.authorAddress,
                                              _narrator: myToken.narrator,
                                              _restrictedAudio: myToken.restrictedAudio,                                                      
                                              _completeAudio: myToken.completeAudio, 
                                              _publishDate: myToken.publishDate,
                                              _list: myToken.list)
        self.ownedNFTs[myToken.id] <-! myToken      
      }

      pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
        let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("NFT Doesnt Exists")
        emit Withdraw(id: withdrawID, from: self.owner?.address)
        return <- token
      }

      pub fun getIDs(): [UInt64] {
        return self.ownedNFTs.keys
      }

      pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
        return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
      }

      pub fun borrowEntireNft(id: UInt64): &Zail.NFT {
        let reference = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)! 
        return reference as! &Zail.NFT
      }

      pub fun borrowViewResolver(id: UInt64): &AnyResource{MetadataViews.Resolver} {
        let reference = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)! 
        let resolver = reference as! &Zail.NFT
        return resolver as &AnyResource{MetadataViews.Resolver}
      }

      pub fun borrowRestrictedNft(id: UInt64): Zail.RestrictedData {
        let ref = self.dataSets[id]! 
        let postData: Zail.RestrictedData = RestrictedData(_id: ref.id, 
                                                          _category: ref.category, 
                                                          _title: ref.title, 
                                                          _summary: ref.summary, 
                                                          _thumbnail: ref.thumbnail, 
                                                          _author: ref.author,
                                                          _authorAddress: ref.authorAddress,
                                                          _narrator: ref.narrator,
                                                          _restrictedAudio: ref.restrictedAudio,                                                      
                                                          _publishDate: ref.publishDate,
                                                          _list: ref.list)
        return postData as! Zail.RestrictedData
      }

      init() {
        self.ownedNFTs <- {}
        self.dataSets = {}
      }

      destroy() {
        destroy self.ownedNFTs
      }
  }

  pub fun createEmptyCollection(): @Collection {
    return <- create Collection()
  }

  pub fun createToken(_category: String, _title: String, _summary: String, _thumbnail: String, _author: String, _authorAddress: Address, _narrator: String, _restrictedAudio: String, _completeAudio: String, _list: Bool): @Zail.NFT {
    return <- create NFT(_category: _category, 
                         _title: _title, 
                         _summary: _summary, 
                         _thumbnail: _thumbnail, 
                         _author: _author,
                         _authorAddress: _authorAddress,
                         _narrator: _narrator,
                         _restrictedAudio: _restrictedAudio,                                                      
                         _completeAudio: _completeAudio,
                         _list: _list) 
  }

  pub struct SaleItem {
    pub let price: UFix64
    pub let ref: Zail.RestrictedData

    init(_price: UFix64, _ref: Zail.RestrictedData) {
      self.price = _price
      self.ref = _ref
    }
  }

  pub resource interface SaleCollectionPublic {
    pub fun getIds(): [UInt64]
    pub fun getPrice(id: UInt64): UFix64 
    pub fun purchase(id: UInt64, recipientCollection: &Zail.Collection{NonFungibleToken.CollectionPublic}, payment: @FlowToken.Vault)
  }

  pub resource SaleCollection: SaleCollectionPublic {
    pub var forSale: {UInt64: UFix64}
    pub let MyNftCollection: Capability<&Zail.Collection>
    pub let FlowTokenVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>


    pub fun listForSale(id: UInt64, price: UFix64) {
      pre {
        price >= 0.0: "Price is not valid"
        self.MyNftCollection.borrow()!.getIDs().contains(id): "Not in the user's collection"
        self.MyNftCollection.borrow()!.borrowEntireNft(id: id).list : "Cannot list item"
      }

      self.forSale[id] = price
    }

    pub fun unlistFromSale(id: UInt64) {
      self.forSale.remove(key: id)
    }
  
    pub fun purchase(id: UInt64, recipientCollection: &Zail.Collection{NonFungibleToken.CollectionPublic}, payment: @FlowToken.Vault) {
      pre {
        payment.balance == self.forSale[id]: "Incorrect payment"
      }

      let ref: &Zail.NFT = self.MyNftCollection.borrow()!.borrowEntireNft(id: id) 
      let token <- create Zail.NFT(_category: ref.category, 
                                           _title: ref.title, 
                                           _summary: ref.summary, 
                                           _thumbnail: ref.thumbnail, 
                                           _author: ref.author,
                                           _authorAddress: ref.authorAddress,
                                           _narrator: ref.narrator,
                                           _restrictedAudio: ref.restrictedAudio,                                                      
                                           _completeAudio: ref.completeAudio,
                                           _list: false)
      Zail.mintCount[id]?.append(token.id)
      recipientCollection.deposit(token: <- token)  
      self.FlowTokenVault.borrow()!.deposit(from: <- payment)
    }

    pub fun getPrice(id: UInt64): UFix64 {
      return self.forSale[id]!
    }

    pub fun getIds(): [UInt64] {
      return self.forSale.keys
    }


    init(_MyNftCollection: Capability<&Zail.Collection>, _FlowTokenVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>) {
      self.forSale = {}
      self.FlowTokenVault = _FlowTokenVault
      self.MyNftCollection = _MyNftCollection
    }
  }

  pub fun createSaleCollection(MyNftCollection: Capability<&Zail.Collection>, FlowTokenVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>): @SaleCollection {
    return <- create SaleCollection(_MyNftCollection: MyNftCollection, _FlowTokenVault: FlowTokenVault)
  }

  pub fun getMintCount(id: UInt64): [UInt64] {
    return Zail.mintCount[id]!
  }

  pub fun getMintCountKeys(): [UInt64] {
    return Zail.mintCount.keys
  }

  init() {
    self.totalSupply = 0 
    self.mintCount = {}
  }
}