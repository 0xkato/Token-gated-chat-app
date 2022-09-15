// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import { useAccount, useContract } from "wagmi";
import "hardhat/console.sol";

contract Mint is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("ChatPass", "Chat") {
    }

    event mintNewChatPassNFT(address sender, uint256 tokenId);

    // Mint a ERC721 token to the callers wallet
    function mintNewChatPass() public {
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        // the metadata
        _setTokenURI(newItemId, "data:application/json;base64,ewogICAgIm5hbWUiOiAiQ2hhdFBhc3MiLAogICAgImRlc2NyaXB0aW9uIjogIlRoaXMgTkZUIHdpbGwgYWxsb3cgeW91IHRvIHVzZSB1ciBzdXBlciBjaGF0IiwKICAgICJpbWFnZSI6ICJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSEJ5WlhObGNuWmxRWE53WldOMFVtRjBhVzg5SW5oTmFXNVpUV2x1SUcxbFpYUWlJSFpwWlhkQ2IzZzlJakFnTUNBek5UQWdNelV3SWo0S0lDQWdJRHh6ZEhsc1pUNHVZbUZ6WlNCN0lHWnBiR3c2SUhkb2FYUmxPeUJtYjI1MExXWmhiV2xzZVRvZ2MyVnlhV1k3SUdadmJuUXRjMmw2WlRvZ01UUndlRHNnZlR3dmMzUjViR1UrQ2lBZ0lDQThjbVZqZENCM2FXUjBhRDBpTVRBd0pTSWdhR1ZwWjJoMFBTSXhNREFsSWlCbWFXeHNQU0ppYkdGamF5SWdMejRLSUNBZ0lEeDBaWGgwSUhnOUlqVXdKU0lnZVQwaU5UQWxJaUJqYkdGemN6MGlZbUZ6WlNJZ1pHOXRhVzVoYm5RdFltRnpaV3hwYm1VOUltMXBaR1JzWlNJZ2RHVjRkQzFoYm1Ob2IzSTlJbTFwWkdSc1pTSStRMmhoZENCUVlYTnpQQzkwWlhoMFBnbzhMM04yWno0PSIKfQ==");
  
        _tokenIds.increment();

        emit mintNewChatPassNFT(msg.sender, newItemId);
    }
}