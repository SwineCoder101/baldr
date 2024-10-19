/* eslint-disable no-unused-vars */
import { Wrapper } from "./style";
import { useEffect } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import LogoTopBar from "../../components/LogoTopBar";
import BottomNavBar from "../../components/BottomNavBar";

const EscrowTradePage = () => {
  const data = useParams();
  const { escrowCount, sellerAddress, buyerAddress, escrowUUID } = data;

  // destructure the data object
  // myaddress
  // opponentaddress
  // nftaddress
  // nftid
  // amount
  // status
  const myaddress = "0xfa6Cc5134a2e81a2F19113992Ef61F9BE81cafdE";
  const isSeller = sellerAddress === myaddress;
  const isBuyer = buyerAddress === myaddress;
  console.log(isSeller, isBuyer);

  useEffect(() => {
    // if (!isSeller && !isBuyer) {
    //     navigate('/error')
    // }
    // navigate('/error')
    if (!isSeller && !isBuyer) {
      console.log("you are not the seller or the buyer");
      throw new Error("you are not the seller or the buyer");
    }

    if (isSeller && isBuyer) {
      console.log("you are the seller and the buyer");
      throw new Error("you are the seller and the buyer");
    }
  }, []);

  return (
    <>
      <LogoTopBar />

      <Wrapper>
      </Wrapper>

      <BottomNavBar />
    </>
  );
};

export default EscrowTradePage;
