/* eslint-disable no-unused-vars */
import { Wrapper } from "./style";
import { useEffect } from "react";
import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import LogoTopBar from "../../components/LogoTopBar";
import BottomNavBar from "../../components/BottomNavBar";
import SellerView from "./SellerView";
import BuyerView from "./BuyerView";
import { MY_WALLET_ADDRESS, ROUTE_PATH } from "../../common/const";

const EscrowTradePage = () => {
  const navigate = useNavigate();

  const data = useParams();
  const { escrowCount, sellerAddress, buyerAddress } = data;
  // console.log(data);

  const location = useLocation();
  const userInfo = { ...location.state };
  // console.log(userInfo.request);

  // destructure the data object
  // myaddress
  // opponentaddress
  // nftaddress
  // nftid
  // amount
  // status

  const isSeller = sellerAddress === MY_WALLET_ADDRESS;
  const isBuyer = buyerAddress === MY_WALLET_ADDRESS;

  useEffect(() => {
    if (!isSeller && !isBuyer) {
      alert("you are not the seller or the buyer");
      navigate(ROUTE_PATH.ESCROW_LIST);
    }

    if (isSeller && isBuyer) {
      alert("you are not the seller and the buyer");
      navigate(ROUTE_PATH.ESCROW_LIST);
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
