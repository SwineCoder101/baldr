/* eslint-disable no-unused-vars */
import { Wrapper } from "./style";
import { useEffect } from "react";
import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import LogoTopBar from "../../components/LogoTopBar";
import BottomNavBar from "../../components/BottomNavBar";
import SellerView from "./SellerView";
import BuyerView from "./BuyerView";
import { getMyWalletAddress } from "../../utils";
import { useAccount } from "wagmi";

const EscrowTradePage = () => {
  const data = useParams();
  const { escrowCount, sellerAddress, buyerAddress } = data;

  const location = useLocation();
  const userInfo = { ...location.state };
  // console.log(userInfo.request);

  const { address } = useAccount();
  const myAddress = address;

  // destructure the data object
  // myaddress
  // opponentaddress
  // nftaddress
  // nftid
  // amount
  // status

  const isSeller = sellerAddress === myAddress;
  const isBuyer = buyerAddress === myAddress;
  // console.log(isSeller, isBuyer);

  useEffect(() => {
    if (!isSeller && !isBuyer) {
      // TODO: route back for demo video
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
      <Wrapper>
        {isSeller && (
          <SellerView
            sellerAddress={sellerAddress}
            buyerAddress={buyerAddress}
            tradeData={userInfo.request}
          />
        )}
        {isBuyer && (
          <BuyerView
            sellerAddress={sellerAddress}
            buyerAddress={buyerAddress}
            tradeData={userInfo.request}
          />
        )}
      </Wrapper>
    </>
  );
};

export default EscrowTradePage;
