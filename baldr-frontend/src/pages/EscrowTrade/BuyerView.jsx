import styled from "styled-components";
import theme from "../../styles/theme";
import BaldrGood from "../../assets/image/baldr-good.png";
import TradeView from "../../assets/image/tmp-trade.png";

const BuyerView = () => {
  return (
    <Wrapper className="f-col">
      {/* Select Game Section */}
      <GameSelection className="f-row f-spb">
        <GameLabel>Game:</GameLabel>
        <GameSelect>Maple Story (0x4ce2d015...)</GameSelect>
      </GameSelection>

      <div id="info-box" className="f-col">
        <div className="f-row f-spb">
          <p>Contract:</p>
          <p>0x2cd142a20eab3...</p>
        </div>
        <div className="f-row f-spb">
          <p>Token ID:</p>
          <p>12345</p>
        </div>
        <div className="f-row f-spb">
          <p>From:</p>
          <p>Louis (Wallet: 0xa4ba01c4...)</p>
        </div>
        <div className="f-row f-spb">
          <p>When:</p>
          <p>14/10/2024 - 07:11pm</p>
        </div>
        <div className="f-row f-spb">
          <p>Item:</p>
          <p>Happy Mushroom / 1</p>
        </div>
        <div className="f-row f-spb">
          <p>Price:</p>
          <p>$100</p>
        </div>
      </div>

      <div id="rep-box" className="f-row">
        <img src={BaldrGood} />
        <div className="f-col">
          <p id="title">Raputation Score: 65</p>
          <p>He has just generated a wallet, and he has fewer than 5 transactions, ...</p>
        </div>
      </div>

      <div id="trade-box">
        <p>Trade</p>
        <img src={TradeView} />
        <div id="dps-btn">Deposit Coin</div>
      </div>

      <div id="cfm-btn">Confirm Trade</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2rem;
  background-color: ${theme.color.MAIN_BLACK};
  color: ${theme.color.WHITE};
  font-weight: 600;
  height: 100vh;
  gap: 1.4rem;

  #cfm-btn {
    background-color: ${theme.color.MAIN_BLUE};
    color: ${theme.color.WHITE};
    font-size: ${theme.font.SIZE.M};
    padding: 0.8rem;
    text-align: center;
    border-radius: 0.6rem;
  }

  #trade-box {
    border-radius: 0.6rem;
    padding: 1.2rem;
    background-color: ${theme.color.BACK_BLACK};
    color: ${theme.color.WHITE};
    font-size: ${theme.font.SIZE.M};
    gap: 1rem;

    img {
      width: 100%;
    }

    #dps-btn {
      background-color: ${theme.color.BACK_BLUE};
      color: ${theme.color.TEXT_BLUE};
      padding: 0.8rem;
      text-align: center;
      border-radius: 0.6rem;
    }
  }

  #rep-box {
    border-radius: 0.6rem;
    background-color: ${theme.color.BACK_PURPLE};
    font-size: ${theme.font.SIZE.S};
    color: ${theme.color.TEXT_GRAY};
    padding: 1.4rem;

    img {
      width: 5rem;
      height: 5rem;
      border-radius: 1rem;
      margin-right: 1rem;
    }

    #title {
      color: ${theme.color.TEXT_PURPLE};
      margin-bottom: 0.6rem;
    }
  }

  #info-box {
    border-radius: 0.6rem;
    padding: 1.2rem;
    background-color: ${theme.color.BACK_BLACK};
    color: ${theme.color.WHITE};
    font-size: ${theme.font.SIZE.M};
    gap: 1rem;

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
  padding: 0.8rem;
  color: ${theme.color.TEXT_BLUE};
  background-color: ${theme.color.BACK_BLUE};
  border-radius: 0.4rem;
  text-align: right;
`;

export default BuyerView;
