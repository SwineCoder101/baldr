import { Wrapper, Form, Label, Input, CreateTradeButton } from "./style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MY_WALLET_ADDRESS, ROUTE_PATH } from "../../common/const";
import { truncateText } from "../../common/commons";
import LogoTopBar from "../../components/LogoTopBar";
import { createTrade } from "../../utils";
import { useWriteContract } from "wagmi";

const EscrowCreatePage = () => {
  const navigate = useNavigate();

  const { writeContract } = useWriteContract();

  const [formData, setFormData] = useState({
    game: "Maple Story",
    sellerAddress: MY_WALLET_ADDRESS,
    nftContractAddress: "0xcf7c359ff84e540f",
    buyerAddress: "",
    tokenId: 99,
    price: 0,
    amount: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateTrade = () => {
    console.log("create Trade");
    const buyerAddress = formData.buyerAddress;
    const tokenDetails = {
      tokenId: formData.tokenId,
      amount: formData.amount,
      price: formData.price,
    };

    // const result = writeContract({
    //     abi,
    //     address: '0x2da2d32ecdcb7c89b0fc435625b1052cddae2d5e',
    //     functionName: 'createTrade',
    //     args: [
    //       buyerAddress, tokenDetails
    //     ],
    // })

    console.log(buyerAddress, tokenDetails);

    navigate(ROUTE_PATH.ESCROW_LIST);
  };

  return (
    <>
      <LogoTopBar />

      <Wrapper>
        <div id="title">Create Escrow</div>

        <Form>
          <Label>Game</Label>
          <Input type="text" value={formData.game} readOnly />

          <Label>Seller Address</Label>
          <Input type="text" value={truncateText(formData.sellerAddress, 24)} readOnly />

          <Label>NFT Contract Address</Label>
          <Input type="text" value={formData.nftContractAddress} readOnly />

          <Label>NFT Token ID</Label>
          <Input type="text" name="nftTokenId" value={formData.tokenId} readOnly />

          <Label>Buyer Address</Label>
          <Input
            type="text"
            name="buyerAddress"
            value={formData.buyerAddress}
            onChange={handleInputChange}
            placeholder="Your Wallet Addres"
          />

          <Label>Price</Label>
          <Input type="text" name="price" onChange={handleInputChange} placeholder="Price" />

          <Label>Amount</Label>
          <Input type="text" name="amount" onChange={handleInputChange} placeholder="Amount" />

          <CreateTradeButton onClick={handleCreateTrade}>Create Trade</CreateTradeButton>
        </Form>
      </Wrapper>
    </>
  );
};

export default EscrowCreatePage;
