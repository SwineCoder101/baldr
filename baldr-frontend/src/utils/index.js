import { useWriteContract } from 'wagmi'

export function createTrade (buyerAddress, tokenId, amount, price) {
    const tokenDetails = {
        tokenId: Number(tokenId),
        amount: Number(amount),
        price: Number(price)
    };

    console.log("awoejifjawelfjowaiejfawef");

    // const result =  writeContract({
    //     abi,
    //     address: '0x2da2d32ecdcb7c89b0fc435625b1052cddae2d5e',
    //     functionName: 'createTrade',
    //     args: [
    //         myAddress, tokenDetails
    //     ],
    // })

    console.log("create Trade 2222");

    console.log(
        buyerAddress, tokenDetails
    );
}