// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


interface IDojojiNFT {
    function balanceOf(address) external view returns (uint256);
    function isEnlightened(address) external view returns (bool);
}
interface IUniV3 {
    function balanceOf(address) external view returns (uint256);
   function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
}

contract Dojoji is ERC20, IERC721Receiver,Ownable,ReentrancyGuard {
    
   
    address dojoji_NFT;
    address meditationRewardsAddress;
    address UniV3LP;
    bool isLocked;

    uint256 MAX_TOTAL_SUPPLY = 108 * 10**9;
    uint meditationFee = 2;
    uint burnFee = 5;
    uint holderFee= 1;
    uint _enlightenedFee= 0;
    bool _openDojoji = false;

    mapping(address => bool) public isBot;
    uint256 univ3LockTime;
    
   

    constructor(address _meditationRewardsAddress, address _dojoji_nft) ERC20("Dojoji Bell", "DOJOJI") {
        meditationRewardsAddress = _meditationRewardsAddress;
        dojoji_NFT = _dojoji_nft;
            
        _mint(owner(), MAX_TOTAL_SUPPLY);
       
    }
       
  function onERC721Received( address operator, address from, uint256 tokenId, bytes calldata data ) public override returns (bytes4) {
           
           require(
            operator != address(0),
            "Dojoji UniswapV3 ::onERC721Received: not a univ3 nft"
        );
           
            return this.onERC721Received.selector;
        }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address sender = msg.sender;
        uint dojojiFee;
        require(tx.origin == msg.sender, unicode"ಠ_ಠ");
        require(!isBot[sender] && !isBot[to],"no non frens allowed");
        if(msg.sender != owner()){
        require(_openDojoji,"The Bell has to ring more");

      if( IDojojiNFT(dojoji_NFT).balanceOf(msg.sender)>0){
          if(IDojojiNFT(dojoji_NFT).isEnlightened(sender)){
          dojojiFee = 100 - _enlightenedFee;
          }else{
              dojojiFee = 100 - holderFee;
          }
        }else{dojojiFee = 100 - burnFee - meditationFee ;}

        _burn(sender, (amount * burnFee)/100);
        _transfer(sender, meditationRewardsAddress, (amount * meditationFee)/100);
        _transfer(sender, to, (amount * dojojiFee)/100);
        }
        else{
            _transfer(sender, to, amount);
        }

        return true;
    }

    function openDojoji() external nonReentrant returns(bool){
        require(msg.sender == owner() || msg.sender == dojoji_NFT, "Not Dojoji Controller");
       _openDojoji = true;
       return _openDojoji;
    }
    
  
    function UniV3lock(uint256 tokenId) public nonReentrant onlyOwner {
        univ3LockTime = block.timestamp + 30 days;
       IUniV3(UniV3LP).safeTransferFrom(msg.sender, address(this), tokenId);
       isLocked= true;
    }

    function UniV3unlock(uint256 tokenId) public nonReentrant onlyOwner {
       require(univ3LockTime <  block.timestamp, "Lock Period isn't over") ;
       IUniV3(UniV3LP).safeTransferFrom( address(this), owner(), tokenId);
       isLocked= false;
    }

    function setUniV3Address(address _uniV3LP) public onlyOwner {
        UniV3LP = _uniV3LP;
    }

    function setmeditationRewardsAddress(address _meditationRewardsAddress) public onlyOwner {
        meditationRewardsAddress = _meditationRewardsAddress;
    }

    function setBurnFee(uint _burnFee) public onlyOwner {
        burnFee = _burnFee;
    }

    function setMeditationFee(uint _meditationFee) public onlyOwner {
        meditationFee = _meditationFee;
    }



}