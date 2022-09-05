/**
 *Submitted for verification at Etherscan.io on 2022-06-24
*/


// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;
import "./ERC5050.sol";


interface IToken {
    function balanceOf(address) external view returns (uint256);
}
interface IDojoji {
    function openDojoji() external  returns(bool);
}


contract DojojiBell is ERC721A, ERC5050, Ownable, ReentrancyGuard {  
    using Strings for uint256;
    string public _bells;
    string public _enlightenOnes;
    string public mycelianTruth = unicode"つ◕_◕つ 🍄";
    bool public TempleOpened = true;
    uint256 public bells = 3333;
    uint256 public enligthenedOnes = 333;
    uint256 public  MaxRing= 2;
    uint256 public grewUpOnTheDead = 0;
    uint256 public bellsMintLimit = 1;
    bool public teamMinted = false;
    bool public openERC20 = false;

    uint256 public _totalRings = 0;
     uint256 public _totalaction = 0;
    mapping(uint256 => uint256) public userTotalRings;
    mapping(uint256 => uint256) public userTotalPrays;
    mapping(uint256 => uint256) public userPraySinceRing;
    mapping(address => bool) public claimStatuses;
    mapping(address => bool) public hasBell;
    mapping(address => uint256) public bellCounter;
    mapping(address => uint256) public originalRinger;
    mapping(uint256 => bool) public sporeMushrooms;
    mapping(uint256 => bool) public magicMushrooms;
    mapping(uint256 => uint256) public prayCooldown;
    mapping(uint256 => bool) public _isEnlightened;

    address dojojiERC20;
    bytes public constant DATA =  hex"001011";
    bytes4 public constant RING_SELECTOR = bytes4(keccak256("ring"));
    bytes4 public constant PRAY_SELECTOR = bytes4(keccak256("pray"));

    uint256 constant BELL_PRICE = 0.0333 ether;
    uint256 constant ENGLIGHTENED_PRICE = 0.3333 ether;

    Action public ring;
    Action public pray;   
    Object public userfrom;
    Object public userto;
    event MushroomEaten(uint bellId);

	constructor() ERC721A("Dojoji Bell", "MONKs") {
        _registerSendable("pray");
        _registerSendable("ring");
        _registerReceivable("pray");
        _registerReceivable("ring");
    }

    address constant internal dojoji_grave = 0x000000000000000000000000000000000000dEaD;
    address constant internal goblintown_address = 0xbCe3781ae7Ca1a5e050Bd9C4c77369867eBc307e;
    address constant internal hyperloot_address = 0x0290d49f53A8d186973B82faaFdaFe696B29AcBb;
    


    function _baseURI() internal view virtual override returns (string memory) {
        return _bells;
    }

    function _enlightenedURI() internal view virtual returns (string memory) {
        return _enlightenOnes;
    }


    // for cc0 frens つ◕_◕つ 🍄
 	function claimBell() external nonReentrant {
  	    uint256 bellId = totalSupply();
        require(TempleOpened, "The temple isn't opened");
        require(bellId < bells, "No bells left...");
        require(msg.sender == tx.origin);
    	require(!claimStatuses[msg.sender], "Bell already claimed");
        require(
            IToken(goblintown_address).balanceOf(msg.sender) > 0 
           
        );
        _safeMint(msg.sender, 1);
        claimStatuses[msg.sender] = true;
        sporeMushrooms[bellId] = true;
    }

    //  🙏🏻🙏🙏🏻
    function mintBell() external payable nonReentrant mintConditions(1) {
        uint256 bellId = totalSupply();
         require(TempleOpened, "The Quest for enlightment han't begun");
        require(!hasBell[msg.sender], "User already has a Bell");
        require(msg.value >= BELL_PRICE, unicode"Wow, pls attach 0.0333 ether per bell");
        _safeMint(msg.sender, 1);
         _totalRings++;
        userTotalRings[bellId]++;
        hasBell[msg.sender] = true;
        originalRinger[msg.sender]= bellId;
    }


    // 
    function mintEnlightened() external payable nonReentrant {
        uint256 bellId = totalSupply();
        require(TempleOpened, "The Quest for enlightment han't begun");
        require(enligthenedOnes > 0, "The enligthened Ones have reached te maximum");
        require(bellId < bells, "No bells left...");
        require(msg.sender == tx.origin);
        require(msg.value >= ENGLIGHTENED_PRICE, unicode"Royal Shrooms requiring つ◕_◕つ 0.31337 ether");
        _safeMint(msg.sender, 1);
           _totalRings++;
           userTotalRings[bellId]++;
        enligthenedOnes -= 1;
        hasBell[msg.sender] = true;
         originalRinger[msg.sender]= bellId;
        _isEnlightened[bellId] = true;

    }
   


    function ringBell()
        external
        payable
        
    {
        userfrom = Object({
            _address: msg.sender,
            _tokenId: originalRinger[msg.sender]

        });
          userto = Object({
            _address: address(this),
            _tokenId: originalRinger[msg.sender]

        });
          
       ring = Action(
        {
            selector: RING_SELECTOR,
            user: msg.sender,
            from: userfrom,
            to: userto,
            state: address(this),
            data: DATA
        }
    );

    _sendAction(ring);
    }
    
    function sendPray()
        external
        payable
        
    {
        userfrom = Object({
            _address: msg.sender,
            _tokenId: originalRinger[msg.sender]

        });
          userto = Object({
            _address: address(this),
            _tokenId: originalRinger[msg.sender]

        });
          
       pray = Action(
        {
            selector: PRAY_SELECTOR,
            user: msg.sender,
            from: userfrom,
            to: userto,
            state: address(this),
            data: DATA
        }
    );

   
    _sendAction(pray);
    }
function sendAction(Action memory action)
        external
        payable
        override
        onlySendableAction(action)
    {
        require(
            msg.sender == ownerOf(action.from._tokenId),
            "Spells: invalid sender"
        );
        _sendAction(action);
    }




    // 🔮
    function onActionReceived(Action calldata action,  uint256 _nonce)
        external
        payable
        override
       onlyReceivableAction(action, _nonce)
    {  
       
        require(action.selector == RING_SELECTOR|| action.selector == PRAY_SELECTOR, "Dojoji: invalid action.selector");
        if (action.selector == RING_SELECTOR){
            require(action.user == ownerOf(action.to._tokenId), "Dojoji: sender not owner of this bell");
    
            require(userPraySinceRing[action.to._tokenId] > 2, "Sender must pray more");

            _totalRings++;
           userTotalRings[action.to._tokenId]++;
           userPraySinceRing[action.to._tokenId] -= 3;

           if(userTotalRings[action.to._tokenId] > 24 && enligthenedOnes > 0 ){
            _isEnlightened[action.to._tokenId] = true;
            enligthenedOnes -= 1;}

          if(_totalRings>= MaxRing && !openERC20){
               IDojoji(dojojiERC20).openDojoji();
               openERC20= true;

          } 

        }
        if (action.selector == PRAY_SELECTOR){
            require(action.user == ownerOf(action.to._tokenId), "Dojoji: sender not owner of this bell");
            require( prayCooldown[action.to._tokenId] < block.timestamp , "Must wait 3 hours before pray");
           
            userPraySinceRing[action.to._tokenId] +=1;
            userTotalPrays[action.to._tokenId] +=1;
            prayCooldown[action.to._tokenId] = block.timestamp + 2 seconds;
        }
      
    }

    function isEnlightened(address user) external view returns (bool){
       uint256 bellId = originalRinger[user];
        return  _isEnlightened[bellId];
    }

    // つ◕_◕つ 💬
    function broadcastMycelialMessage (uint256 bellId, string calldata message) public {
        require(msg.sender == ownerOf(bellId), "Mushrooms: sender not owner");
        require(_isEnlightened[bellId], "Bell isn't Enlightened");
        mycelianTruth = message;
    }

    // 🔔 
 	function teamHarvest(uint256 _bell) public onlyOwner {
        require(!teamMinted);
  	    uint256 totalmushrooms = totalSupply();
	    require(totalmushrooms + _bell <= bells);
        _safeMint(msg.sender, _bell);
        teamMinted = true;
    }

    // つ◕_◕つ 🍄
    function startMushroomization(bool _mushroomization) external onlyOwner {
        TempleOpened = _mushroomization;
    }

     // つ◕_◕つ 🍄
    function visualize(string memory link) external onlyOwner {
        _bells = link;
    }

    // つ◕_◕つ 🔮
    function doSomethingMagic(string memory magicLink) external onlyOwner {
        _enlightenOnes = magicLink;
    }

    // つ◕_◕つ thought to rename but deployed to blockchain how it was in goblintown
    function sumthinboutfunds() public payable onlyOwner {
	(bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
		require(success);
	}

    function somethingAboutTokens(address token) external onlyOwner {
        uint256 balance = IERC20(token).balanceOf(address(this));
        IERC20(token).transfer(msg.sender, balance);
    }

    function setDojojiAddress(address _dojoji) external onlyOwner {
        dojojiERC20 = _dojoji;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        string memory enlightenedURI = _enlightenedURI();
        if (magicMushrooms[_tokenId] && bytes(enlightenedURI).length != 0) {
            return string(abi.encodePacked(enlightenedURI, _tokenId.toString()));
        }
        else {
            return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, _tokenId.toString())) : '';
        }
    }

    modifier mintConditions(uint256 _bell) {
        require(TempleOpened, "Mushroomization isn't started");
        require(totalSupply() + _bell <= bells, "No bells left...");
        require(tx.origin == msg.sender, unicode"ಠ_ಠ");
        _;
    }
}





