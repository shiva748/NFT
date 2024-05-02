// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface Token {
    function mint(uint256 amount) external;

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}

contract AdvancedQuickNodeNFT is ERC721URIStorage, Ownable {
    uint256 public count_NFT = 0;
    bool private paused = false;
    address private tokenaddress;
    event CollectionCreated(
        uint256 indexed collectionId,
        string name,
        string description,
        address creator,
        uint256 limit,
        uint256 price,
        string uri
    );
    event Nftlisted(uint256 id, uint256 price);
    event NftUnlisted(uint256 indexed id);
    event NftPurchased(
        address indexed buyer,
        uint256 indexed id,
        uint256 price
    );
    event NFTMinted(
        uint256 indexed collectionId,
        uint256 tokenId,
        address owner
    );

    struct Collection {
        uint256 id;
        string name;
        string description;
        address creator;
        uint256[] tokenIds;
        uint256 limit;
        uint256 price;
        string uri;
    }
    mapping(address => bool) allowedCreators;
    mapping(uint256 => bool) locked;
    mapping(uint256 => Collection) private collections;
    uint256[] private createdCollectionIds;
    uint256 public nextCollectionId = 0;
    struct listing {
        uint256 price;
        bool flag;
    }
    mapping(uint256 => listing) public listed;

    function list(uint256 id, uint256 price) external {
        require(ownerOf(id) == msg.sender, "you dont own this nft");
        require(
            getApproved(id) == address(this),
            "Please approve us to transfer nft"
        );
        listed[id] = listing(price, true);
        emit Nftlisted(id, price);
    }

    function removeListing(uint256 id) public {
        require(ownerOf(id) == msg.sender, "You don't own this NFT");
        delete listed[id];
        emit NftUnlisted(id);
    }

    function BuyNft(uint256 id) external {
        require(listed[id].flag, "NFT is not available for sale");
        uint256 totalPrice = listed[id].price + 10000000000000000000;

        require(
            Token(tokenaddress).allowance(msg.sender, address(this)) >=
                totalPrice,
            "Please approve sufficient allowance"
        );

        require(
            Token(tokenaddress).transferFrom(
                msg.sender,
                address(this),
                10000000000000000000
            ),
            "Token transfer to contract failed"
        );

        require(
            Token(tokenaddress).transferFrom(
                msg.sender,
                ownerOf(id),
                listed[id].price
            ),
            "Token transfer to owner failed"
        );
        _safeTransfer(ownerOf(id), msg.sender, id);
        delete listed[id];
        emit NftPurchased(msg.sender, id, listed[id].price);
    }

    constructor(address token) ERC721("NFT's", "N") Ownable(msg.sender) {
        allowedCreators[msg.sender] = true;
        tokenaddress = token;
    }

    modifier onlyAllowedCreator() {
        require(
            allowedCreators[msg.sender],
            "Address is not allowed to create collections and mint NFTs"
        );
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    function pause() external onlyOwner {
        paused = true;
    }

    function unpause() external onlyOwner {
        paused = false;
    }

    function allowCreator(address _creator) external onlyOwner {
        allowedCreators[_creator] = true;
    }

    function disallowCreator(address _creator) external onlyOwner {
        allowedCreators[_creator] = false;
    }

    function createCollection(
        string calldata name,
        string calldata description,
        uint256 limit,
        uint256 price,
        string calldata uri
    ) external onlyAllowedCreator whenNotPaused {
        require(
            Token(tokenaddress).allowance(msg.sender, address(this)) >=
                1000000000000000000000,
            "Please approve allowance"
        );
        require(
            Token(tokenaddress).transferFrom(
                msg.sender,
                address(this),
                1000000000000000000000
            ),
            "transaction failed"
        );
        uint256[] memory emptyArray;
        collections[nextCollectionId] = Collection(
            nextCollectionId,
            name,
            description,
            msg.sender,
            emptyArray,
            limit,
            price,
            uri
        );
        createdCollectionIds.push(nextCollectionId);
        emit CollectionCreated(
            nextCollectionId,
            name,
            description,
            msg.sender,
            limit,
            price,
            uri
        );
        nextCollectionId++;
    }

    function mint_fromcollection(uint256 collectionId)
        external
        onlyAllowedCreator
        whenNotPaused
    {
        Collection storage cur = collections[collectionId];
        require(cur.tokenIds.length < cur.limit, "Collection limit reached");
        if (cur.creator != msg.sender) {
            require(
                Token(tokenaddress).allowance(msg.sender, address(this)) >=
                    cur.price + 100000000000000000000,
                "Please approve allowance"
            );
            require(
                Token(tokenaddress).transferFrom(
                    msg.sender,
                    address(this),
                    cur.price + 100000000000000000000
                ),
                "Transaction failed"
            );
        }
        _mint(msg.sender, count_NFT);
        _setTokenURI(count_NFT, cur.uri);
        addToCollection(collectionId, count_NFT);
        locked[count_NFT] = false;
        emit NFTMinted(collectionId, count_NFT, msg.sender);
        count_NFT++;
    }

    event NFTMinted(uint256 indexed tokenId, address indexed owner, string uri);

    function mintNft(string calldata uri)
        external
        onlyAllowedCreator
        whenNotPaused
    {
        require(
            Token(tokenaddress).allowance(msg.sender, address(this)) >=
                100000000000000000000,
            "Please approve allowance"
        );
        require(
            Token(tokenaddress).transferFrom(
                msg.sender,
                address(this),
                100000000000000000000
            ),
            "Transaction failed"
        );
        _mint(msg.sender, count_NFT);
        _setTokenURI(count_NFT, uri);

        emit NFTMinted(count_NFT, msg.sender, uri);

        count_NFT++;
    }

    function addToCollection(uint256 collectionId, uint256 tokenId)
        internal
        onlyAllowedCreator
    {
        require(
            ownerOf(tokenId) == msg.sender,
            "You are not the owner of this token"
        );
        collections[collectionId].tokenIds.push(tokenId);
    }

    function toggleLock(uint256 tokenid) external whenNotPaused {
        require(ownerOf(tokenid) == msg.sender, "you are not the owner of NFT");
        locked[tokenid] = !locked[tokenid];
    }

    function transfer(uint256 tokenid, address to) external whenNotPaused {
        require(ownerOf(tokenid) == msg.sender, "you are not the owner");
        require(locked[tokenid] == false, "NFT is locked");
        _transfer(msg.sender, to, tokenid);
    }

    function getCreatedCollections(uint256 id)
        external
        view
        returns (Collection memory)
    {
        return collections[id];
    }

    function widthdraw() external onlyOwner {
        uint256 balance = Token(tokenaddress).balanceOf(address(this));
        Token(tokenaddress).transfer(msg.sender, balance);
    }
}
