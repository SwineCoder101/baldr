// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import "../src/Token.sol";
import "../src/Escrow.sol";

contract TokenScript is Script {
    function setUp() public {}

    Escrow public escrow;
    Token public token;
    // address public DEPLOYER = 0xd1D1B8F0B6740fad9Fb4166EeEEFEDDB84770938;
    address public DEPLOYER = 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f;

    function run() public {
        // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast();

        token = new Token(DEPLOYER);
        escrow = new Escrow(DEPLOYER,address(token));

        vm.stopBroadcast();
    }
}
