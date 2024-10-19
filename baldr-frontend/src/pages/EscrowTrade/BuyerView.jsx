import styled from "styled-components";
import theme from "../../styles/theme";

const BuyerView = () => {
  return (
    <Wrapper>
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

      <div id="rep-box"></div>

      <div id="trade-box"></div>

      <div id="cfm-btn"></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2rem;
  background-color: ${theme.color.MAIN_BLACK};
  color: ${theme.color.WHITE};
  font-weight: 600;
  height: 100vh;

  #info-box {
    border-radius: 6px;
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
  margin-bottom: 2rem;
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
