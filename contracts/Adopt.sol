// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Adopt is ERC721URIStorage, PaymentSplitter, Ownable {
    uint256 adoptionCost = 10000000000000000;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(
        string memory _name,
        string memory _symbol,
        address[] memory payees,
        uint256[] memory shares
    ) ERC721(_name, _symbol) PaymentSplitter(payees, shares) {}

    function updateCost(uint256 cost) public onlyOwner {
        adoptionCost = cost;
    }

    function getCost() public view returns (uint256) {
        return adoptionCost;
    }

    function getNFTCost() public view returns (uint256) {
        return adoptionCost;
    }

    function mintNFT(address recipient, string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        require(msg.value == adoptionCost, "Not enough ETH sent.");

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
