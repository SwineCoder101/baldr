import { Wrapper, Form, Label, Input, CreateTradeButton } from "./style";
import LogoTopBar from "../../components/LogoTopBar";
import BottomNavBar from "../../components/BottomNavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../common/const";

const EscrowCreatePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    game: "Maple Story",
    sellerAddress: "0xa63e4f21a7ce5a96",
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
    navigate(ROUTE_PATH.ESCROW_LIST);
  };

  return (
    <>
      <LogoTopBar />

      <Wrapper>
        <Form>
          <Label>Game</Label>
          <Input type="text" value={formData.game} readOnly />

          <Label>Seller Address</Label>
          <Input type="text" value={formData.sellerAddress} readOnly />

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
          />

          <Label>Price</Label>
          <Input type="text" name="price" value={formData.price} onChange={handleInputChange} />

          <Label>Amount</Label>
          <Input type="text" name="amount" value={formData.amount} onChange={handleInputChange} />

          <CreateTradeButton onClick={handleCreateTrade}>Create Trade</CreateTradeButton>
        </Form>
      </Wrapper>

      <BottomNavBar />
    </>
  );
};

export default EscrowCreatePage;
