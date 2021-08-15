pragma solidity 0.5.0;

import "./ERC721Full.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract SelfieTokenizer is ERC721Full, Ownable {
    
    uint256 currentSupply;
    uint256 public constant peakCapacity = 100;

    mapping(uint256 => bool) _tokenExists;

    constructor() ERC721Full("Selfie NFT", "Selfie") public {
        currentSupply = 0;
    }

    function mint(string memory tokenURI, uint256 tokenId) payable public returns (bool)  {
        require(!_tokenExists[tokenId], "Advertisement slot position unavailable. Please try a different slot position!");
        require(currentSupply < peakCapacity, "No more advertising space available on the BlockchainBillboard. Peak capacity!");

        uint256 payment = msg.value;

        if (tokenId == 2 || tokenId == 14 || tokenId == 22 || tokenId == 34 || tokenId == 42 || tokenId == 54 || tokenId == 62 || tokenId == 74 || tokenId == 82 || tokenId == 94) {         // INITIAL TOKEN OFFERING
            require(payment == 0, "Invalid payment. This token must be issued for FREE!");
            _mint(msg.sender, tokenId);
            _setTokenURI(tokenId, tokenURI);
            _tokenExists[tokenId] = true;
            currentSupply += 1;
            return true;
        }

        if (0 < tokenId && tokenId <= 10) {                                                                                                                 // STANDARD PRICING
            require(payment == 5000000000000000000, "Invalid payment. Please consider issuing from the BlockchainBillboard.");
        } else if (10 < tokenId && tokenId <= 20) {
            require(payment == 4500000000000000000, "Invalid payment. Please consider issuing from the BlockchainBillboard.");
        } else if (20 < tokenId && tokenId <= 30) {
            require(payment == 4000000000000000000, "Invalid payment. Please consider issuing from the BlockchainBillboard.");
        } else if (30 < tokenId && tokenId <= 40) {
            require(payment == 3500000000000000000, "Invalid payment. Please consider issuing from the BlockchainBillboard.");
        } else if (40 < tokenId && tokenId <= 50) {
            require(payment == 3000000000000000000, "Invalid payment. Please consider issuing from the BlockchainBillboard.");
        } else if (50 < tokenId && tokenId <= 60) {
            require(payment == 2500000000000000000, "Invalid payment. Please consider issuing from the BlockchainBillboard.");
        } else if (60 < tokenId && tokenId <= 70) {
            require(payment == 2000000000000000000, "Invalid payment. Please consider issuing from the BlockchainBillboard.");
        } else if (70 < tokenId && tokenId <= 80) {
            require(payment == 1500000000000000000, "Invalid payment. Please consider issuing from the BlockchainBillboard.");
        } else if (80 < tokenId && tokenId <= 90) {
            require(payment == 1000000000000000000, "Invalid payment. Please consider issuing from the BlockchainBillboard.");
        } else if (90 < tokenId && tokenId <= 100) {
            require(payment == 500000000000000000, "Invalid payment. Please consider issuing from the BlockchainBillboard.");         
        } else {
            revert("Invalid advertisement slot position.");
        }

        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        _tokenExists[tokenId] = true;
        currentSupply += 1;
        return true;
    }

    function withdraw() payable onlyOwner public {
        msg.sender.transfer(address(this).balance);
    }

}
