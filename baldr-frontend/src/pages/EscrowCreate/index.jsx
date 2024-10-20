import { Wrapper, Form, Label, Input, CreateTradeButton } from "./style";
import SubTopBar from "../../components/SubTopBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MY_WALLET_ADDRESS, ROUTE_PATH } from "../../common/const";
import { truncateText } from "../../common/commons";

const EscrowCreatePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    game: "Maple Story",
    sellerAddress: MY_WALLET_ADDRESS,
    nftContractAddress: "0xcf7c359ff84e540f",
    nftTokenId: "NFT_TOKEN_ID",
    buyerAddress: "",
    price: "",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateTrade = () => {
    console.log("Trade Data:", formData);
    alert("Trade");
    navigate(ROUTE_PATH.ESCROW_LIST);
  };

  return (
    <>
      <SubTopBar />

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
          <Input type="text" name="nftTokenId" value={formData.nftTokenId} readOnly />

          <Label>Buyer Address</Label>
          <Input
            type="text"
            name="buyerAddress"
            value={formData.buyerAddress}
            onChange={handleInputChange}
            placeholder="Your Wallet Addres"
          />

          <Label>Price</Label>
          <Input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
          />

          <Label>Amount</Label>
          <Input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="Amount"
          />

          <CreateTradeButton onClick={handleCreateTrade}>Create Trade</CreateTradeButton>
        </Form>
      </Wrapper>
    </>
  );
};

export default EscrowCreatePage;
