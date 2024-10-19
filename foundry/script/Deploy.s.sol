// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import "../src/Token.sol";
import "../src/Escrow.sol";

contract TokenScript is Script {
    function setUp() public {}

    Escrow public escrow;
    Token public token;
    address public DEPLOYER = 0x167d9b14C36EB55492faF39dD1f2ABe943f4bAb5;

    function run() public {
        uint256 deployerPrivateKey = 0xbc119e657cc6a1cb457ccbc152252b372f194013836fc4ff0e716aa6917c4480;


        vm.startBroadcast(deployerPrivateKey);

        token = new Token(DEPLOYER);
        escrow = new Escrow(DEPLOYER, address(token));

        vm.stopBroadcast();
    }
}

