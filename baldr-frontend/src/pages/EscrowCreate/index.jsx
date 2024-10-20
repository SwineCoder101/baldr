import { Wrapper, Form, Label, Input, CreateTradeButton } from "./style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NFT_CONTRACT_ADDRESS, ROUTE_PATH } from "../../common/const";
import { truncateText } from "../../common/commons";
import LogoTopBar from "../../components/LogoTopBar";
import { useWriteContract, useAccount } from 'wagmi'
import { fefe } from '../../components/abi'

const EscrowCreatePage = () => {

  const abi = fefe.abi

  const navigate = useNavigate();

  const { writeContract } = useWriteContract()
  const { address } = useAccount()

  console.log("my address: ", address);


  const [formData, setFormData] = useState({
    game: "Maple Story",
    sellerAddress: address,
    nftContractAddress: NFT_CONTRACT_ADDRESS,
    buyerAddress: "",
    tokenId: 99,
    price: 1,
    amount: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateTrade = async () => {
    console.log("create Trade");
    const buyerAddress = formData.buyerAddress;
    const tokenDetails = {
      tokenId: formData.tokenId,
      amount: formData.amount,
      price: formData.price,
    };

    const result = writeContract({
        abi,
        address: '0xca4944605e921f8f92e9b3071f92fc10e2ad3712',
        functionName: 'createTrade',
        args: [
          buyerAddress, tokenDetails
        ],
    })


    console.log(buyerAddress, tokenDetails)

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

          <CreateTradeButton onClick={
            async () => {
              const buyerAddress = formData.buyerAddress;
              const tokenDetails = [{
                tokenId: Number(formData.tokenId),
                amount: Number(formData.amount),
                price: Number(formData.price),
              }];

              console.log("ready!")
              const result =  writeContract({
                  abi,
                  address: '0xd7407D2DfE8743E116f264031EC0bC790f55dBfD',
                  functionName: 'createTrade',
                  args: [
                      buyerAddress, tokenDetails
                  ],
              })

              console.log(result)

              navigate(ROUTE_PATH.ESCROW_LIST);
          }
          }>Create Trade</CreateTradeButton>
        </Form>
      </Wrapper>
    </>
  );
};

export default EscrowCreatePage;
