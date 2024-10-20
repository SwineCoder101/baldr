// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import "../src/Token.sol";
import "../src/Escrow.sol";

contract TokenScript is Script {
    function setUp() public {}

    // Escrow public escrow;
    // Token public token;

    address public constant OWNER = 0x0766AA63A1BCE9f8bd24c7Ca476AC78cAc570DD8;

    function run() public {
        // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast();

        // Token token = Token(0xd7407D2DfE8743E116f264031EC0bC790f55dBfD);
        Token token= Token(0xE72Fc88185eB7403eb730A430B8cd545662976fD);
        Escrow escrow = Escrow(0xd7407D2DfE8743E116f264031EC0bC790f55dBfD);

        token.mint(
          OWNER, 
          0, 
          100, 
          ""
        );

        // escrow = new Escrow(DEPLOYER,address(token));
        token.setApprovalForAll(address(escrow), true);

        vm.stopBroadcast();
    }
}

