/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import theme from "../../styles/theme";
import BaldrGood from "../../assets/image/baldr-good.png";
import RefreshIcon from "../../assets/icons/refresh.png";
import TradeIcon from "../../assets/icons/trade-white.png";
import DotOnIcon from "../../assets/icons/blue-dot-on.png";
import DotOffIcon from "../../assets/icons/blue-dot-off.png";
import EtcIcon from "../../assets/icons/etc.png";
import { truncateText } from "../../common/commons";
import { useEffect, useState } from "react";
import SubTopBar from "../../components/SubTopBar";

const BuyerView = ({ sellerAddress, buyerAddress, tradeData }) => {
  const [repScore, setRepScore] = useState(0);
  const [repComment, setRepComment] = useState(``);

  useEffect(() => {
    fetchAIData();
  }, []);

  function fetchAIData() {
    setRepScore(70);
    setRepComment(
      `s of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular duri`
    );
  }

  const handleFetch = () => {
    alert("Fetch");
  };

  const handleDeposit = () => {
    alert("Deposit");
  };

  const handleConfirm = () => {
    alert("Confirm");
  };

  return (
    <>
      <SubTopBar />

      <Wrapper className="f-col">
        <p id="page-title">Trade</p>

        {/* Select Game Section */}
        <GameSelection className="f-row f-spb">
          <GameLabel>Game:</GameLabel>
          <GameSelect>Maple Story (0x4ce2d015...)</GameSelect>
        </GameSelection>

        <div id="info-box" className="f-col">
          <div className="f-row f-spb">
            <label>Contract:</label>
            <p>{truncateText(tradeData.contractAddress, 20)}</p>
          </div>
          <div className="f-row f-spb">
            <label>Token ID:</label>
            <p>{tradeData.tokenId}</p>
          </div>
          <div className="f-row f-spb">
            <label>From:</label>
            <p>{tradeData.sender}</p>
          </div>
          <div className="f-row f-spb">
            <label>Wallet:</label>
            <p>{truncateText(tradeData.walletAddress, 20)}</p>
          </div>
          <div className="f-row f-spb">
            <label>When:</label>
            <p>{tradeData.date}</p>
          </div>
          <div className="f-row f-spb">
            <label>Item:</label>
            <p>
              {tradeData.item} x {tradeData.quantity}
            </p>
          </div>
          <div className="f-row f-spb">
            <label>Price:</label>
            <p>{tradeData.price}</p>
          </div>
        </div>

        <div id="rep-box" className="f-row">
          <img src={BaldrGood} />
          <div className="f-col">
            <p id="title">Reputation Score: {repScore}</p>
            <p>{truncateText(repComment, 70)}</p>
          </div>
        </div>

        <div id="trade-box">
          <div className="f-row f-spb vc">
            <p id="title">Trade</p>
            <img id="r-icon" src={RefreshIcon} onClick={() => handleFetch()} />
          </div>

          <div id="t-map" className="f-row f-spb vc">
            <div className="f-col hc" style={{ gap: ".8rem" }}>
              <div className="f-row hc" style={{ gap: ".6rem" }}>
                <img src={DotOnIcon} />
                <img src={DotOffIcon} />
              </div>
              <p>Deposit</p>
            </div>

            <img className="etc" src={EtcIcon} />

            <div className="f-col hc" style={{ gap: ".8rem" }}>
              <div className="f-row hc" style={{ gap: ".6rem" }}>
                <img src={DotOffIcon} />
                <img src={DotOffIcon} />
              </div>
              <p>Confirm</p>
            </div>

            <img className="etc" src={EtcIcon} />

            <div className="f-col hc" style={{ gap: ".6rem" }}>
              <div>
                <img src={DotOffIcon} />
              </div>
              <p>Done</p>
            </div>
          </div>

          {/* Trade Curr Box */}
          <div style={{ marginTop: "1.4rem" }}>
            {/* Item Seller */}
            <div className="t-box">
              {tradeData.item} x {tradeData.quantity}
            </div>

            <div className="hc">
              <img id="t-icon" src={TradeIcon} />
            </div>

            <div className="f-col" style={{ gap: "0.4rem" }}>
              <div id="me-box" className="f-col">
                {tradeData.price}
              </div>
              <p className="hc" style={{ color: theme.color.MAIN_BLUE, fontSize: "1.8rem" }}>
                Me
              </p>
            </div>
          </div>

          <div id="dps-btn" onClick={() => handleDeposit()}>
            Deposit Coin
          </div>
        </div>

        <div id="cfm-btn" onClick={() => handleConfirm()}>
          Confirm Trade
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  padding-top: 6rem !important;
  padding: 2rem;
  background-color: ${theme.color.MAIN_BLACK};
  color: ${theme.color.WHITE};
  font-weight: 600;
  min-height: 100vh;
  gap: 1.8rem;

  #page-title {
    font-size: 2rem;
    margin: 1rem 0 0 0;
  }

  #r-icon {
    width: 3rem;
    height: 3rem;
  }

  #cfm-btn {
    background-color: ${theme.color.MAIN_BLUE};
    color: ${theme.color.WHITE};
    font-size: ${theme.font.SIZE.M};
    padding: 1rem;
    text-align: center;
    border-radius: 0.6rem;
    margin-bottom: 6rem;
  }

  #trade-box {
    border-radius: 0.6rem;
    padding: 1.6rem;
    background-color: ${theme.color.BACK_BLACK};
    color: ${theme.color.WHITE};
    font-size: ${theme.font.SIZE.M};
    gap: 1rem;

    #t-map {
      margin: 2.4rem 0;

      p {
        color: ${theme.color.TEXT_GRAY};
      }

      .etc {
        height: 0.6rem;
      }
    }

    #t-icon {
      width: 2.6rem;
      rotate: 90deg;
      margin: 1.4rem 0;
    }

    #me-box {
      padding: 1.2rem;
      border-radius: 0.6rem;
      background-color: ${theme.color.BACK_GRAY};
      border: 3px solid ${theme.color.MAIN_BLUE};
    }

    .t-box {
      background-color: ${theme.color.BACK_GRAY};
      padding: 1.2rem;
      border-radius: 0.6rem;
    }

    #title {
      font-size: ${theme.font.SIZE.ML};
    }

    #t-img {
      width: 100%;
      margin: 1.4rem 0;
    }

    #dps-btn {
      background-color: ${theme.color.BACK_BLUE};
      color: ${theme.color.TEXT_BLUE};
      padding: 1.2rem;
      font-size: 1.4rem;
      text-align: center;
      border-radius: 0.6rem;
      margin-top: 2rem;
    }
  }

  #rep-box {
    border-radius: 0.6rem;
    background-color: ${theme.color.BACK_PURPLE};
    font-size: ${theme.font.SIZE.S};
    color: ${theme.color.TEXT_GRAY};
    padding: 1.2rem 1.4rem;

    img {
      width: 5rem;
      height: 5rem;
      border-radius: 1rem;
      margin-right: 1.4rem;
    }

    #title {
      color: ${theme.color.TEXT_PURPLE};
      margin-bottom: 0.6rem;
      font-size: 1.4rem;
    }
  }

  #info-box {
    border-radius: 0.6rem;
    padding: 1.6rem;
    background-color: ${theme.color.BACK_BLACK};
    color: ${theme.color.WHITE};
    font-size: ${theme.font.SIZE.M};
    gap: 1rem;

    p {
      color: ${theme.color.TEXT_GRAY};
    }

    .date {
      color: ${theme.color.TEXT_GRAY};
      font-size: ${theme.font.SIZE.S};
    }
  }
`;

const GameSelection = styled.div`
  display: flex;
  align-items: center;
`;

const GameLabel = styled.p`
  font-size: ${theme.font.SIZE.ML};
  margin-right: 1rem;
`;

const GameSelect = styled.div`
  padding: 0.6rem 0.6rem 0.6rem 1rem;
  color: ${theme.color.TEXT_BLUE};
  background-color: ${theme.color.BACK_BLUE};
  font-size: ${theme.font.SIZE.S};
  border-radius: 0.4rem;
  text-align: right;
`;

export default BuyerView;
